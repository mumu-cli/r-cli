const axios = require('axios')
const { repoApi, tagApi } = require('./config')

axios.interceptors.response.use((res) => res.data)

async function fetchRepoList() {
  // 可以通过配置文件 拉取不同的仓库对应的用户下的文件
  return axios.get(repoApi)
}

async function fetchTagList(repo) {
  return axios.get(tagApi(repo))
}

module.exports = {
  fetchRepoList,
  fetchTagList,
}
