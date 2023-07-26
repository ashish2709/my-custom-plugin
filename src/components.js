export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  domc.addType('CUSTOM-COMPONENT', {
    model: {
      defaults: {
        // Default props
      },
    },
    view: {

    },
  });
};
