import type { Editor, BlockProperties } from 'grapesjs';
import { PluginOptions } from '.';
import {
  typeCarousel,
  typeCustomButton,
  typeCustomImage,
  typeCustomTextInput
} from './components';

export default function (editor: Editor, opts: Required<PluginOptions>) {

  const bm = editor.BlockManager;

  const addBlock = (id: string, def: BlockProperties) => {
    opts.blocks?.indexOf(id)! >= 0 && bm.add(id, { ...def });
  };

  addBlock(typeCustomTextInput, {
    label: 'Custom Text Block',
    media: '<svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V21M9 21H15M19 6V3H5V6" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    content: { type: typeCustomTextInput },
    activate: true,
    select: true,
    category: 'Basic',
    ...opts
  });

  addBlock(typeCustomImage, {
    label: 'Custom Image Block',
    media: '<svg fill="#000000" width="48px" height="48px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>image</title><path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"></path></svg>',
    content: { type: typeCustomImage, },
    activate: true,
    select: true,
    category: 'Basic',
  });

  addBlock(typeCustomButton, {
    label: 'Custom Button',
    media: '<svg width="48px" height="48px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="20" height="20"/><g><path d="M17 5H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm1 7c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v5z"/></g></svg>',
    content: { type: typeCustomButton },
    activate: true,
    select: true,
    category: 'Basic',
  });
  
  addBlock(typeCarousel, {
    label: 'Carousel',
    media: '<svg fill="#000000" width="48px" height="48px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>carousel--horizontal</title><path d="M22,26H10a2,2,0,0,1-2-2V8a2,2,0,0,1,2-2H22a2,2,0,0,1,2,2V24A2,2,0,0,1,22,26ZM10,8V24H22V8Z"/><path d="M4,24H0V22H4V10H0V8H4a2,2,0,0,1,2,2V22A2,2,0,0,1,4,24Z"/><path d="M32,24H28a2,2,0,0,1-2-2V10a2,2,0,0,1,2-2h4v2H28V22h4Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>',
    content: { type: typeCarousel },
    activate: true,
    select: true,
    category: 'Basic',
  });
};
