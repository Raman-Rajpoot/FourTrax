import { Node } from '@tiptap/core';

const CenterAlignment = Node.create({
  name: 'centerAlignment',

  group: 'block',
  content: 'inline*',
  defining: true,

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: 'div[style*="text-align: center"]', 
      },
    ];
  },

  renderHTML() {
    return [
      'div',
      {
        style: `text-align: center; max-width: 100%; box-sizing: border-box;`,
      },
      0, 
    ];
  },

  addCommands() {
    return {
      setCenterAlignment:
        () =>
        ({ commands }) => {
          return commands.setNode('centerAlignment');
        },
      unsetCenterAlignment:
        () =>
        ({ commands }) => {
          return commands.setNode('paragraph'); 
        },
    };
  },
});

export default CenterAlignment;
