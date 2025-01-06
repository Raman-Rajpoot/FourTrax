import { Mark } from '@tiptap/core';

const Superscript = Mark.create({
  name: 'superscript',

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: 'sup',
      },
    ];
  },

  renderHTML() {
    return ['sup', 0];
  },

  addCommands() {
    return {
      toggleSuperscript:
        () =>
        ({ state, dispatch }) => {
          const tr = state.tr;
          const { from, to } = state.selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isTextblock) {
              tr.removeMark(from, to, this.name);
            }
          });

          if (tr.docChanged) {
            dispatch(tr);
          }

          return tr.setSelection(state.selection).addMark(from, to, this.createMark());
        },
    };
  },
});

export default Superscript;
