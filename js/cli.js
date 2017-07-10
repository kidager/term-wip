const errors = {
  invalidDirectory: 'Error: not a valid directory',
  noWriteAccess: 'Error: you do not have write access to this directory',
  fileNotFound: 'Error: file not found in current directory',
};

const struct = {
  root: ['about', 'resume', 'contact'],
  projects: ['nodemessage', 'map', 'dotify', 'slack-automation'],
  skills: ['proficient', 'familiar', 'learning'],
};

function getDirectory() {
  return localStorage.directory;
}

function setDirectory(dir) {
  localStorage.directory = dir;
}

const commands = {};
let systemData = {};
const rootPath = 'users/codebytere/root';

// create new directory in current directory
commands.mkdir = () => errors.noWriteAccess;

// create new directory in current directory
commands.touch = () => errors.noWriteAccess;

// remove file from current directory
commands.rm = () => errors.noWriteAccess;

// view contents of current directory
commands.ls = () => systemData[getDirectory()];

// view list of possible commands
commands.help = () => systemData.help;

// display current path
commands.path = () => {
  const dir = getDirectory();
  return dir === 'root' ? rootPath : `${rootPath}/${dir}`;
};

// see command history
commands.history = () => {
  let history = localStorage.history;
  history = history ? Object.values(JSON.parse(history)) : [];
  return `<p>${history.join('<br>')}</p>`;
};

// move into specified directory
commands.cd = (newDirectory) => {
  const currDir = getDirectory();
  const dirs = ['root', 'projects', 'skills'];
  const newDir = newDirectory ? newDirectory.trim() : '';

  if (dirs.includes(newDir) && currDir !== newDir) {
    setDirectory(newDir);
  } else if (newDir === '') {
    setDirectory('root');
  } else {
    return errors.invalidDirectory;
  }
  return null;
};

// display contents of specified file
commands.cat = (filename) => {
  const dir = getDirectory();
  const fileKey = filename.split('.')[0];

  if (fileKey in systemData && struct[dir].includes(fileKey)) {
    return systemData[fileKey];
  }

  return errors.fileNotFound;
};

// initialize cli
$(() => {
  const cmd = document.getElementById('terminal');
  const terminal = new shell(cmd, commands);

  $.ajaxSetup({ cache: false });
  $.get('data/system_data.json', (data) => {
    systemData = data;
  });
});
