
export const execCommand = (command: string, value?: string) => {
  document.execCommand(command, false, value);
};

export const insertLink = () => {
  const url = prompt('Inserisci URL:');
  if (url) {
    const text = window.getSelection()?.toString() || 'Link';
    execCommand('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
  }
};

export const insertImage = () => {
  const url = prompt('Inserisci URL immagine:');
  if (url) {
    execCommand('insertHTML', `<img src="${url}" alt="Immagine" style="max-width: 100%; height: auto;" />`);
  }
};

export const changeTextColor = () => {
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  execCommand('foreColor', color);
};

export const formatBlock = (tag: string) => {
  execCommand('formatBlock', tag);
};
