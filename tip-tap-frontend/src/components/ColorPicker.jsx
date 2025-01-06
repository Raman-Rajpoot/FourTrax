import React from 'react';
import colorImg from './images/color.png'
import './ColorPicker.css'
const ColorPicker = ({ editor }) => {
  if (!editor) return null;

  const handleColorClick = (color) => {
    editor.chain().focus().setTextColor(color).run();
  };

  const handleCustomColorChange = (event) => {
    editor.chain().focus().setTextColor(event.target.value).run();
  };

  return (
    <div className="color-picker-container" style={{ display: 'flex', gap: '5px' }}>
      {['black', 'white', 'blue', 'gray', 'red', 'green'].map((color) => (
        <button
          key={color}
          style={{
            backgroundColor: color,
          }}
          onClick={() => handleColorClick(color)}
        />
      ))}
              <label>
                <span><img src={colorImg} className='color-picker-img' /></span>
                <input
                  type="color"
                 
                  onChange={handleCustomColorChange}
                />
              </label>
    </div>
  );
};

export default ColorPicker;
