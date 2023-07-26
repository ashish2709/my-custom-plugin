import type { Plugin } from 'grapesjs';
import loadBlocks from './blocks';

export type PluginOptions = {

  /**
   * Which blocks to add
   * @default ['CUSTOM-TEXT-BLOCK', 'CUSTOM-IMAGE-BLOCK']
   */
  blocks?: string[];

  /**
   * Src url of the image if image block is added
   */
  imageSrc?: string;

  /**
   * Custom default text if text block is added 
   */
  customDefaultText?: string;
};

const plugin: Plugin<PluginOptions> = (editor, opts = {}) => {

  const config: Required<PluginOptions> = {
    blocks: [
      'CUSTOM-TEXT-BLOCK',
      'CUSTOM-IMAGE-BLOCK'
    ],
    imageSrc: '',
    customDefaultText: '',
    ...opts,
  };

  loadBlocks(editor, config);
}

export default plugin;