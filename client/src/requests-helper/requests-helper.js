const fetchData = async (url, options = {}) => {
  const baseUrl = 'http://127.0.0.1:3000/api/';

  const timeout = new Promise(function(resolve, reject) { 
    setTimeout(reject, 5000, new Error('Сервер долго не отвечает'));
  });

  try {
    const response = await Promise.race([fetch(baseUrl + url, options), timeout]);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const api = {
  getConfig() {
    return fetchData('settings');
  },

  getBuildsList(offset = 0, limit = 100) {
    return fetchData(`builds?offset=${offset}&limit=${limit}`);
  },

  getBuildDetails(buildId) {
    return fetchData(`builds/${buildId}`);
  },

  getBuildLogs(buildId) {
    return fetchData(`builds/${buildId}/logs`);
  },

  postConfig(config) {
    const bodyData = JSON.stringify(config);

    return fetchData('settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': bodyData.length.toString(),
      },
      body: bodyData,
    });
  },

  postAddBuild(commitHash) {
    return fetchData(`builds/${commitHash}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': commitHash.length.toString(),
      },
    });
  }
}