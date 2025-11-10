
    /*********************************************************
     * Simple, well-documented JavaScript examples
     *********************************************************/

    // --- Utilities ---
    const $ = (sel) => document.querySelector(sel);
    const create = (tag, props = {}) => Object.assign(document.createElement(tag), props);

    // -----------------------------
    // 1. Show current date/time & theme toggle
    // -----------------------------
    const timeOutput = $('#timeOutput');
    $('#showTimeBtn').addEventListener('click', () => {
      // Use toLocaleString to make the output human-friendly
      const now = new Date();
      timeOutput.textContent = 'Current date & time: ' + now.toLocaleString();
    });

    // Theme toggle — lightweight: toggles a dark mode by inverting colors
    const themeBtn = $('#themeBtn');
    let dark = false;
    themeBtn.addEventListener('click', () => {
      dark = !dark;
      if (dark) {
        document.documentElement.style.setProperty('--bg', '#0b1220');
        document.documentElement.style.setProperty('--card', '#071426');
        document.documentElement.style.setProperty('--accent', '#60a5fa');
        document.documentElement.style.setProperty('--muted', '#9aa9bf');
      } else {
        // revert to defaults
        document.documentElement.style.setProperty('--bg', '#f7fafc');
        document.documentElement.style.setProperty('--card', '#ffffff');
        document.documentElement.style.setProperty('--accent', '#2563eb');
        document.documentElement.style.setProperty('--muted', '#64748b');
      }
    });


    // -----------------------------
    // 2. DOM manipulation + localStorage persistence
    // -----------------------------
    const listEl = $('#itemsList');
    const newItemInput = $('#newItem');
    const addItemBtn = $('#addItemBtn');

    // Save/load list to localStorage under the key "todoList"
    function loadList(){
      const raw = localStorage.getItem('todoList');
      let items = [];
      try {
        items = raw ? JSON.parse(raw) : [];
      } catch(e) { items = []; }
      // clear UI
      listEl.innerHTML = '';
      items.forEach((text, idx) => {
        const li = create('li');
        li.textContent = text + ' ';
        // remove button
        const del = create('button', { textContent: 'Remove' });
        del.style.marginLeft = '.5rem';
        del.addEventListener('click', () => {
          removeItem(idx);
        });
        li.appendChild(del);
        listEl.appendChild(li);
      });
    }

    function saveList(items){
      localStorage.setItem('todoList', JSON.stringify(items));
      loadList();
    }

    function addItem(text){
      if (!text || !text.trim()) return;
      const raw = localStorage.getItem('todoList');
      const items = raw ? JSON.parse(raw) : [];
      items.push(text.trim());
      saveList(items);
      newItemInput.value = '';
      newItemInput.focus();
    }

    function removeItem(index){
      const raw = localStorage.getItem('todoList');
      const items = raw ? JSON.parse(raw) : [];
      if (index >=0 && index < items.length) {
        items.splice(index, 1);
        saveList(items);
      }
    }

    addItemBtn.addEventListener('click', () => addItem(newItemInput.value));
    // also allow Enter key to add
    newItemInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addItem(newItemInput.value);
    });

    // Load on startup
    loadList();

    // -----------------------------
    // 3. Form validation (client-side)
    // -----------------------------
    const contactForm = $('#contactForm');
    const formMsg = $('#formMsg');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent actual submission for demo purposes

      // Basic HTML5 validity checking can be used:
      if (!contactForm.checkValidity()){
        formMsg.textContent = 'Please fill required fields correctly.';
        formMsg.className = 'msg';
        return;
      }

      // Additional custom validation (example): simple name length check
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      if (name.length < 2) {
        formMsg.textContent = 'Name must be at least 2 characters.';
        formMsg.className = 'msg';
        return;
      }

      // simulate success action (e.g., send to server)
      formMsg.textContent = `Thanks ${name}! (email: ${email}) — form validated client-side.`;
      formMsg.className = 'msg success';
      // NOTE: In real apps, you should still validate on the server!
    });

    contactForm.addEventListener('reset', () => {
      formMsg.textContent = '';
      formMsg.className = 'msg';
    });

    // -----------------------------
    // 4. Client-side calculator
    // -----------------------------
    const calcBtn = $('#calcBtn');
    const calcResult = $('#calcResult');

    calcBtn.addEventListener('click', () => {
      const n1 = parseFloat($('#num1').value);
      const n2 = parseFloat($('#num2').value);
      const op = $('#op').value;

      // handle missing inputs
      if (Number.isNaN(n1) || Number.isNaN(n2)) {
        calcResult.textContent = 'Please enter both numbers.';
        calcResult.className = 'msg';
        return;
      }

      let result;
      switch(op) {
        case 'add': result = n1 + n2; break;
        case 'sub': result = n1 - n2; break;
        case 'mul': result = n1 * n2; break;
        case 'div':
          if (n2 === 0) {
            calcResult.textContent = 'Cannot divide by zero.';
            calcResult.className = 'msg';
            return;
          }
          result = n1 / n2;
          break;
        default: result = 'unknown op';
      }
      calcResult.textContent = 'Result: ' + result;
      calcResult.className = 'msg success';
    });

    // --- End of script ---
 
