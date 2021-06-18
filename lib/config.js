const gitHost = 'https://gitee.com'

const org = 'resonance-cli'

const accessToken = 'e3aeb9860aee2df6970e71cd4427d594'

const rootUrl = `${gitHost}/${org}`

const repoApi = `${gitHost}/api/v5/orgs/${org}/repos?type=all&page=1&per_page=20&access_token=${accessToken}`

const tagApi = (repo) =>
  `${gitHost}/api/v5/repos/${org}/${repo}/tags?access_token=${accessToken}`

module.exports = {
  repoApi,
  tagApi,
  rootUrl,
}
