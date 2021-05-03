const org = 'resonance-cli'

const rootUrl = `https://gitee.com/${org}`

const repoApi = `https://gitee.com/api/v5/orgs/${org}/repos?type=all&page=1&per_page=20`

const tagApi = (repo) =>
  `https://gitee.com/api/v5/repos/resonances/${repo}/tags`

module.exports = {
  repoApi,
  tagApi,
  rootUrl
}
