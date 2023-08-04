import type { Plugin } from 'grapesjs';
import loadBlocks from './blocks';
import loadComponents from './components';

export type PluginOptions = {

  /**
   * Which blocks to add
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
      'CUSTOM-TEXT-INPUT',
      'CUSTOM-IMAGE',
      'CUSTOM-BUTTON',
      'CAROUSEL',
      'NOTE',
      'TEXT-AND-IMAGE',
      'NUMBERED-LIST',
    ],
    imageSrc: '',
    customDefaultText: '',
    ...opts,
  };

  loadComponents(editor);
  loadBlocks(editor, config);
}

export default plugin;