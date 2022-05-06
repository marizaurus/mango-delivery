import instance from './instance';

import editorModule from './editor';

export default {
  editor: editorModule(instance),
};