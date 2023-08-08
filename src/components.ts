
//@ts-nocheck
import type { Editor } from "grapesjs";
import { PluginOptions } from ".";

export const typeCustomTextInput = 'CUSTOM-TEXT-INPUT';
export const typeCustomImage = 'CUSTOM-IMAGE';
export const typeCustomCarousel = 'CUSTOM-CAROUSEL';
export const typeCustomButton = 'CUSTOM-BUTTON';
export const typeCarousel = 'CAROUSEL';
export const typeNote = 'NOTE';
export const typeTextAndImage = 'TEXT-AND-IMAGE';
export const typeNumberedList = 'NUMBERED-LIST';
export const typeQuiz = 'QUIZ';
export const typeRadio = 'RADIO-BUTTON';
export const typeScormButton = 'SCORM-BUTTON';

const carouselChildDefaultStyle = {
  width: '100%',
  height: '100%',
  flex: '1',
  border: '1px solid green',
};

const attachEventListenerToButtons = function (props: {
  numSlides: string
}) {

  const { numSlides } = props;

  let numberOfSlides: number = parseInt(numSlides);
  let currentSlideIndex = 1;

  const prevButton = document.getElementById('carousel-prev-btn');
  const nextButton = document.getElementById('carousel-next-btn');

  const handleCarouselButtonLogic = function (
    action: string,
    nextSlideIndex: Number,
    numSlides: Number,
  ) {

    const prevBtn = document.getElementById(`carousel-prev-btn`);
    const nextBtn = document.getElementById(`carousel-next-btn`);

    if (action === 'prev' && nextSlideIndex === 1) {
      prevBtn?.setAttribute("disabled", "true");
      nextBtn?.removeAttribute("disabled");
    } else if (action === 'next' && nextSlideIndex === numSlides) {
      prevBtn?.removeAttribute("disabled");
      nextBtn?.setAttribute("disabled", "true");
    }
  };

  const carouselSlideShowHideLogic = function (
    currentSlideIndex: number,
    nextSlideIndex: number,
  ) {

    const currentSlide = document.getElementById(`carousel-child-div-${currentSlideIndex}`);
    const nextSlide = document.getElementById(`carousel-child-div-${nextSlideIndex}`);

    if (currentSlide && nextSlide) {
      currentSlide.style.display = 'none';
      nextSlide.style.display = 'block';
    }
  }

  const handleButtonClick = function (props: {
    action: string,
    numberOfSlides: number,
    currentSlideIndex: number,
  }) {

    let { action, currentSlideIndex, numberOfSlides } = props;

    let nextSlideIndex = currentSlideIndex;

    if (action === 'next' && nextSlideIndex <= numberOfSlides) {
      nextSlideIndex = currentSlideIndex + 1;
      handleCarouselButtonLogic(action, nextSlideIndex, numberOfSlides);
      carouselSlideShowHideLogic(currentSlideIndex, nextSlideIndex);
      updateCurrentSlideIndex(nextSlideIndex);

    } else if (action === 'prev' && nextSlideIndex >= 0) {
      nextSlideIndex = currentSlideIndex - 1;
      handleCarouselButtonLogic(action, nextSlideIndex, numberOfSlides);
      carouselSlideShowHideLogic(currentSlideIndex, nextSlideIndex);
      updateCurrentSlideIndex(nextSlideIndex);
    }
  }

  const updateCurrentSlideIndex = (value: number) => currentSlideIndex = value;

  prevButton?.addEventListener("click", event => {
    const handlerProps = {
      action: 'prev',
      numberOfSlides,
      currentSlideIndex,
    }
    console.log('nextBtn', handlerProps)
    handleButtonClick(handlerProps);
  }, true);

  nextButton?.addEventListener("click", event => {
    const handlerProps = {
      action: 'next',
      numberOfSlides,
      currentSlideIndex,
    }
    console.log('nextBtn', handlerProps)
    handleButtonClick(handlerProps);
  }, true);
};

const handleRadioButton = function (props: {
  option_value: string
}) {
  console.log('script: radio ', props.option_value);

  document.querySelectorAll('.radio-button').forEach(item => {
    console.log(item)
  })
};

const scormButtonClickHandler = function(this: any) {
  // const button = document.getElementById('scorm-button');
  this.addEventListener("click", function(event: any) {
    console.log('hello')
    
    ScormProcessSetValue("cmi.completion_status", "completed");
    
    ScormProcessSetValue("cmi.score.raw", 18);
    ScormProcessSetValue("cmi.score.min", "0");
    ScormProcessSetValue("cmi.score.max", "100");
    ScormProcessSetValue("cmi.score.scaled", 0.18);
    ScormProcessTerminate();
    // cmi.completion_status("completed");
    // cmi.exit();
  });
};

