import { Node } from '@tiptap/core';

const UnorderedList = Node.create({
  name: 'unorderedList',

  content: 'listItem+', 

  group: 'block',

  parseHTML() {
    return [{ tag: 'ul' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ul', HTMLAttributes, 0]; 
  },

  addCommands() {
    return {
      toggleUnorderedList: () => ({ commands }) => {
        return commands.toggleList('unorderedList', 'listItem');
      },
    };
  },
});

export default UnorderedList;
