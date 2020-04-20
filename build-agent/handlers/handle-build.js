const { exec } = require('child_process');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const exists = promisify(fs.exists);

const repoFolder = 'repos-tmp';

exports.runBuildCommand = async (repoName, buildCommand) => {
  if (!isBuildCommandSafe(buildCommand)) {
    return Promise.reject(new Error('Dangerous build command \nCancel build'));
  }

  const currentDir = path.resolve(__dirname);
  const repoDir = `${currentDir}/${repoFolder}/${repoName}`;
  const isExists = await exists(repoDir);

  return new Promise((resolve, reject) => {
    if (isExists) {
      exec(buildCommand, {cwd: repoDir}, (err, stdout, stderr) => {
        if (err) {
          reject({
            err: 'Error with build command',
            message: err.toString()
          });
        } else {
          resolve({stdout, stderr});
        }
      })
    } else {
      reject(new Error('No repo to run build command'));
    }
  });
}


function isBuildCommandSafe(buildCommand) {
  buildCommand = buildCommand.trim().replace('&&', ';');

  const startsWithNpm = /^\bnpm\b/;
  const numOfCommands = buildCommand.split(';')
    .filter(val => val !== '')
    .length;

  // Should stars with npm
  if (!startsWithNpm.test(buildCommand)) {
    return false;
  }

  // Shold be only one command
  if (numOfCommands > 1) {
    return false;
  }

  return true;
}
