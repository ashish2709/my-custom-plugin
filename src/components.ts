import type { Editor, ComponentManager } from "grapesjs";
import { PluginOptions } from ".";

export const typeCustomTextInput = 'CUSTOM-TEXT-INPUT';
export const typeCustomImage = 'CUSTOM-IMAGE';
export const typeCustomCarousel = 'CUSTOM-CAROUSEL';
export const typeCustomButton = 'CUSTOM-BUTTON';
export const typeCarousel = 'CAROUSEL';

const carouselChildDefaultStyle = {
  width: '100%',
  height: '400px',
  flex: '1',
  border: '1px solid green',
};


const handleCarouselButtonLogic = function (
  action: string,
  nextSlideIndex: Number,
  numSlides: Number,
  DomComponents: ComponentManager,
) {

  const prevBtnAttributes = DomComponents?.getWrapper()?.find(`#carousel-prev-btn`)[0].getAttributes();
  const nextBtnAttributes = DomComponents?.getWrapper()?.find(`#carousel-next-btn`)[0].getAttributes();
    

  if ((action === 'prev' || action === 'init') && nextSlideIndex === 0) {
    DomComponents?.getWrapper()?.find(`#carousel-prev-btn`)[0].setAttributes({
      ...prevBtnAttributes,
      disabled: true,
      currentSlide: nextSlideIndex,
    });
    DomComponents?.getWrapper()?.find(`#carousel-next-btn`)[0].setAttributes({
      ...nextBtnAttributes,
      disabled: false,
      currentSlide: nextSlideIndex,
    });
  } else if (action === 'next' && nextSlideIndex === numSlides) {
    DomComponents?.getWrapper()?.find(`#carousel-next-btn`)[0].setAttributes({
      ...nextBtnAttributes,
      disabled: true,
      currentSlide: nextSlideIndex,
    });
    DomComponents?.getWrapper()?.find(`#carousel-prev-btn`)[0].setAttributes({
      ...prevBtnAttributes,
      disabled: false,
      currentSlide: nextSlideIndex,
    });
  }
}

const handleButtonClick = function (DomComponents: ComponentManager, model: any) {

  const currentSlideIndex = model.attributes.attributes.currentSlide;
  const numSlides = model.parent().attributes.numSlides;
  const action = model.attributes.attributes.buttonType;
  let nextSlideIndex = currentSlideIndex;

  if (action === 'next' && nextSlideIndex <= numSlides) {

    nextSlideIndex = parseInt(currentSlideIndex) + 1;
    handleCarouselButtonLogic(action, nextSlideIndex, numSlides-1, DomComponents);
    const currentSlide = DomComponents?.getWrapper()?.find(`#carousel-child-div-${currentSlideIndex}`)[0];
    const nextSlide = DomComponents?.getWrapper()?.find(`#carousel-child-div-${nextSlideIndex}`)[0];

    currentSlide?.setStyle({
      ...carouselChildDefaultStyle,
      display: 'none',
    });
    nextSlide?.setStyle({
      ...carouselChildDefaultStyle,
      display: 'block',
    });

  } else if (action === 'prev' && nextSlideIndex >= 0) {

    nextSlideIndex = parseInt(currentSlideIndex) - 1;
    handleCarouselButtonLogic(action, nextSlideIndex, numSlides-1, DomComponents);
    const currentSlide = DomComponents?.getWrapper()?.find(`#carousel-child-div-${currentSlideIndex}`)[0];
    const nextSlide = DomComponents?.getWrapper()?.find(`#carousel-child-div-${nextSlideIndex}`)[0];

    currentSlide?.setStyle({
      ...carouselChildDefaultStyle,
      display: 'none',
    });
    nextSlide?.setStyle({
      ...carouselChildDefaultStyle,
      display: 'block',
    });
  }
}

export default (editor: Editor, opts?: Required<PluginOptions>) => {

  const {
    Components,
    DomComponents,
  } = editor;
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

    extend: "image",
    model: {
      defaults: {
        tagName: 'img',
        draggable: true,
        droppable: false,
        attributes: {
          src: '',
        },
        style: {
          width: '100%',
          height: '100%',
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
      },
    },
    view: {
      init() {
        this.el.onclick = () => handleButtonClick(DomComponents, this.model);
      },
    },
  });

  Components.addType(typeCarousel, {
    isComponent: el => el.tagName === 'DIV',

    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: true,
        attributes: {
          numSlides: 0,
          id: 'carousel-div',
        },
        style: {
          width: '400px',
          height: 'auto',
          position: 'absolute',
          transform: 'translate(50%, -50%)',
          border: '1px solid black',
          top: '50%',
          right: '50%',
          display: 'flex',
          padding: '1rem',
          gap: '1rem',
        },

        components: [
          {
            type: typeCustomButton,
            attributes: {
              buttonType: 'prev',
              currentSlide: 0,
              id: 'carousel-prev-btn',
            },
            style: {
              position: 'absolute',
              bottom: '0',
            },
            content: 'Prev',
          },
          {
            type: typeCustomButton,
            attributes: {
              buttonType: 'next',
              currentSlide: 0,
              id: 'carousel-next-btn',
            },
            style: {
              position: 'absolute',
              bottom: '0',
              right: '1rem',
            },
            content: 'Next',
          }
        ]
      },

      init() {
        if (!this.attributes.numSlides) {
          const value: string | null = prompt('How many slides do you want?');

          if (value) {
            this.attributes.numSlides = parseInt(value);
          }
        }
        this.handleCarouselInit(this.attributes.numSlides);
      },

      handleCarouselInit(numSlides: Number) {
        for (let i = 0; i < numSlides; i++) {
          this?.append({
            tagName: 'div',
            draggable: false,
            droppable: true,
            attributes: {
              id: `carousel-child-div-${i}`,
            },
            style: {
              ...carouselChildDefaultStyle,
              display: i === 0 ? 'block' : 'none',
            },
            content: `Drag & Drop the block to add to slide ${i}`,
          });
        }
      }
    },
  });
};
