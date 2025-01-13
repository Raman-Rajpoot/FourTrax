import { Node, mergeAttributes } from '@tiptap/core';

const DropdownText = Node.create({
  name: 'dropdownText',

  group: 'inline',
  inline: true,
  atom: true, // Treat it as an atomic element

  addAttributes() {
    return {
      position: {
        default: 'top', // Default position is 'top'
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-dropdown-text]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-dropdown-text': node.attrs.position,
      }),
      0, // Place content inside the span
    ];
  },

  addCommands() {
    return {
      setDropdownText:
        (position) =>
        ({ chain }) => {
          return chain().setNode(this.name, { position }).run();
        },
    };
  },

  addProseMirrorPlugins() {
    const style = `
      span[data-dropdown-text="top"] {
        display: inline-block;
        position: relative;
        top: 0;
      }

      span[data-dropdown-text="dropdown"] {
        display: inline-block;
        position: relative;
        top: 20px;
        opacity: 0;
        transition: top 0.2s ease, opacity 0.2s ease;
      }

      span[data-dropdown-text="dropdown"]:hover {
        opacity: 1;
        top: 0;
      }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);

    return [];
  },
});

export default DropdownText;