export default (editor: Editor, opts?: Required<PluginOptions>) => {

  const {
    Components,
  } = editor;

  Components.addType(typeCustomTextInput, {
    isComponent: el => el.tagName === "DIV",

    extend: 'text',
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: false,
        stylable: true,
        editable: true,
        resizable: true,
        type: 'text',
        content: 'Insert Text here',
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
          alt: '',
        },
      },
    },

    view: {
      onRender({ el, model }) {
        model.listenTo(model, 'change:alt', () => {
          const attributes = model.getAttributes();
          const changedValue = model.getTrait('alt').changed.value;
          model.setAttributes({
            ...attributes,
            alt: changedValue,
          })
        });
      },
    },
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
  });

  Components.addType(typeCarousel, {
    isComponent: el => el.tagName === 'DIV',

    model: {
      defaults: {
        tagName: 'div',
        script: attachEventListenerToButtons,
        draggable: true,
        droppable: true,
        resizable: true,
        numSlides: 0,
        attributes: {
          id: 'carousel-div',
        },
        style: {
          width: '400px',
          height: 'auto',
          border: '1px solid black',
          display: 'flex',
          padding: '1rem',
          gap: '1rem',
          position: 'relative',
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
        ],

        traits: [
          {
            type: "number",
            name: "numSlides",
            changeProp: true,
            placeholder: "Number of slides",
          }
        ],

        "script-props": ["numSlides"],
      },
    },

    view: {
      init() {
        this.listenTo(this.model, 'change:numSlides', this.updateSlideCount);
      },

      updateSlideCount() {
        const numSlides = parseInt(this.model.get('numSlides'));
        this.model.append({
          tagName: 'div',
          draggable: false,
          droppable: true,
          attributes: {
            id: `carousel-child-div-${numSlides}`,
          },
          style: {
            ...carouselChildDefaultStyle,
            display: numSlides === 1 ? 'block' : 'none',
          },
          content: `Drag & Drop the block to add to slide ${numSlides}`,
        });
      }
    },
  });

  Components.addType(typeNote, {
    isComponent: el => el.tagName === "DIV",

    extend: 'text',
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        dropppable: true,
        resizable: true,
        editable: false,
        type: 'text',
        attributes: {
          class: 'note-container',
        },
      },
    },
    view: {
      onRender({ el, model }) {
        const allComponentsById = model.__getAllById();
        let isIconAndTextPresent = false;
        let addTextComponent = false;

        Object.keys(allComponentsById).forEach(key => {
          if (key === "note-icon" || key === "note-text") {
            isIconAndTextPresent = true;
          }
        });

        if (allComponentsById['note-text'] && !allComponentsById['note-text'].attributes.content) {
          addTextComponent = true;
        } else {
          addTextComponent = false;
        }

        if (!isIconAndTextPresent) {
          model.append({
            tagName: 'icon',
            draggable: false,
            droppable: false,
            type: 'icon',
            editable: false,
            attributes: {
              id: 'note-icon',
            },
            content:
              '<svg class="note-info-icon" viewBox="0 0 24 24" width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M12 17V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C"></circle> </g></svg>',
          });

          model.append({
            tagName: 'div',
            draggable: false,
            droppable: false,
            editable: true,
            type: 'text',
            attributes: {
              id: 'note-text',
            },
            content: 'Enter text here...',
          });
        }

        if (addTextComponent) {
          model.append({
            tagName: 'div',
            draggable: false,
            droppable: false,
            editable: true,
            type: 'text',
            attributes: {
              id: 'note-text',
            },
            content: 'Enter text here...',
          });
        }
      }
    }
  });

  Components.addType(typeTextAndImage, {

    isComponent: el => el.tagName === "DIV",

    extend: 'default',
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        dropppable: true,
        resizable: true,
        type: 'default',
        attributes: {
          class: 'text-and-image-container',
        },
      },
    },

    view: {
      onRender({ el, model }) {
        model.setDragMode('')
      }
    }
  });

  Components.addType(typeNumberedList, {
    isComponent: el => el.tagName === "DIV",

    extend: 'default',
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: false,
        resizable: true,
        editable: false,
        listItems: '',
        contentArray: [],
        attributes: {
          class: 'numbered-list-container'
        },
        type: 'default',
        traits: [
          {
            label: 'Number of List Items',
            name: 'listItems',
            type: 'number',
            placeholder: 'Number of elements in list',
            min: 1,
          }
        ]
      }
    },

    view: {
      onRender({ el, model }) {
        model.on('change:attributes:listItems', () => {
          const itemCount: number = parseInt(model.getAttributes()['listItems']);

          model.append({
            tagName: 'div',
            draggable: false,
            droppable: false,
            editable: true,
            removable: false,
            type: 'default',
            attributes: {
              id: `list-${itemCount}`,
              class: 'each-list'
            },

            components: [
              {
                type: typeCustomTextInput,
                attributes: {
                  id: `each-list-${itemCount}`,
                  class: 'list-text'
                },
                content: 'Enter text here...',
              },
              {
                tagName: 'div',
                draggable: false,
                droppable: false,
                type: 'default',
                editable: false,
                attributes: {
                  id: `list-count-${itemCount}`,
                  class: 'list-count'
                },
                content: itemCount,
                removable: false,
              }
            ]
          });
        });
      }
    }
  });

  Components.addType(typeRadio, {
    isComponent: el => el.tagName === "INPUT",

    extend: 'input',
    model: {
      defaults: {
        tagName: 'input',
        draggable: false,
        droppable: false,
        removable: false,
        option_value: '',
        type: 'input',
        script: handleRadioButton,
        attributes: {
          class: 'radio-button',
          type: 'radio',
        },
        traits: [
          {
            label: 'Option Value',
            type: 'text',
            changeProp: true,
            name: 'option_value'
          },
        ],
        'script-props': ["option_value"]
      }
    }
  });

  Components.addType(typeQuiz, {
    isComponent: el => el.tagName === 'DIV',

    extend: 'default',
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: true,
        removable: true,
        correct_option: '',
        num_options: 2,
        resizable: true,
        type: 'default',
        attributes: {
          class: 'quiz-container'
        },
        traits: [
          {
            label: 'Correct Answer',
            name: 'correct_option',
            type: 'string',
            changeProp: true,
          },
          {
            label: 'Number of Options',
            name: 'num_options',
            type: 'number',
            min: 2,
            changeProp: true,
          }
        ],
      },
    },
    view: {
      init() {
        this.model.append({
          tagName: 'div',
          draggable: false,
          droppable: false,
          resizable: true,
          type: 'default',
          components: [
            {
              type: typeRadio,
              draggable: true,
              droppable: false,
              removable: false,
              attributes: {
                class: 'radio-btn',
              }
            },
            {
              type: typeCustomTextInput,
              droppable: false,
              draggable: true,
              removable: false,
              attributes: {
                class: 'radio-option-label',
              },
              content: 'Enter option label'
            }
          ]
        });

        this.model.append({
          tagName: 'div',
          draggable: false,
          droppable: false,
          resizable: true,
          type: 'default',
          components: [
            {
              type: typeRadio,
              draggable: true,
              droppable: false,
              removable: false,
              attributes: {
                class: 'radio-btn',
              }
            },
            {
              type: typeCustomTextInput,
              droppable: false,
              draggable: true,
              removable: false,
              attributes: {
                class: 'radio-option-label',
              },
              content: 'Enter option label',
            }
          ]
        });
      },

      onRender({ el, model }) {
        model.on('change:num_options', () => {
          const numOptions = model.attributes.num_options;
          const componentsLength = model.components().length;

          if (numOptions > componentsLength) {
            model.append({
              tagName: 'div',
              draggable: false,
              droppable: false,
              resizable: true,
              type: 'default',
              components: [
                {
                  type: typeRadio,
                  draggable: true,
                  droppable: false,
                  removable: false,
                  attributes: {
                    class: 'radio-btn',
                  }
                },
                {
                  type: typeCustomTextInput,
                  droppable: false,
                  draggable: true,
                  removable: false,
                  attributes: {
                    class: 'radio-option-label',
                  },
                  content: 'Enter option label',
                }
              ]
            });
          }else {
            const lastComponentModel = model.components().models[model.components().length-1];
            model.components().remove(lastComponentModel);
          }
        });
      },
    }
  });

  Components.addType(typeScormButton, {
    isComponent: el => el.tagName === 'BUTTON',

    extend: "button",
    model: {
      defaults: {
        tagName: 'button',
        script: scormButtonClickHandler,
        draggable: true,
        droppable: false,
        content: 'Set score 100',
        attributes: {
          type: 'button',
          id: 'scorm-button'
        },
      },
    },
  });
};
