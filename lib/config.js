const gitUrl = 'https://gitee.com'

const org = 'resonance-cli'

const accessToken = 'c5b3b5d143ebbfd5222d1893375c6c7b'

const rootUrl = `${gitUrl}/${org}`

const repoApi = `${gitUrl}/api/v5/orgs/${org}/repos?type=all&page=1&per_page=20&access_token=${accessToken}`

const tagApi = (repo) =>
  `${gitUrl}/api/v5/repos/${org}/${repo}/tags?access_token=${accessToken}`

module.exports = {
  repoApi,
  tagApi,
  rootUrl,
}
