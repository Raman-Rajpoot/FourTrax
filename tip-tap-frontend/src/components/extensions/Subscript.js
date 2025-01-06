import { Mark } from '@tiptap/core';

const Subscript = Mark.create({
  name: 'subscript',

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: 'sub',
      },
    ];
  },

  renderHTML() {
    return ['sub', 0];
  },

  addCommands() {
    return {
      toggleSubscript:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export default Subscript;
