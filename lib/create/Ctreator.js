const { fetchRepoList, fetchTagList } = require('../request')
const { rootUrl } = require('../config')
const Inquirer = require('inquirer')
const { wrapLoading } = require('../util')
const downloadGitRepo = require('download-git-repo')
const gitclone = require('git-clone')
const util = require('util')
const path = require('path')

class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName
    this.target = targetDir
    // 此时这个方法就是一个promise方法了
    this.downloadGitRepo = util.promisify(downloadGitRepo)
    this.gitclone = util.promisify(gitclone)
  }
  async fetchRepo() {
    // 失败重新拉取
    let repos = await wrapLoading(fetchRepoList, 'waiting fetch template')
    if (!repos) return
    repos = repos.map((item) => item.name)
    let { repo } = await Inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'please choose a template to create project',
    })
    return repo
  }
  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, 'waiting fetch tag', repo)
    if (!tags || !tags?.length) return
    tags = tags.map((item) => item.name)
    let { tag } = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tags,
      message: 'please choose a tag to create project',
    })
    return tag
  }
  async download(repo, tag) {
    // 1.拼接下载路径
    let requestUrl = `${rootUrl}/${repo}.git`
    // 2.把资源下载到某个路径上 (后续可以增加缓存功能, 应该下载到系统目录中，稍后可以在使用ejs handlerbar 去渲染模板 最后生成结果 在写入)
    // 放到系统文件中 -> 模板 和用户的其他选择 =》 生成结果 放到当前目录下
    await this.gitclone(requestUrl, path.resolve(process.cwd(), this.name), {
      clone: true,
      shallow: true,
      checkout: tag,
    })
    return this.target
  }
  async create() {
    // 真实开始创建了
    // 1) 先去拉取当前组织下的模板
    let repo = await this.fetchRepo()
    // 2) 在通过模板找到版本号
    let tag = await this.fetchTag(repo)
    // // 3) 下载
    await this.download(repo, tag)
  }
}

module.exports = Creator
