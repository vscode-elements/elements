import {LitElement} from 'lit';

export type VscComponentName = 'Badge' | 'Button' | 'Icon';

export class VscElement extends LitElement {
  static componentName: VscComponentName;

  static tagNameMap: Record<VscComponentName, string> = {
    Badge: '',
    Button: '',
  };

  static registerAs(tagName: string) {
    if (customElements.get(tagName)) {
      return;
    }

    if (this.componentName) {
      VscElement.tagNameMap[this.componentName] = tagName;
    }

    customElements.define(tagName, this);
  }
}
