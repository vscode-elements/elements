import {LitElement} from 'lit';

export class VscElement extends LitElement {
  private _version = '1.13.2-pre.0';

  /** VSCode Elements version */
  get version(): string {
    return this._version;
  }
}
