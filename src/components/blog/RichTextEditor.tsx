
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link, Image, Quote, Code, Undo, Redo,
  Type, Palette, Strikethrough, Subscript, Superscript
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Inserisci URL:');
    if (url) {
      const text = window.getSelection()?.toString() || 'Link';
      execCommand('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
    }
  };

  const insertImage = () => {
    const url = prompt('Inserisci URL immagine:');
    if (url) {
      execCommand('insertHTML', `<img src="${url}" alt="Immagine" style="max-width: 100%; height: auto;" />`);
    }
  };

  const changeTextColor = () => {
    const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    execCommand('foreColor', color);
  };

  const formatBlock = (tag: string) => {
    execCommand('formatBlock', tag);
  };

  const toolbarButtons = [
    { icon: Undo, action: () => execCommand('undo'), title: 'Annulla' },
    { icon: Redo, action: () => execCommand('redo'), title: 'Ripeti' },
    'separator',
    { icon: Bold, action: () => execCommand('bold'), title: 'Grassetto' },
    { icon: Italic, action: () => execCommand('italic'), title: 'Corsivo' },
    { icon: Underline, action: () => execCommand('underline'), title: 'Sottolineato' },
    { icon: Strikethrough, action: () => execCommand('strikethrough'), title: 'Barrato' },
    'separator',
    { icon: AlignLeft, action: () => execCommand('justifyLeft'), title: 'Allinea a sinistra' },
    { icon: AlignCenter, action: () => execCommand('justifyCenter'), title: 'Centra' },
    { icon: AlignRight, action: () => execCommand('justifyRight'), title: 'Allinea a destra' },
    'separator',
    { icon: List, action: () => execCommand('insertUnorderedList'), title: 'Elenco puntato' },
    { icon: ListOrdered, action: () => execCommand('insertOrderedList'), title: 'Elenco numerato' },
    { icon: Quote, action: () => formatBlock('blockquote'), title: 'Citazione' },
    'separator',
    { icon: Link, action: insertLink, title: 'Inserisci link' },
    { icon: Image, action: insertImage, title: 'Inserisci immagine' },
    'separator',
    { icon: Code, action: () => formatBlock('pre'), title: 'Codice' },
    { icon: Palette, action: changeTextColor, title: 'Colore testo' },
  ];

  const headingButtons = [
    { text: 'P', action: () => formatBlock('p'), title: 'Paragrafo' },
    { text: 'H1', action: () => formatBlock('h1'), title: 'Titolo 1' },
    { text: 'H2', action: () => formatBlock('h2'), title: 'Titolo 2' },
    { text: 'H3', action: () => formatBlock('h3'), title: 'Titolo 3' },
    { text: 'H4', action: () => formatBlock('h4'), title: 'Titolo 4' },
  ];

  return (
    <div className={`border border-gray-600 rounded-lg bg-gray-700 ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-600 p-2 flex flex-wrap items-center gap-1">
        {/* Heading buttons */}
        <div className="flex gap-1 mr-2">
          {headingButtons.map((btn, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={btn.action}
              title={btn.title}
              className="h-8 px-2 text-white hover:bg-gray-600"
            >
              {btn.text}
            </Button>
          ))}
        </div>
        
        <Separator orientation="vertical" className="h-6 bg-gray-500" />
        
        {/* Main toolbar buttons */}
        {toolbarButtons.map((item, index) => {
          if (item === 'separator') {
            return <Separator key={index} orientation="vertical" className="h-6 bg-gray-500" />;
          }
          
          const btn = item as { icon: any; action: () => void; title: string };
          const Icon = btn.icon;
          
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={btn.action}
              title={btn.title}
              className="h-8 w-8 p-0 text-white hover:bg-gray-600"
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[400px] p-4 text-white focus:outline-none"
        style={{ lineHeight: '1.6' }}
        onInput={updateContent}
        onPaste={(e) => {
          // Consenti paste ma pulisci la formattazione eccessiva
          setTimeout(updateContent, 10);
        }}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.875rem 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        
        [contenteditable] h4 {
          font-size: 1.125rem;
          font-weight: bold;
          margin: 0.625rem 0;
        }
        
        [contenteditable] p {
          margin: 0.5rem 0;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #60A5FA;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
        }
        
        [contenteditable] pre {
          background: #1F2937;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 2rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        
        [contenteditable] a {
          color: #60A5FA;
          text-decoration: underline;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
