import { Node } from '@tiptap/core';

const OrderedList = Node.create({
  name: 'orderedList',

  content: 'listItem+', 

  group: 'block',

  parseHTML() {
    return [{ tag: 'ol' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ol', HTMLAttributes, 0]; 
  },

  addCommands() {
    return {
      toggleOrderedList: () => ({ commands }) => {
        return commands.toggleList('orderedList', 'listItem');
      },
    };
  },
});

export default OrderedList;
