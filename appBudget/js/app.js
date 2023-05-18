const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

// Open, Close, Minimize, Maximize buttons
const reduceBtn = document.getElementById('reduceBtn');
const closeBtn = document.getElementById('closeBtn');
const sizeBtn = document.getElementById('sizeBtn');

// Open, Close, Minimize, Maximize buttons events
reduceBtn.addEventListener('click', () => {
    ipc.send('reduceApp');
});
closeBtn.addEventListener('click', () => {
    ipc.send('closeApp');
});
sizeBtn.addEventListener('click', () => {
    ipc.send('sizeApp');
});
