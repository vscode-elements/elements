import {LitElement} from 'lit';

export class VscElement extends LitElement {
  private _version = '1.7.1-pre.0';

  /** VSC Element version */
  get version() {
    return this._version;
  }
}
