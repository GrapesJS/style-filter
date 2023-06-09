import type { Plugin } from 'grapesjs';

export interface PluginOptions {};

const plugin: Plugin<PluginOptions> = (editor) => {

  editor.Styles.addBuiltIn('filter', {
    type: 'stack',
    // @ts-ignore
    layerSeparator: ' ',
    fromStyle(style: any, { property, name }: any) {
      const filter = style[name] || '';
      const sep = property.getLayerSeparator();
      return filter ? filter.split(sep).map((input: string) => {
        const { name, value } = property.__parseFn(input);
        return { name, value };
      }) : [];
    },
    toStyle(values: any, { name }: any) {
      return { [name]: `${values.name}(${values.value})` };
    },
    properties: [
      {
        property: 'name',
        name: 'Type',
        type: 'select',
        default: 'sepia',
        full: true,
        options: [
          { id: 'blur', propValue: { min: 0, units: ['px', 'em', 'rem', 'vw', 'vh'] } },
          { id: 'brightness', propValue: { min: 0, units: ['%'] } },
          { id: 'contrast', propValue: { min: 0, units: ['%'] } },
          { id: 'grayscale', propValue: { min: 0, max: 100, units: ['%'] } },
          { id: 'hue-rotate', propValue: { min: 0, max: 360, units: ['deg', 'rad', 'grad'] } },
          { id: 'invert', propValue: { min: 0, max: 100, units: ['%'] } },
          { id: 'saturate', propValue: { min: 0, units: ['%'] } },
          { id: 'sepia', propValue: { min: 0, max: 100, units: ['%'] } },
        ],
        onChange({ property, to }: any) {
          if (to.value) {
            const option = property.getOption();
            const props = { ...(option.propValue || {}) };
            const propToUp = property.getParent().getProperty('value');
            const unit = propToUp.getUnit();
            if (!unit || props?.units.indexOf(unit) < 0) {
              props.unit = props?.units[0] || '';
            }
            propToUp.up(props);
          }
        }
      }, {
        property: 'value',
        type: 'slider',
        default: '0',
        full: true,
      },
    ]
  });

};

export default plugin;