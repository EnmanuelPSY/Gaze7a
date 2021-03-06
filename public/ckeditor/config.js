/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.height = 600;
	config.language = 'es';
  config.youtube_related = false;
  config.youtube_width = '100%';
  config.youtube_height = '480';
  config.startupOutlineBlocks = true;
  config.extraPlugins = 'image';
};
