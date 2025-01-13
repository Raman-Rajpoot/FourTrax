import { Mark, mergeAttributes } from '@tiptap/core';

const Tooltip = Mark.create({
  name: 'tooltip',

  addAttributes() {
    return {
      text: {
        default: '', // Tooltip text
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-tooltip]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-tooltip': node.attrs.text,
        class: 'tooltip', // Apply the CSS class for styling
      }),
      node.attrs.text,
    ];
  },

  addCommands() {
    return {
      setTooltip:
        (text) =>
        ({ chain }) => {
          return chain().setMark(this.name, { text }).run();
        },
    };
  },

  addGlobalAttributes() {
    return [
      {
        tag: 'style',
        content: `
          .tooltip {
            position: relative;
            display: inline-block;
            cursor: pointer;
          }
          .tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 5px 10px;
            border-radius: 4px;
            background-color: #333;
            color: white;
            font-size: 14px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0s linear 0.3s;
          }
          .tooltip:hover::after {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.3s ease, visibility 0s linear 0s;
          }
        `,
      },
    ];
  },
});

export default Tooltip;
