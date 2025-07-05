
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link, Image, Quote, Code, Undo, Redo,
  Palette, Strikethrough
} from 'lucide-react';

interface EditorToolbarProps {
  onCommand: (command: string, value?: string) => void;
  onInsertLink: () => void;
  onInsertImage: () => void;
  onChangeTextColor: () => void;
  onFormatBlock: (tag: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onCommand,
  onInsertLink,
  onInsertImage,
  onChangeTextColor,
  onFormatBlock
}) => {
  const headingButtons = [
    { text: 'P', action: () => onFormatBlock('p'), title: 'Paragrafo' },
    { text: 'H1', action: () => onFormatBlock('h1'), title: 'Titolo 1' },
    { text: 'H2', action: () => onFormatBlock('h2'), title: 'Titolo 2' },
    { text: 'H3', action: () => onFormatBlock('h3'), title: 'Titolo 3' },
    { text: 'H4', action: () => onFormatBlock('h4'), title: 'Titolo 4' },
  ];

  const toolbarButtons = [
    { icon: Undo, action: () => onCommand('undo'), title: 'Annulla' },
    { icon: Redo, action: () => onCommand('redo'), title: 'Ripeti' },
    'separator',
    { icon: Bold, action: () => onCommand('bold'), title: 'Grassetto' },
    { icon: Italic, action: () => onCommand('italic'), title: 'Corsivo' },
    { icon: Underline, action: () => onCommand('underline'), title: 'Sottolineato' },
    { icon: Strikethrough, action: () => onCommand('strikethrough'), title: 'Barrato' },
    'separator',
    { icon: AlignLeft, action: () => onCommand('justifyLeft'), title: 'Allinea a sinistra' },
    { icon: AlignCenter, action: () => onCommand('justifyCenter'), title: 'Centra' },
    { icon: AlignRight, action: () => onCommand('justifyRight'), title: 'Allinea a destra' },
    'separator',
    { icon: List, action: () => onCommand('insertUnorderedList'), title: 'Elenco puntato' },
    { icon: ListOrdered, action: () => onCommand('insertOrderedList'), title: 'Elenco numerato' },
    { icon: Quote, action: () => onFormatBlock('blockquote'), title: 'Citazione' },
    'separator',
    { icon: Link, action: onInsertLink, title: 'Inserisci link' },
    { icon: Image, action: onInsertImage, title: 'Inserisci immagine' },
    'separator',
    { icon: Code, action: () => onFormatBlock('pre'), title: 'Codice' },
    { icon: Palette, action: onChangeTextColor, title: 'Colore testo' },
  ];

  return (
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
  );
};

export default EditorToolbar;
