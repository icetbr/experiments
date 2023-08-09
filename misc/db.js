const tiny = require('./tiny-json-http');
const request = require('./request');
const config = require('./config');
var axios = require('axios');
// const instance = axios.create({
//   baseURL: 'https://api.github.com/repos/icetbr/serverlessman/contents/',
//   timeout: 2000,
//   headers: { Authorization: 'token tok' }
// });
// return instance.put('data/sample.txt', {
//   content: Buffer.from(JSON.stringify(data)).toString('base64'),
// })

const baseUrl = `https://api.github.com/repos/${config.githubUsername}/${config.githubRepository}`;
const contentsUrl = `https://api.github.com/repos/${config.githubUsername}/${config.githubRepository}/contents`;
const headers = { Authorization: `token ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' }; // specifiying the version in Accept is recommended // headers.Accept = "application/vnd.github.v3+json, text/plain, */*"
// https://developer.github.com/v3/#conditional-requests
module.exports = {
  // https://developer.github.com/v3/repos/contents/
  // PUT /repos/:owner/:repo/contents/:path
  upsert(data) {
    return request.put(`${contentsUrl}/${config.destinationPath(data)}`, {
        message: 'adding a comment',
        content: Buffer.from(JSON.stringify(data)).toString('base64'),
      },
      headers,
    );
// para conseguir o sha, posso dar um getFIle no github
    // return tiny.put({
    // url: 'https://api.github.com/repos/icetbr/serverlessman/contents/data/sample.txt',
    //   data: {
    //   // message: 'adding a comment',
    //   content: Buffer.from(JSON.stringify(data)).toString('base64'),
    //   },
    // headers: { Authorization: 'token xxx' },
    // });
  },
  // Two alternatives:
  // - GET /repos/:owner/:repo/contents/:path with application/vnd.github.VERSION.raw   ~260ms
  // - https://raw.githubusercontent.com/icetbr/HelloWorld/master/notes/hello.txt       ~470ms
  find(path = '') {
    // headers.Accept = 'application/vnd.github.v3+json, text/plain, */*';
    // headers.Accept = 'application/vnd.github.v3.raw';
    // return request.get(`${contentsUrl}/${path}`, headers);
    return request.get(`https://raw.githubusercontent.com/${config.githubUsername}/${config.githubRepository}/master/${path}`);
  },

  // curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/icetbr/serverlessman-tests/git/trees/master?recursive=1
  //GET /repos/:owner/:repo/git/trees/:tree_sha?recursive=1
  async findAll() {
    // headers.Accept = 'application/vnd.github.v3+json, text/plain, */*';
    // headers.Accept = 'application/json, text/plain, */*';
    // headers.Accept = '1';
    const files = await request.get(`${baseUrl}/git/trees/master?recursive=1`, headers);
    // const instance = axios.create({
    //   baseURL: baseUrl,
    //   timeout: 2000,
    //   headers: { Authorization: 'token 62db2234f510b5114f057a4ff56054d9e1e35ee3' }
    // });
    // const files = (await instance.get(`/git/trees/master?recursive=1`)).data;
    return files.tree.map(file => file.path);
  },

  delete(path) {
    // return request.delete(`${baseUrl}/${path}`, auth); // DELETE ALL
    return request.put(`${baseUrl}/${config.destinationPath(data)}`, {
        message: 'deletting a comment',
        sha: Buffer.from(JSON.stringify(data)).toString('base64'),
      },
      headers,
    );
  },

  // deletes and recreates the repository
  // curl -H "Authorization: token xxx" --data '{"name":"serverlessman-tests"}' https://api.github.com/user/repos
  // curl -X DELETE -H 'Authorization: token xxx' https://api.github.com/repos/icetbr/serverlessman-tests
  async clear() {
    await request.delete(baseUrl, headers);
    await request.post('https://api.github.com/user/repos', { "name": config.githubRepository }, headers);
  },

};