import { decorate } from '@storybook/addon-actions';

export default decorate([
  args => {
    const {
      detail,
      type,
    } = args[0];

    return [{ '_constructor-name_': 'CustomEvent', detail, type }];
  }
]);
