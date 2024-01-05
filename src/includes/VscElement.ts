import {LitElement} from 'lit';

export class VscElement extends LitElement {
  private _version = '1.0.1';

  /** VSC Element version */
  get version() {
    return this._version;
  }
}
