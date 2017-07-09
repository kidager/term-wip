const errors = {
  invalidDirectory: 'Error: not a valid directory',
  noWriteAccess: 'Error: you do not have write access to this directory',
  fileNotFound: 'Error: file not found in current directory',
};

function getDirectory() {
  return localStorage.directory;
}

function setDirectory(dir) {
  localStorage.directory = dir;
}

const commands = {};
let systemData = {};

// display current path
commands.path = () => {
  const dir = getDirectory();
  return dir === 'root' ? `users/codebytere/${dir}` : `users/codebytere/root/${dir}`;
};

// create new directory in current directory
commands.mkdir = () => errors.noWriteAccess;

// create new directory in current directory
commands.touch = () => errors.noWriteAccess;

// remove file from current directory
commands.rm = () => errors.noWriteAccess;

// see command history
commands.history = () => {
  let history = localStorage.history;
  history = history ? Object.values(JSON.parse(history)) : [];
  return `<p>${history.join('<br>')}</p>`;
};

// view list of possible commands
commands.help = () => {
  const output =
    `<div>
      <ul>
        <li><strong>path</strong> - display current directory</li>
        <li><strong>cat FILENAME</strong> - display FILE in window</li>
        <li><strong>cd DIRECTORY</strong> - move into DIRECTORY or just cd to return to root</li>
        <li><strong>ls</strong> - show files in current directory</li>
        <li><strong>history</strong> - see your command history</li>
      </ul>
    </div>`;
  return output;
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

// view contents of current directory
commands.ls = () => {
  switch (getDirectory()) {
    case 'root':
      return `<p>
        about_me.txt &nbsp&nbsp <span class="dir">projects</span>
        &nbsp&nbsp <span class="dir">skills</span> <br>
        contact_me.txt &nbsp&nbsp resume.txt<br>
      </p>`;
    case 'projects':
      return `<p>
        nodemessage.txt &nbsp&nbsp slack-automation.txt <br>
        map.txt &nbsp&nbsp dotify.txt <br>
      </p>`;
    case 'skills':
      return `<p>
        proficient.txt &nbsp&nbsp familiar.txt <br>
        learning.txt
      </p>`;
    default:
      return '';
  }
};

// display contents of specified file
commands.cat = (filename) => {
  const dir = getDirectory();
  switch (filename) {
    // general data
    case 'about_me.txt':
      return dir === 'root' ? systemData.about_me : errors.fileNotFound;
    case 'contact_me.txt':
      return dir === 'root' ? systemData.contact_me : errors.fileNotFound;
    case 'resume.txt':
      return dir === 'root' ? systemData.resume : errors.fileNotFound;
    // skill data
    case 'proficient.txt':
      return dir === 'skills' ? systemData.proficient : errors.fileNotFound;
    case 'familiar.txt':
      return dir === 'skills' ? systemData.familiar : errors.fileNotFound;
    case 'learning.txt':
      return dir === 'skills' ? systemData.learning : errors.fileNotFound;
    // project data
    case 'nodemessage.txt':
      return dir === 'projects' ? systemData.nodemessage : errors.fileNotFound;
    case 'map.txt':
      return dir === 'projects' ? systemData.map : errors.fileNotFound;
    case 'slack-automation.txt':
      return dir === 'projects' ? systemData.slack_automation : errors.fileNotFound;
    case 'dotify.txt':
      return dir === 'projects' ? systemData.dotify : errors.fileNotFound;
    default:
      return errors.fileNotFound;
  }
};

// initialize cli
$(() => {
  const cmd = document.getElementById('terminal');
  const shell = new Shell(cmd, commands);
  $.get('data/system_data.json', (data) => {
    systemData = data;
  });
});
