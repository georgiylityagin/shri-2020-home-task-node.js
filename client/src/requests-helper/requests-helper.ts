const fetchData = async (url: string, options = {}): Promise<Response> => {
  const baseUrl = 'http://127.0.0.1:3000/api/';

  try {
    const response: Response = await fetch(baseUrl + url, options);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

type config = {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

export const api = {
  getConfig(): Promise<Response> {
    return fetchData('settings');
  },

  getBuildsList(offset = 0, limit = 100): Promise<Response> {
    return fetchData(`builds?offset=${offset}&limit=${limit}`);
  },

  getBuildDetails(buildId: string): Promise<Response> {
    return fetchData(`builds/${buildId}`);
  },

  getBuildLogs(buildId: string): Promise<Response> {
    return fetchData(`builds/${buildId}/logs`);
  },

  postConfig(config: config): Promise<Response> {
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

  postAddBuild(commitHash: string): Promise<Response> {
    return fetchData(`builds/${commitHash}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': commitHash.length.toString(),
      },
    });
  }
}