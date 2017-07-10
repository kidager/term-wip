class shell {
  constructor(term, commands) {
    this.commands = commands;
    this.setupListeners(term);
    this.term = term;

    localStorage.directory = 'root';
    localStorage.history = JSON.stringify('');

    $('.input').focus();
  }

  setupListeners(term) {
    $('#terminal').mouseup(() => {
      $('.input').last().focus();
    });

    term.addEventListener('keypress', (evt) => {
      if (evt.keyCode !== 13) {
        return false;
      }

      const prompt = evt.target;
      const input = prompt.textContent.trim().split(' ');
      const cmd = input[0];
      const args = input[1];

      if (cmd === 'clear') {
        this.clearConsole();
      } else if (cmd && cmd in this.commands) {
        this.runCommand(cmd, args);
        this.resetPrompt(term, prompt);
      } else {
        this.term.innerHTML += 'Error: command not recognized';
        this.resetPrompt(term, prompt);
      }

      evt.preventDefault();
      return true;
    });
  }

  runCommand(cmd, args) {
    const command = args ? `${cmd} ${args}` : cmd;
    this.updateHistory(command);

    const output = this.commands[cmd](args);
    if (output) { this.term.innerHTML += output; }
  }

  resetPrompt(term, prompt) {
    const newPrompt = prompt.parentNode.cloneNode(true);
    prompt.setAttribute('contenteditable', false);
    if (this.prompt) {
      newPrompt.querySelector('.prompt').textContent = this.prompt;
    }
    term.appendChild(newPrompt);
    newPrompt.querySelector('.input').innerHTML = '';
    newPrompt.querySelector('.input').focus();
  }

  updateHistory(command) {
    let history = localStorage.history;
    console.log(JSON.parse(history));
    history = history ? Object.values(JSON.parse(history)) : [];

    history.push(command);
    localStorage.history = JSON.stringify(history);
  }

  clearConsole() {
    $('#terminal').html(
      `<p class="hidden">
        <span class="prompt">
          <span class="root">root</span>
          <span class="tick">❯</span>
        </span>
        <span contenteditable="true" class="input"></span>
      </p>`
    );
    this.term.querySelector('.input').focus();
  }
}
