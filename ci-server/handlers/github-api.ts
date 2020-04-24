import axios from 'axios';

export interface commitInfo {
  commitMessage: string;
  commitHash: string;
  authorName: string
}

export async function getAllCommits(repoName: string, since?: string): Promise<commitInfo[]> {

  const res = await axios.get(`https://api.github.com/repos/${repoName}/commits`, {
    params: {
      since
    }
  });

  return res.data.map((commit: any) => (
    {
      commitMessage: commit.commit.message,
      commitHash: commit.sha,
      authorName: commit.commit.author.name
    }
  ));
}

export async function getLastCommit(repoName: string): Promise<commitInfo> {
  const res = await axios.get(`https://api.github.com/repos/${repoName}/commits`);

  return {
    commitMessage: res.data[0].commit.message,
    commitHash: res.data[0].sha,
    authorName: res.data[0].commit.author.name
  };
}