export default (editor, opts = {}) => {
  const options = { ...{
    // Extend the filter type input, eg. `{ name: 'Filter type', defaults: 'blur', ... }`
    inputFilterType: {},

    // Extend the default filter strength input, eg. `{ name: 'Blur', defaults: 50, ... }`
    inputFilterStrength: {},

    // Customize the filter strength input when it should be updated. The option
    // is a function, which receive the current object type and returns a new one
    filterStrengthChange: type => type,
  },  ...opts };

  const { filterStrengthChange } = options;

  const sm = editor.StyleManager;
  const stack = sm.getType('stack');
  const propModel = stack.model;
  const filterType = {
    property: 'filter_type',
    name: 'Type',
    type: 'select',
    defaults: 'sepia',
    full: 1,
    list: [
      { value: 'blur'},
      { value: 'brightness'},
      { value: 'contrast'},
      { value: 'grayscale'},
      { value: 'hue-rotate'},
      { value: 'invert'},
      { value: 'opacity'},
      { value: 'saturate'},
      { value: 'sepia'},
    ],
    ...options.inputFilterType,
  };
  const filterStrength = {
    property: 'filter_strength',
    type: 'slider',
    name: 'Strength',
    functionName: 'blur',
    units: ['px'],
    defaults: 100,
    step: 1,
    max: 100,
    min:0,
    ...options.inputFilterStrength,
  };

  sm.addType('filter', {
    model: propModel.extend({
      defaults: () => ({
        ...propModel.prototype.defaults,
        layerSeparator: ' ',
        properties: [
          filterType,
          filterStrengthChange(filterStrength),
        ],
      }),

      init() {
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.listenTo(this.getLayers(), 'add', this.onNewLayerAdd);
      },

      /**
       * On new added layer we should listen to filter_type change
       * @param  {Layer} layer
       */
      onNewLayerAdd(layer) {
        const typeProp = layer.getPropertyAt(0);
        layer.listenTo(typeProp, 'change:value', this.handleTypeChange)
      },

      getLayersFromTarget(target) {
        const layers = [];
        const layerValues = target.getStyle()[this.get('property')];

        layerValues && layerValues.split(' ').forEach(layerValue => {
          const parserOpts = { complete: 1, numeric: 1 };
          const { value, unit, functionName } = this.parseValue(layerValue, parserOpts);
          layers.push({
            properties: [
              { ...filterType, value: functionName },
              { ...filterStrengthChange(filterStrength),
                ...this.getStrengthPropsByType(functionName), value, unit },
            ]
          })
        });

        return layers;
      },

      handleTypeChange(propType, functionName) {
        const strProps = this.getStrengthPropsByType(functionName);
        propType.collection.at(1).set(strProps);
      },

      getStrengthPropsByType(functionName) {
        let unit = '%';
        let units = ['%'];
        let max = 100;

        switch (functionName) {
          case 'blur':
            unit = 'px';
            units = ['px'];
            break;
          case 'hue-rotate':
            unit = 'deg';
            units = ['deg'];
            max = 360;
            break;
        }

        const result = {
            functionName,
            unit,
            units,
            max,
        };

        return filterStrengthChange(result);
      },

      /**
       * The value that will be set on target.
       * For the filter type we only need the
       * filter_strength result
       * @return {string}
       */
      getFullValue() {
        return this.getLayers()
          .map(layer => layer.getPropertyAt(1))
          .map(prop => prop ? prop.getFullValue() : '')
          .join(' ');
      },
    }),
    view: stack.view,
  })
};
