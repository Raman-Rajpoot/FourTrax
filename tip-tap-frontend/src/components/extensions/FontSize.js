import { Extension } from '@tiptap/react';

export const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'text'], // You can define the block types where font size should be applied
    };
  },

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ''),
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ commands }) => {
          return commands.updateAttributes('paragraph', { fontSize: fontSize + 'px' });
        },

      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.updateAttributes('paragraph', { fontSize: null }); // Reset font size to default
        },
    };
  },
});


export default FontSize;
