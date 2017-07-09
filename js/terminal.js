const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_TAB = 9;

class Shell {
  constructor(cmd, commands) {
    this.commands = commands;
    this.setupListeners(cmd);
    localStorage.directory = 'root';

    cmd.querySelector('.input').focus();
  }

  setupListeners(cmd) {
    cmd.addEventListener('keypress', (evt) => {
      const prompt = event.target;
      if (event.keyCode !== 13) { return false; }

      const input = prompt.textContent.split(' ');
      if (input[0] === 'clear') {
        this.clearConsole();
      } else if (input[0] && input[0] in this.commands) {
        this.runCommand(cmd, input[0], input[1]);
        this.resetPrompt(cmd, prompt);
      }

      event.preventDefault();
      return true;
    });
  }

  resetPrompt(term, prompt) {
    const newPrompt = prompt.parentNode.cloneNode(true);
    prompt.setAttribute('contenteditable', false);
    if (this.prompt) {
      newPrompt.querySelector('.prompt').textContent = this.prompt;
    }
    term.appendChild(newPrompt);
    newPrompt.querySelector('.input').innerHTML = ' ';
    newPrompt.querySelector('.input').focus();
  }

  runCommand(term, cmd, args) {
    const output = this.commands[cmd](args);
    if (output) { term.innerHTML += output; }
  }

  clearConsole() {
    $('#terminal').html(
      `<p class="hidden">
        <span class="prompt">root $</span>
        <span contenteditable="true" class="input"> </span>
      </p>`
    );
  }
}
