import { Extension } from '@tiptap/core';

const TextTransform = Extension.create({
  name: 'textTransform',

  addCommands() {
    return {
      toUpperCase:
        () =>
        ({ state, dispatch }) => {
          const { from, to } = state.selection;
          const tr = state.tr;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isTextblock) { // Ensure node is a textblock
              const textContent = node.textContent; // Get the text content of the node
              const newText = textContent.toUpperCase();
              // Create a new text node with uppercase text
              const textNode = state.schema.text(newText);
              tr.replaceWith(pos, pos + node.nodeSize, textNode);
            }
          });

          if (tr.docChanged) {
            dispatch(tr);
          }
          return true;
        },

      toLowerCase:
        () =>
        ({ state, dispatch }) => {
          const { from, to } = state.selection;
          const tr = state.tr;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isTextblock) { // Ensure node is a textblock
              const textContent = node.textContent; // Get the text content of the node
              const newText = textContent.toLowerCase();
              // Create a new text node with lowercase text
              const textNode = state.schema.text(newText);
              tr.replaceWith(pos, pos + node.nodeSize, textNode);
            }
          });

          if (tr.docChanged) {
            dispatch(tr);
          }
          return true;
        },

      toCapitalize:
        () =>
        ({ state, dispatch }) => {
          const { from, to } = state.selection;
          const tr = state.tr;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isTextblock) { // Ensure node is a textblock
              const textContent = node.textContent; // Get the text content of the node
              const newText = textContent
                .split(' ') // Split the text into words
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
                .join(' '); // Join the words back into a sentence

              // Create a new text node with capitalized text
              const textNode = state.schema.text(newText);
              tr.replaceWith(pos, pos + node.nodeSize, textNode);
            }
          });

          if (tr.docChanged) {
            dispatch(tr);
          }
          return true;
        },
    };
  },
});

export default TextTransform;