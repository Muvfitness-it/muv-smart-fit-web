
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

export const insertVideo = () => {
  const url = prompt('Inserisci URL video:');
  if (url) {
    // Check if it's a YouTube URL
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    
    if (isYouTube) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        execCommand('insertHTML', 
          `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
            <iframe src="${embedUrl}" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
          </div>`
        );
      }
    } else {
      // For other video URLs or direct video files
      execCommand('insertHTML', 
        `<video controls style="max-width: 100%; height: auto; margin: 20px 0;">
          <source src="${url}" type="video/mp4">
          Il tuo browser non supporta il tag video.
        </video>`
      );
    }
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
