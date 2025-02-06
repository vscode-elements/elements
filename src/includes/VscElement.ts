import {LitElement} from 'lit';

export class VscElement extends LitElement {
  private _version = '1.12.0';

  /** VSCode Elements version */
  get version(): string {
    return this._version;
  }
}
