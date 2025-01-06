import { Node } from '@tiptap/core';

const Heading = Node.create({
  name: 'customHeading',

  group: 'block',
  content: 'inline*', 
  defining: true, 

  addAttributes() {
    return {
      level: {
        default: 1, 
        parseHTML: (element) => parseInt(element.tagName.replace('H', ''), 10),
        renderHTML: (attributes) => {
          return {
            level: attributes.level, 
          };
        },
      },
    };
  },

  parseHTML() {
    // Parse HTML tags from <h1> to <h6>
    return Array.from({ length: 6 }, (_, i) => ({
      tag: `h${i + 1}`,
    }));
  },

  renderHTML({ node }) {
    const level = node.attrs.level || 1; 
    return [`h${level}`, 0]; 
  },

  addCommands() {
    return {
      toggleHeading:
        (level) =>
        ({ state, commands }) => {
          const { selection } = state;
          const currentNode = state.doc.resolve(selection.$anchor.pos).parent;

          if (
            currentNode.type.name === this.name && currentNode.attrs.level === level ) {
            return commands.setNode('paragraph');
          }

          return commands.toggleNode(this.name, 'paragraph', { level });
        },
    };
  },
});

export default Heading;
