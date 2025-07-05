
import React from 'react';
import EditorToolbar from './EditorToolbar';
import EditorContent from './EditorContent';
import { execCommand, insertLink, insertImage, changeTextColor, formatBlock } from './EditorUtils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Scrivi il tuo articolo...",
  className = ""
}) => {
  const handleCommand = (command: string, value?: string) => {
    execCommand(command, value);
    // Trigger onChange after command execution
    setTimeout(() => {
      const editorElement = document.querySelector('[contenteditable]') as HTMLDivElement;
      if (editorElement) {
        onChange(editorElement.innerHTML);
      }
    }, 10);
  };

  const handleInsertLink = () => {
    insertLink();
    // Trigger onChange after link insertion
    setTimeout(() => {
      const editorElement = document.querySelector('[contenteditable]') as HTMLDivElement;
      if (editorElement) {
        onChange(editorElement.innerHTML);
      }
    }, 10);
  };

  const handleInsertImage = () => {
    insertImage();
    // Trigger onChange after image insertion
    setTimeout(() => {
      const editorElement = document.querySelector('[contenteditable]') as HTMLDivElement;
      if (editorElement) {
        onChange(editorElement.innerHTML);
      }
    }, 10);
  };

  const handleChangeTextColor = () => {
    changeTextColor();
    // Trigger onChange after color change
    setTimeout(() => {
      const editorElement = document.querySelector('[contenteditable]') as HTMLDivElement;
      if (editorElement) {
        onChange(editorElement.innerHTML);
      }
    }, 10);
  };

  const handleFormatBlock = (tag: string) => {
    formatBlock(tag);
    // Trigger onChange after format block
    setTimeout(() => {
      const editorElement = document.querySelector('[contenteditable]') as HTMLDivElement;
      if (editorElement) {
        onChange(editorElement.innerHTML);
      }
    }, 10);
  };

  return (
    <div className={`border border-gray-600 rounded-lg bg-gray-700 ${className}`}>
      <EditorToolbar
        onCommand={handleCommand}
        onInsertLink={handleInsertLink}
        onInsertImage={handleInsertImage}
        onChangeTextColor={handleChangeTextColor}
        onFormatBlock={handleFormatBlock}
      />
      <EditorContent
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
