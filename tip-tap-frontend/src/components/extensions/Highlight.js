import { Mark } from '@tiptap/core';

const Highlight = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      color: '#fff', 
    };
  },

  addAttributes() {
    return {
      color: {
        default: this.options.color,
        parseHTML: (element) => element.style.backgroundColor || null,
        renderHTML: (attributes) => {
          if (!attributes.color) return {};
          return { style: `background-color: ${attributes.color}; color: black;` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-highlight]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        ...HTMLAttributes,
        'data-highlight': true,
      },
      0,
    ];
  },

  addCommands() {
    return {
      setHighlight:
        (options) =>
        ({ commands }) => {
          return commands.setMark(this.name, options);
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default Highlight;
