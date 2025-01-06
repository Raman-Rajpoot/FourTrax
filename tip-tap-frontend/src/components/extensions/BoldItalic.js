import { Mark } from '@tiptap/core';

const BoldItalic = Mark.create({
  name: 'boldItalic',

  addAttributes() {
    return {
      style: {
        default: 'normal',
        parseHTML: (element) => {
          if (element.style.fontWeight === 'bold') return 'bold';
          if (element.style.fontStyle === 'italic') return 'italic';
          return 'normal';
        },
        renderHTML: (attributes) => ({
          style: `font-weight: ${attributes.style === 'bold' ? 'bold' : 'normal'}; font-style: ${attributes.style === 'italic' ? 'italic' : 'normal'};`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'b' },
      { tag: 'i' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const tag = HTMLAttributes.style === 'bold' ? 'b' : 'i';
    return [tag, HTMLAttributes, 0];
  },

  addCommands() {
    return {
      toggleBoldItalic: (style = 'bold') => ({ commands }) => 
        commands.setMark(this.name, { style }),

      removeBoldItalic: () => ({ commands }) => 
        commands.unsetMark(this.name),
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-b': () => this.editor.commands.toggleBoldItalic('bold'),
      'Mod-i': () => this.editor.commands.toggleBoldItalic('italic'),
    };
  },

  addEventListeners() {
    return {
      dblclick: () => {
        const { selection } = this.editor.view.state;
        if (selection.empty) return;

        if (this.editor.isActive('bold') || this.editor.isActive('italic')) {
          this.editor.commands.removeBoldItalic();
        }
      },
    };
  },
});

export default BoldItalic;
