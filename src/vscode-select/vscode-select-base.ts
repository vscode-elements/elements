import {
  LitElement,
  html,
  property,
  TemplateResult,
  internalProperty,
  queryAssignedNodes,
  query,
} from 'lit-element';
import {VscodeSelectOption} from './vscode-select-option';
import dropdownStyles from './vscode-select-base.styles';

interface Option {
  label: string;
  value: string;
  description: string;
  selected: boolean;
}

interface OptionListStat {
  selectedIndexes: number[];
  values: string[];
}

export class VscodeSelectBase extends LitElement {
  @property({type: String, reflect: true, attribute: 'aria-expanded'})
  ariaExpanded = 'false';

  @property({type: Boolean})
  combobox = false;

  @property({type: Boolean, reflect: true, attribute: 'data-cloak'})
  dataCloak = false;

  @property({type: Number, attribute: true, reflect: true})
  tabindex = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.dataCloak = false;
    this.addEventListener('keydown', this._onComponentKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onComponentKeyDown);
  }

  @internalProperty()
  protected _activeIndex = -1;

  @internalProperty()
  protected _currentDescription = '';

  @internalProperty()
  protected _selectedIndex = -1;

  @internalProperty()
  protected _showDropdown = false;

  @internalProperty()
  protected _options: Option[] = [];

  @internalProperty()
  protected _value: string | string[] = '';

  @query('.main-slot')
  protected _mainSlot!: HTMLSlotElement;

  protected _multiple = false;

  protected _addOptionsFromSlottedElements(): OptionListStat {
    const options: Option[] = [];
    const nodes = this._mainSlot.assignedNodes();
    const optionsListStat: OptionListStat = {
      selectedIndexes: [],
      values: [],
    };

    nodes.forEach((el: Node) => {
      if (
        !(
          el.nodeType === Node.ELEMENT_NODE &&
          (el as Element).matches('vscode-select-option')
        )
      ) {
        return;
      }

      const {
        innerText,
        value: elValue,
        description,
        selected,
      } = el as VscodeSelectOption;

      const value = (el as VscodeSelectOption).hasAttribute('value')
        ? elValue
        : innerText;

      const op: Option = {
        label: innerText,
        value,
        description,
        selected,
      };

      options.push(op);

      if (selected) {
        optionsListStat.selectedIndexes.push(options.length - 1);
        optionsListStat.values.push(value);
      }
    });

    this._options = options;

    return optionsListStat;
  }

  protected _toggleDropdown(visible: boolean): void {
    this._showDropdown = visible;
    this.ariaExpanded = String(visible);
  }

  protected _dispatchChangeEvent(): void {
    if (!this._multiple) {
      this.dispatchEvent(
        new CustomEvent('vsc-change', {
          detail: {
            selectedIndex: this._selectedIndex,
            value: this._value,
          },
        })
      );
    }
  }

  protected _onFaceClick(): void {
    this._toggleDropdown(!this._showDropdown);
  }

  private _onComponentKeyDown(event: KeyboardEvent) {
    if (
      event.key === ' ' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      this._toggleDropdown(!this._showDropdown);
    }

    if (event.key === ' ') {
      this._showDropdown = true;
    }

    if (event.key === 'Escape' || event.key == 'Tab') {
      this._showDropdown = false;
    }

    if (event.key === 'ArrowUp' && this._selectedIndex > 0) {
      this._options[this._selectedIndex].selected = false;
      this._selectedIndex -= 1;
      this._activeIndex = this._selectedIndex;
      this._options[this._selectedIndex].selected = true;
      this._dispatchChangeEvent();
    }

    if (
      event.key === 'ArrowDown' &&
      this._selectedIndex < this._options.length - 1
    ) {
      if (this._selectedIndex === -1) {
        this._selectedIndex = 0;
      } else {
        this._options[this._selectedIndex].selected = false;
        this._selectedIndex += 1;
      }

      this._activeIndex = this._selectedIndex;
      this._options[this._selectedIndex].selected = true;
      this._dispatchChangeEvent();
    }
  }

  static styles = dropdownStyles;
}
