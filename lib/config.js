const gitHost = 'https://gitee.com'

const org = 'fl-cli'

const accessToken = 'a2960a7eb77f174740b9a142422a6ce0'

const rootUrl = `${gitHost}/${org}`

const repoApi = `${gitHost}/api/v5/orgs/${org}/repos?type=all&page=1&per_page=20&access_token=${accessToken}`

const tagApi = (repo) =>
  `${gitHost}/api/v5/repos/${org}/${repo}/tags?access_token=${accessToken}`

module.exports = {
  repoApi,
  tagApi,
  rootUrl,
}
