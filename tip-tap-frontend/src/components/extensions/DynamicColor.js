import { Mark } from '@tiptap/core';

const DynamicColor = Mark.create({
  name: 'dynamicColor',

  renderHTML() {
    return [
      'span',
      {
        style: `
          display: inline-block;
          animation: dynamicColor 5s infinite linear;
        `,
        'data-type': 'dynamicColor',
      },
      0,
    ];
  },

  addCommands() {
    return {
      setDynamicColor:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetDynamicColor:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

// Add the CSS keyframes to the document's head
const style = document.createElement('style');
style.innerHTML = `
@keyframes dynamicColor {
  0% { color: hsl(0, 100%, 50%); }
  12.5% { color: hsl(60, 100%, 50%); }
  25% { color: hsl(120, 100%, 50%); }
  37.5% { color: hsl(180, 100%, 50%); }
  50% { color: hsl(181, 100.00%, 50.00%); }
  62.5% { color: hsl(300, 100%, 50%); }
  75% { color: hsl(360, 100%, 50%); }
  87.5% { color: hsl(30, 100%, 50%); }
  100% { color: hsl(0, 100%, 50%); }
}
`;
document.head.appendChild(style);

export default DynamicColor;
