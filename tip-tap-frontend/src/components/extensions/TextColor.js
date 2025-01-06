import { Mark } from '@tiptap/core';

const TextColor = Mark.create({
  name: 'textColor',

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.color || null,
        renderHTML: (attributes) => {
          if (!attributes.color) return {};
          return { style: `color: ${attributes.color}` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'color',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setTextColor: (color) => ({ commands }) => {
        return commands.setMark(this.name, { color });
      },
      unsetTextColor: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    };
  },
});

export default TextColor;
