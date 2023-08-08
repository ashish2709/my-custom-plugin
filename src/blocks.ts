import type { Editor, BlockProperties } from 'grapesjs';
import { PluginOptions } from '.';
import {
  typeCarousel,
  typeCustomButton,
  typeCustomImage,
  typeCustomTextInput,
  typeNote,
  typeNumberedList,
  typeTextAndImage,
  typeQuiz,
  typeScormButton,
} from './components';

export default function (editor: Editor, opts: Required<PluginOptions>) {

  const bm = editor.BlockManager;

  const addBlock = (id: string, def: BlockProperties) => {
    opts.blocks?.indexOf(id)! >= 0 && bm.add(id, { ...def });
  };

  const commonBlockOptions = {
    activate: true,
    select: true,
    category: 'Basic',
  }

  addBlock(typeCustomTextInput, {
    label: 'Custom Text Block',
    media: '<svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V21M9 21H15M19 6V3H5V6" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    content: { type: typeCustomTextInput },
    ...commonBlockOptions,
  });

  addBlock(typeCustomImage, {
    label: 'Custom Image Block',
    media: '<svg fill="#000000" width="48px" height="48px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>image</title><path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"></path></svg>',
    content: { type: typeCustomImage, },
    ...commonBlockOptions,
  });

  addBlock(typeCustomButton, {
    label: 'Custom Button',
    media: '<svg width="48px" height="48px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="20" height="20"/><g><path d="M17 5H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm1 7c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v5z"/></g></svg>',
    content: { type: typeCustomButton },
    ...commonBlockOptions,
  });

  addBlock(typeCarousel, {
    label: 'Carousel',
    media: '<svg fill="#000000" width="48px" height="48px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>carousel--horizontal</title><path d="M22,26H10a2,2,0,0,1-2-2V8a2,2,0,0,1,2-2H22a2,2,0,0,1,2,2V24A2,2,0,0,1,22,26ZM10,8V24H22V8Z"/><path d="M4,24H0V22H4V10H0V8H4a2,2,0,0,1,2,2V22A2,2,0,0,1,4,24Z"/><path d="M32,24H28a2,2,0,0,1-2-2V10a2,2,0,0,1,2-2h4v2H28V22h4Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>',
    content: { type: typeCarousel },
    ...commonBlockOptions,
  });

  addBlock(typeNote, {
    label: 'Note',
    media: '<svg viewBox="0 0 24 24" width="48px" height="48px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12H14M12 10V14M19.9592 15H16.6C16.0399 15 15.7599 15 15.546 15.109C15.3578 15.2049 15.2049 15.3578 15.109 15.546C15 15.7599 15 16.0399 15 16.6V19.9592M20 14.1031V7.2C20 6.07989 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H14.1031C14.5923 20 14.8369 20 15.067 19.9447C15.2711 19.8957 15.4662 19.8149 15.6451 19.7053C15.847 19.5816 16.0199 19.4086 16.3658 19.0627L19.0627 16.3658C19.4086 16.0199 19.5816 15.847 19.7053 15.6451C19.8149 15.4662 19.8957 15.2711 19.9447 15.067C20 14.8369 20 14.5923 20 14.1031Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
    content: { type: typeNote },
    ...commonBlockOptions,
  });

  addBlock(typeTextAndImage, {
    label: 'Text And Image',
    media: '<svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.00463 21L16 8L21.0023 12.1701M3.00463 21C3.00463 21 9.9675 21 12.0039 21C16.9176 21 20.9117 17.0622 21.0023 12.1701M3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12C21.0039 12.0568 21.0034 12.1135 21.0023 12.1701M11 13.0018L7.5 10L3.26826 14.1741" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
    content: {
      type: typeTextAndImage,
      components: [
        {
          type: typeCustomTextInput,
        },
        {
          type: typeCustomImage,
        }
      ]
    },
    ...commonBlockOptions,
  });

  addBlock(typeNumberedList, {
    label: 'Numbered List',
    media: '<svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
    content: {
      type: typeNumberedList,
    },
    ...commonBlockOptions,
  });

  addBlock(typeQuiz, {
    label: 'Quiz',
    media: '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 403.48 403.48" xml:space="preserve" width="48px" height="48px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M277.271,0H46.176v403.48h311.129V80.035L277.271,0z M281.664,25.607l50.033,50.034h-50.033V25.607z M61.176,388.48V15 h205.489v75.641h75.641v297.84H61.176z"></path> <path d="M101.439,117.58h55.18V62.4h-55.18V117.58z M116.439,77.4h25.18v25.18h-25.18V77.4z"></path> <path d="M101.439,192.08h55.18V136.9h-55.18V192.08z M116.439,151.9h25.18v25.18h-25.18V151.9z"></path> <path d="M101.439,266.581h55.18V211.4h-55.18V266.581z M116.439,226.4h25.18v25.181h-25.18V226.4z"></path> <path d="M101.439,341.081h55.18v-55.18h-55.18V341.081z M116.439,300.901h25.18v25.18h-25.18V300.901z"></path> <rect x="177.835" y="326.081" width="114.688" height="15"></rect> <rect x="177.835" y="251.581" width="114.688" height="15"></rect> <rect x="177.835" y="177.08" width="114.688" height="15"></rect> <rect x="177.835" y="102.58" width="114.688" height="15"></rect> </g> </g></svg>',
    content: {
      type: typeQuiz
    },
    ...commonBlockOptions,
  });
  
  addBlock(typeScormButton, {
    label: 'Scorm Button',
    media: '<svg width="48px" height="48px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="20" height="20"/><g><path d="M17 5H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm1 7c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v5z"/></g></svg>',
    content: { type: typeScormButton },
    ...commonBlockOptions,
  });
};
