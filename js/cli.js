const struct = {
  root: [
    'about_me.txt',
    'contact_me.txt',
  ],
  projects: [
    'dotify.txt',
    'slack-automation.txt',
    'map.txt',
    'nodemessage.txt',
  ],
  skills: [
    'proficient.txt',
    'familiar.txt',
    'learning.txt',
  ],
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
commands.mkdir = () => 'Error: you do not have write access to this directory';

// remove file from current directory
commands.rm = () => 'Error: you do not have write access to this directory';

// see command history
commands.history = () => {
  let history = localStorage.history;
  console.log(JSON.parse(history));
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
  const dirs = Object.keys(struct);
  const newDir = newDirectory ? newDirectory.trim() : '';

  if (dirs.includes(newDir) && currDir !== newDir) {
    setDirectory(newDir);
  } else if (newDir === '') {
    setDirectory('root');
  } else {
    return 'Error: not a valid directory';
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
  console.log(systemData);
  switch (filename) {
    // general data
    case 'about_me.txt':
      return systemData.about_me;
    case 'contact_me.txt':
      return systemData.contact_me;
    case 'resume.txt':
      return systemData.resume;
    // skill data
    case 'proficient.txt':
      return systemData.proficient;
    case 'familiar.txt':
      return systemData.familiar;
    case 'learning.txt':
      return systemData.learning;
    // project data
    case 'nodemessage.txt':
      return systemData.nodemessage;
    case 'map.txt':
      return systemData.map;
    case 'slack-automation.txt':
      return systemData.slack_automation;
    case 'dotify.txt':
      return systemData.dotify;
    default:
      return 'Error: invalid filename';
  }
};

$(() => {
  const cmd = document.getElementById('terminal');
  const shell = new Shell(cmd, commands);
  $.get('data/system_data.json', (data) => {
    systemData = data;
  });
});
