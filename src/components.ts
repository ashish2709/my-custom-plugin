import type { Editor } from "grapesjs";
import { PluginOptions } from ".";

export const typeCustomTextInput = 'CUSTOM-TEXT-INPUT';
export const typeCustomImage = 'CUSTOM-IMAGE';
export const typeCustomCarousel = 'CUSTOM-CAROUSEL';

export default (editor: Editor, opts: Required<PluginOptions>) => {

  const { Components } = editor;
  const { customDefaultText, imageSrc } = opts;

  Components.addType(typeCustomTextInput, {

    isComponent: el => el.tagName == 'INPUT',

    model: {
      defaults: {
        tagName: 'input',
        draggable: true,
        droppable: false,
        attributes: {
          type: 'text',
          value: customDefaultText,
        },
        style: {
          padding: '8px',
          height: '40px',
          margin: '32px 0'
        }
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
          src: imageSrc,
        },
        style: {
          width: '200px',
          height: '300px',
        }
      },
    }
  })
};
