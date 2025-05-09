import {ReactiveController, ReactiveControllerHost} from 'lit';
import {FilterMethod, InternalOption, Option} from './types';
import {
  containsSearch,
  fuzzySearch,
  SearchResult,
  startsWithPerTermSearch,
  startsWithSearch,
} from './helpers';

export class OptionListController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _options: InternalOption[] = [];
  private _filterPattern = '';
  private _filterMethod: FilterMethod = 'fuzzy';
  private _combobox = false;
  private _indexByValue: Map<string, number> = new Map();
  private _selectedIndex = -1;
  private _selectedIndexes: number[] = [];
  private _multiSelect = false;

  constructor(host: ReactiveControllerHost) {
    (this._host = host).addController(this);
  }

  hostConnected(): void {}

  set multiSelect(multiSelect: boolean) {
    this._multiSelect = multiSelect;
  }

  get multiSelect() {
    return this._multiSelect;
  }

  set selectedIndex(value: number) {
    this._selectedIndex = value;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  get value(): string | string[] {
    if (this._multiSelect) {
      return this._selectedIndexes.map((v) => this._options[v].value);
    } else {
      return this._options[this._selectedIndex].value;
    }
  }

  set value(newValue: string | string[]) {
    if (this._multiSelect) {
      this._selectedIndexes = (newValue as string[])
        .map((v) => this._indexByValue.get(v))
        .filter((v) => v !== undefined);
    } else {
      this._selectedIndex = this._indexByValue.get(newValue as string) ?? -1;
    }
  }

  set filterPattern(pattern: string) {
    this._filterPattern = pattern;
    this._updateState();
  }

  get filterPattern() {
    return this._filterPattern;
  }

  populate(options: Option[]) {
    this._indexByValue.clear();

    this._options = options.map((op, index) => {
      this._indexByValue.set(op.value, index);

      return {
        description: op.description ?? '',
        disabled: op.disabled ?? false,
        label: op.label ?? '',
        selected: op.selected ?? false,
        value: op.value ?? '',
        index,
        absoluteIndex: index,
        ranges: [],
        visible: true,
      };
    });
  }

  toggleComboboxMode(enabled: boolean) {
    this._combobox = enabled;
  }

  get options(): InternalOption[] {
    return this._options;
  }

  getOptionByValue(value: string): InternalOption | null {
    const index = this._indexByValue.get(value) ?? -1;

    if (index === -1) {
      return null;
    }

    return this._options[index];
  }

  getNextSelectableOption(fromIndex = 0): InternalOption | null {
    if (this._options.length === 0) {
      return null;
    }

    if (this._options.length === 1) {
      return this._options[0];
    }

    if (!this._options[fromIndex] || !this._options[fromIndex + 1]) {
      return this._options[this._options.length - 1];
    }

    let nextIndex = -1;

    for (let i = fromIndex + 1; i < this._options.length; i++) {
      if (
        this._options[i] &&
        !this._options[i].disabled &&
        this._options[i].visible
      ) {
        nextIndex = i;
        break;
      }
    }

    return nextIndex > -1 ? this._options[nextIndex] : null;
  }

  _updateState() {
    if (!this._combobox || this._filterPattern === '') {
      this._options.forEach((_, i) => {
        this._options[i].visible = true;
      });

      this._host.requestUpdate();
      return;
    }

    this._options.forEach((op, i) => {
      let result: SearchResult;

      switch (this._filterMethod) {
        case 'startsWithPerTerm':
          result = startsWithPerTermSearch(op.label, this._filterPattern);
          break;
        case 'startsWith':
          result = startsWithSearch(op.label, this._filterPattern);
          break;
        case 'contains':
          result = containsSearch(op.label, this._filterPattern);
          break;
        default:
          result = fuzzySearch(op.label, this._filterPattern);
      }

      this._options[i].visible = result.match;
      this._options[i].ranges = result.ranges;
    });

    this._host.requestUpdate();
  }
}
