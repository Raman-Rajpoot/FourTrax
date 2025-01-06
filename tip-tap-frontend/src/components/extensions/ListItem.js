import { Node } from '@tiptap/core';

const ListItem = Node.create({
  name: 'listItem',

  content: 'paragraph block*',

  parseHTML() {
    return [{ tag: 'li' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['li', HTMLAttributes, 0]; 
  },
});

export default ListItem;
