import { Mark } from '@tiptap/core';

const Text3D = Mark.create({
  name: 'text3D',

  addAttributes() {
    return {
      positionX: {
        default: 7, // Default horizontal 3D position
      },
      positionY: {
        default: 7, // Default vertical 3D position
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="text3D"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const positionX = HTMLAttributes.positionX || 7;
    const positionY = HTMLAttributes.positionY || 7;

    return [
      'span',
      {
        'data-type': 'text3D',
        style: `
          display: inline-block;
          position: relative;
          font-size: 1.1em;
          letter-spacing: 0.1em;
          padding-right :2px;
          text-align: center;
          text-shadow: 
            1px 1px 0 grey, 
            2px 2px 0 grey, 
            3px 3px 0 grey, 
            4px 4px 0 grey, 
            5px 5px 0 grey, 
            6px 6px 0 black;
          transform: 
            translateX(calc(${positionX}px - 7px))
            translateY(calc(${positionY}px - 7px))
            rotateX(calc(${positionY} * 5deg))
            rotateY(calc(${positionX} * 5deg));
          animation: colorChange 3s infinite linear;
        `,
      },
      0,
    ];
  },

  addCommands() {
    return {
      setText3D:
        (positionX = 7, positionY = 7) =>
        ({ commands }) => {
          return commands.setMark(this.name, { positionX, positionY });
        },
      unsetText3D:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});


export default Text3D;
