import { Mark } from '@tiptap/core';

const TextOpacity = Mark.create({
  name: 'opacity',

  addAttributes() {
    return {
      opacity: {
        default: 1, // Default opacity is 1 (fully opaque)
        parseHTML: (element) => {
          return element.style.opacity || 1;
        },
        renderHTML: (attributes) => {
          if (attributes.opacity === 1) {
            return {}; // If opacity is 1, we don't need to set any style
          }
          return { style: `opacity: ${attributes.opacity};` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'opacity',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      // Set the opacity to the specified value
      setOpacity:
        (opacity) =>
        ({ commands }) => {
          return commands.setMark(this.name, { opacity });
        },

      // Remove the opacity styling
      unsetOpacity:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addProseMirrorPlugins() {
    return [];
  },
});

export default TextOpacity;
