import type { Editor } from "grapesjs";
import { PluginOptions } from ".";

export const typeCustomTextInput = 'CUSTOM-TEXT-INPUT';
export const typeCustomImage = 'CUSTOM-IMAGE';
export const typeCustomCarousel = 'CUSTOM-CAROUSEL';
export const typeCustomButton = 'CUSTOM-BUTTON';


const handleButtonClick = function() {
  //@ts-ignore
  this.onclick = function() {
    alert('hi')
  }
}

export default (editor: Editor, opts?: Required<PluginOptions>) => {

  const { Components } = editor;
  // const { customDefaultText, imageSrc } = opts;

  Components.addType(typeCustomTextInput, {
    isComponent: el => el.tagName === "DIV",

    extend: 'text',
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: false,
        removable: true,
        stylable: true,
        editable: true,
        type: 'text',
        content: 'Insert Text here',
        style: {
          padding: '8px',
          height: '40px',
          margin: '32px 0',
          width: '100%'
        },
      },
    }
  });

  Components.addType(typeCustomImage, {
    isComponent: el => el.tagName === 'IMAGE',

    model: {
      defaults: {
        tagName: 'img',
        draggable: true,
        droppable: false,
        attributes: {
          src: '',
        },
        style: {
          width: '200px',
          height: '300px',
        }
      },
    }
  });

  Components.addType(typeCustomButton, {
    isComponent: el => el.tagName === 'BUTTON',

    extend: "button",
    model: {
      defaults: {
        tagName: 'button',
        draggable: true,
        droppable: false,
        content: 'Click me',
        attributes: {
          type: 'button',
        },
        script: handleButtonClick
      },
    }
  });
};
