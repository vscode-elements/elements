import {LitElement} from 'lit';

export class VscElement extends LitElement {
  private _version = '1.9.2-pre.1';

  /** VSC Element version */
  get version() {
    return this._version;
  }
}
