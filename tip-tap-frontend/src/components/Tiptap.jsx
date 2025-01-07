import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'; 
import TextColor from './extensions/TextColor';
import Underline from './extensions/Underline';
import BoldItalic from './extensions/BoldItalic';
import OrderedList from './extensions/Orderedlist';
import UnorderedList from './extensions/UnOrderedlist';
import ListItem from './extensions/ListItem';
import Highlight from './extensions/Highlight';
import Heading from './extensions/Heading';
import CenterAlignment from './extensions/CenterAlignment';
import ColorPicker from './ColorPicker';
import colorImg from './images/color.png'
import './Tiptap.css';
import Subscript from './extensions/Subscript';
import Superscript from './extensions/Superscript';
import TextTransform from './extensions/TextTransform.js';
import StarterKit from '@tiptap/starter-kit';

const Tiptap = () => {
  const [underlineStyle, setUnderlineStyle] = useState('solid');
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [color, setColor] = useState('#fff');
  const [textColor, setTextColor] = useState('#000000');
  const [savedContent, setSavedContent] = useState(''); // State to store saved content

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BoldItalic,
      TextColor,
      OrderedList,
      UnorderedList,
      ListItem,
      Highlight.configure({ color: '#fff' }),
      Heading,
      CenterAlignment,
      Subscript,  
      Superscript, 
      TextTransform,
    ],
    content: '<p></p>',
  });

  if (!editor) return null;

  // Formatting Functions
  const toggleUnderline = (style) => {
    if (isUnderlined && style === underlineStyle) {
      editor.chain().focus().unsetMark('underline').run();
      setIsUnderlined(false);
    } else {
      editor.chain().focus().toggleUnderline(style).run();
      setIsUnderlined(true);
      setUnderlineStyle(style);
    }
  };

  const toggleMark = (mark) => {
    editor.chain().focus()[`toggle${mark}`]().run();
  };

  const toggleList = (listType) => {
    editor.chain().focus()[`toggle${listType}List`]().run();
  };

  const toggleHighlight = () => {
    editor.chain().focus()[editor.isActive('highlight') ? 'unsetHighlight' : 'setHighlight']({ color }).run();
  };

  // Toggle center alignment
  const toggleCenterAlignment = () => {
    const isCentered = editor.isActive('centerAlignment');
    if (isCentered) {
      editor.chain().focus().unsetCenterAlignment().run();
    } else {
      editor.chain().focus().setCenterAlignment().run();
    }
  };

  const toggleHeading = (level) => {
    editor.chain().focus().toggleHeading( level ).run();
  };
  
  const toggleSuperscript = ()=> {
     editor.chain().focus().toggleSuperscript().run(); 
  };
  
  const toggleSubscript = () => {
    editor.chain().focus().toggleSubscript().run(); 
  };

  // Save the editor content
  const saveContent = () => {
    setSavedContent(editor.getHTML()); 
  };

  return (
    <div className='container'>
      <h1 className='header'>Custom Tiptap Editor</h1>

      <div className='nav-bar'>
        <div className="dropdown">
          <button className="dropbtn btn" style={isUnderlined ? { textDecoration: `underline ${underlineStyle}` } : {}}>
            U
          </button>
          <div className="dropdown-content">
            <button onClick={() => toggleUnderline('solid')} className='btn'>Solid</button>
            <button onClick={() => toggleUnderline('dotted')} className='btn'>Dotted</button>
          </div>
        </div>

        {/* Heading Buttons */}
        <div className="headings">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button key={level} onClick={() => toggleHeading(level)} className='btn'>{`h${level}`}</button>
          ))}
          <button key={7} onClick={() => toggleHeading(7)} className='btn'>{`Normal`}</button>
        </div>
        
        {/* Formatting Buttons */}
        <div className="toolbar">
          <button onClick={() => toggleMark('Bold')} className='btn'> <b>B</b> </button>
          <button onClick={() => toggleMark('Italic')} className='btn'> <i> I </i></button>
          <button onClick={() => toggleList('Ordered')} className='btn'>Ordered List</button>
          <button onClick={() => toggleList('Bullet')} className='btn'>Unordered List</button>
          <button onClick={() => toggleCenterAlignment('CenterAlignment')} className='btn'>Center</button>
        </div>
      </div>

      <div className='nav-bar'>
        {/* Highlight Color Picker */}
        <div className="highlight">
          <label>
            <span><img src={colorImg} /></span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <button onClick={toggleHighlight} className='btn'>Highlight</button>
        </div> 

        {/* Text Color Picker */}
        <div className="color">
          <span>Text-color: </span>
          <ColorPicker editor={editor} />
        </div>
         {/* Buttons for subscript and superscript */}
          <button onClick={toggleSuperscript} className='btn'>Superscript</button>
          <button onClick={toggleSubscript} className='btn'>Subscript</button>

        {/* Buttons to trigger text transformations */}
      <button onClick={() => editor.commands.toUpperCase()} className='btn'>Uppercase</button>
      <button onClick={() => editor.commands.toLowerCase()} className='btn'>Lowercase</button>
      <button onClick={() => editor.commands.toCapitalize()} className='btn'>Capitalize</button>

        
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="editor-content" />

      {/* Save Button */}
      <button onClick={saveContent} className='btn save-btn'>Save</button>

      {/* Display Saved Content */}
      <div className="saved-content">
        <h2>Saved Content</h2>
        <div dangerouslySetInnerHTML={{ __html: savedContent }} />
      </div>
    </div>
  );
};

export default Tiptap;
