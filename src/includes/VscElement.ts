import {LitElement} from 'lit';

export class VscElement extends LitElement {
  private _version = '2.0.0-pre.1';

  /** VSCode Elements version */
  get version(): string {
    return this._version;
  }
}
