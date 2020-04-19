const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const exists = promisify(fs.exists);

const repoFolder = 'repos-tmp';


exports.gitClone = async (acc, repoName, mainBranch) => {
  const currentDir = path.resolve(__dirname);
  const repoDir = `${currentDir}/${repoFolder}/${repoName}`;
  const repoUrl = `https://github.com/${acc}/${repoName}.git`;
  const isExists = await exists(repoDir);

  return new Promise((resolve, reject) => {
    if (!isExists) {
      exec(`git clone -b ${mainBranch} ${repoUrl} ${repoDir}`, (err) => {
        if (err) {
          reject({
            err: 'Error with cloning repo',
            message: err.toString()
          })
        }
        else {
          resolve();
        }
      })
    } else {
      exec(`git checkout ${mainBranch} && git pull`, {cwd: repoDir}, (err) => {
        if (err) {
          reject({
            err: 'Error with cloning repo',
            message: err.toString()
          })
        }
        else {
          resolve();
        }
      });
    }
  });
};

exports.checkoutCommit = async (repoName, commitHash) => {
  const currentDir = path.resolve(__dirname);
  const repoDir = `${currentDir}/${repoFolder}/${repoName}`;
  const isExists = await exists(repoDir);

  return new Promise((resolve, reject) => {
    if (isExists) {
      exec(`git checkout ${commitHash}`, {cwd: repoDir}, (err) => {
        if (err) {
          reject({
            err: 'Error with checkout commit',
            message: err.toString()
          })
        } else {
          resolve();
        }
      });
    } else {
      reject(new Error('No repo to checkout'))
    }
  });
}