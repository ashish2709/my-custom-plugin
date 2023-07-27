import type { Plugin } from 'grapesjs';
import loadBlocks from './blocks';
import loadComponents from './components';

export type PluginOptions = {

  /**
   * Which blocks to add
   * @default ['CUSTOM-TEXT-INPUT', 'CUSTOM-IMAGE']
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
      'CUSTOM-IMAGE'
    ],
    imageSrc: '',
    customDefaultText: '',
    ...opts,
  };

  loadComponents(editor, config);
  loadBlocks(editor, config);
}

export default plugin;