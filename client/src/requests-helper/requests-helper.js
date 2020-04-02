export const api = {
  getConfig() {
    return fetch('http://127.0.0.1:3000/api/settings')
      .then((res) => res.json())
      .then((resBody) => resBody)
      .catch((err) => console.error(err));
  },

  getBuildsList(offset = 0, limit = 25) {
    return fetch(
      `http://127.0.0.1:3000/api/builds?offset=${offset}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((resBody) => resBody)
      .catch((err) => console.error(err));
  },

  getBuildDetails(buildId) {
    return fetch(`http://127.0.0.1:3000/api/builds/${buildId}`)
      .then((res) => res.json())
      .then((resBody) => resBody)
      .catch((err) => console.error(err));
  },

  getBuildLogs(buildId) {
    return fetch(`http://127.0.0.1:3000/api/builds/${buildId}/logs`)
      .then((res) => res.json())
      .then((resBody) => resBody)
      .catch((err) => console.error(err));
  },

  postConfig(config) {
    const bodyData = JSON.stringify(config);

    return fetch('http://127.0.0.1:3000/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': bodyData.length.toString(),
      },
      body: bodyData,
    })
      .then((res) => res.json())
      .then((resBody) => resBody)
      .catch((err) => console.error(err));
  },

  postAddBuild(commitHash) {
    return fetch(`http://127.0.0.1:3000/api/builds/${commitHash}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': commitHash.length.toString(),
      },
      // body: bodyData
    })
      .then((res) => res.json())
      .then((resBody) => resBody)
      .catch((err) => console.error(err));
  },
};
