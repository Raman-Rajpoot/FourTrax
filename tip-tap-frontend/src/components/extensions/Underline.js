import { Mark } from '@tiptap/core';

const Underline = Mark.create({
  name: 'underline',

  addAttributes() {
    return {
      style: {
        default: 'solid',
        parseHTML: (element) => element.style.textDecorationStyle || 'solid',
        renderHTML: (attributes) => ({
          style: `text-decoration-style: ${attributes.style};`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'u',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['u', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      toggleUnderline:
        (style = 'solid') =>
        ({ commands }) => {
          return commands.setMark(this.name, { style });
        },
      removeUnderline:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default Underline;
