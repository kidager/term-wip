const dirs = ['root', 'projects', 'skills', 'dotify', 'slack-automation'];
// const links_txt = ['twitter', 'map', 'dotify', 'slack-automation'];

const commands = {};

$(() => {
  const cmd = document.getElementById('terminal');
  const shell = new Shell(cmd, commands);
});

commands.path = () => `users/codebytere/${localStorage.directory}`;
commands.mkdir = () => 'Error: you do not have write access to this directory';

commands.help = () => {
  const output =
    `<div>
      <ul>
        <li><strong>path</strong> - display current directory</li>
        <li><strong>cat FILENAME</strong> - display FILE in window</li>
        <li><strong>cd DIRECTORY</strong> - move into DIRECTORY or just cd to return to root</li>
        <li><strong>ls</strong> - show files in current directory</li>
      </ul>
    </div>`;
  return output;
};

commands.cd = (dir) => {
  console.log(dir);
  if (dirs.includes(dir)) {
    localStorage.directory = dir;
  } else if (dir === 'undefined') {
    localStorage.directory = 'root';
  } else {
    return 'Error: not a valid directory';
  }
  return null;
};

commands.ls = () => {
  switch (localStorage.directory) {
    case 'root':
      return `<p>
        about_me.txt &nbsp&nbsp <span class="dir">projects</span> <br>
        <span class="dir">skills</span> &nbsp&nbsp contact_me.txt <br>
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

commands.hello = (args) => {
  if (args.length < 2) {
    return "<p>Hello. Why don't you tell me your name?</p>";
  }
  return `Hello ${args[1]}`;
};

function getDirectory() {
  return localStorage.directory;
}

function setDirectory(dir) {
  localStorage.directory = dir;
}
