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
          const { tr, schema, selection } = state;
          const { from, to } = selection;
          const markType = schema.marks.superscript; // Use the mark type

          // Check if the mark is active in the selection
          let markActive = false;
          state.doc.nodesBetween(from, to, (node) => {
            if (markType.isInSet(node.marks)) {
              markActive = true;
            }
          });

          if (markActive) {
            // If the mark is active, remove it
            tr.removeMark(from, to, markType);
          } else {
            // Otherwise, add the mark
            tr.addMark(from, to, markType.create());
          }

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        },
    };
  },
});

export default Superscript;
