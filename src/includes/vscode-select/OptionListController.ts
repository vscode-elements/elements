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
  private _activeIndex = -1;
  private _host: ReactiveControllerHost;
  private _options: InternalOption[] = [];
  private _filterPattern = '';
  private _filterMethod: FilterMethod = 'fuzzy';
  private _combobox = false;
  private _indexByValue: Map<string, number> = new Map();
  private _indexByLabel: Map<string, number> = new Map();
  private _selectedIndex = -1;
  private _selectedIndexes: number[] = [];
  private _multiSelect = false;

  constructor(host: ReactiveControllerHost) {
    (this._host = host).addController(this);
  }

  hostConnected(): void {}

  set activeIndex(index: number) {
    this._activeIndex = index;
    this._host.requestUpdate();
  }

  get activeIndex(): number {
    return this._activeIndex;
  }

  get relativeActiveIndex(): number {
    const activeOption = this._options[this._activeIndex];
    return activeOption.relativeIndex;
  }

  get comboboxMode() {
    return this._combobox;
  }

  set multiSelect(multiSelect: boolean) {
    this._selectedIndex = -1;
    this._selectedIndexes = [];
    this._multiSelect = multiSelect;
    this._host.requestUpdate();
  }

  get multiSelect() {
    return this._multiSelect;
  }

  set selectedIndex(value: number) {
    this._selectedIndex = value;
    this._host.requestUpdate();
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  set selectedIndexes(value: number[]) {
    this._selectedIndexes = value;
    this._host.requestUpdate();
  }

  get value(): string | string[] {
    if (this._multiSelect) {
      return this._selectedIndexes.length > 0
        ? this._selectedIndexes.map((v) => this._options[v].value)
        : [];
    } else {
      return this._selectedIndex > -1
        ? this._options[this._selectedIndex].value
        : '';
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
    this._host.requestUpdate();
  }

  set filterPattern(pattern: string) {
    this._filterPattern = pattern;
    this._updateState();
  }

  get filterPattern() {
    return this._filterPattern;
  }

  set filterMethod(method: FilterMethod) {
    this._filterMethod = method;
    this._updateState();
  }

  get filterMethod(): FilterMethod {
    return this._filterMethod;
  }

  populate(options: Option[]) {
    this._indexByValue.clear();
    this._indexByLabel.clear();

    this._options = options.map((op, index) => {
      this._indexByValue.set(op.value, index);
      this._indexByLabel.set(op.label, index);

      return {
        description: op.description ?? '',
        disabled: op.disabled ?? false,
        label: op.label ?? '',
        selected: op.selected ?? false,
        value: op.value ?? '',
        index,
        relativeIndex: index,
        absoluteIndex: index,
        ranges: [],
        visible: true,
      };
    });
  }

  add(option: Option) {
    const nextIndex = this._options.length;
    const {description, disabled, label, selected, value} = option;
    let visible = true;
    let ranges: [number, number][] = [];

    if (this._combobox) {
      const res = this._searchByPattern(label);
      visible = res.match;
      ranges = res.ranges;
    }

    this._indexByValue.set(value, nextIndex);
    this._indexByLabel.set(label, nextIndex);

    if (selected) {
      this._selectedIndex = nextIndex;
    }

    this._options.push({
      index: nextIndex,
      relativeIndex: nextIndex,
      description,
      disabled,
      label,
      selected,
      value,
      visible,
      ranges,
    });
  }

  clear() {
    this._options = [];
  }

  get options(): InternalOption[] {
    return this._options;
  }

  get numOfVisibleOptions() {
    return this._options.filter((o) => o.visible).length;
  }

  get numOptions() {
    return this._options.length;
  }

  toggleComboboxMode(enabled: boolean) {
    this._combobox = enabled;
    this._host.requestUpdate();
  }

  toggleActiveMultiselectOption() {
    const activeOption = this._options[this._activeIndex] ?? null;
    const checked = this._selectedIndexes.includes(activeOption.index);

    if (checked) {
      this._selectedIndexes = this._selectedIndexes.filter(
        (i) => i !== activeOption.index
      );
    } else {
      this._selectedIndexes.push(activeOption.index);
      this._selectedIndexes.sort();
    }
  }

  getActiveOption(): InternalOption | null {
    return this._options[this._activeIndex] ?? null;
  }

  getSelectedOption(): InternalOption | null {
    return this._options[this._selectedIndex] ?? null;
  }

  getOptionByIndex(index: number) {
    return this._options[index] ?? null;
  }

  getOptionByValue(
    value: string,
    includeHiddenOptions = false
  ): InternalOption | null {
    const index = this._indexByValue.get(value) ?? -1;

    if (index === -1) {
      return null;
    }

    if (!includeHiddenOptions) {
      return this._options[index].visible ? this._options[index] : null;
    }

    return this._options[index];
  }

  getOptionByLabel(label: string) {
    const index = this._indexByLabel.get(label) ?? -1;

    if (index === -1) {
      return null;
    }

    return this._options[index];
  }

  getNextSelectableOption(fromIndex?: number): InternalOption | null {
    const from = fromIndex ?? this._activeIndex;

    if (this._options.length === 0) {
      return null;
    }

    if (this._options.length === 1) {
      return this._options[0];
    }

    if (from !== -1 && !this._options[from + 1]) {
      return this._options[from];
    }

    let nextIndex = -1;

    for (let i = from + 1; i < this._options.length; i++) {
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

  getPrevSelectableOption(fromIndex?: number): InternalOption | null {
    const from = fromIndex ?? this._activeIndex;

    if (this._options.length === 0) {
      return null;
    }

    if (this._options.length === 1) {
      return this._options[0];
    }

    if (!this._options[from] || !this._options[from - 1]) {
      return this._options[0];
    }

    let prevIndex = -1;

    for (let i = from - 1; i >= 0; i--) {
      if (
        this._options[i] &&
        !this._options[i].disabled &&
        this._options[i].visible
      ) {
        prevIndex = i;
        break;
      }
    }

    return prevIndex > -1 ? this._options[prevIndex] : null;
  }

  activateDefault() {
    if (this._selectedIndexes.length > 0) {
      this._activeIndex = this._selectedIndexes[0];
    } else {
      const nextOp = this.getNextSelectableOption(-1);
      this._activeIndex = nextOp?.index ?? -1;
    }

    this._host.requestUpdate();
  }

  activateNext() {
    const nextOp = this.getNextSelectableOption();
    this._activeIndex = nextOp?.index ?? -1;
    this._host.requestUpdate();
    return nextOp;
  }

  activatePrev() {
    const prevOp = this.getPrevSelectableOption();
    this._activeIndex = prevOp?.index ?? -1;
    this._host.requestUpdate();
    return prevOp;
  }

  private _searchByPattern(text: string) {
    let result: SearchResult;

    switch (this._filterMethod) {
      case 'startsWithPerTerm':
        result = startsWithPerTermSearch(text, this._filterPattern);
        break;
      case 'startsWith':
        result = startsWithSearch(text, this._filterPattern);
        break;
      case 'contains':
        result = containsSearch(text, this._filterPattern);
        break;
      default:
        result = fuzzySearch(text, this._filterPattern);
    }

    return result;
  }

  _updateState() {
    if (!this._combobox || this._filterPattern === '') {
      this._options.forEach((_, i) => {
        this._options[i].visible = true;
      });

      this._host.requestUpdate();
      return;
    }

    let filteredListNextIndex = -1;

    this._options.forEach(({label}, i) => {
      const result = this._searchByPattern(label);
      this._options[i].visible = result.match;
      this._options[i].ranges = result.ranges;
      this._options[i].relativeIndex = result.match
        ? ++filteredListNextIndex
        : -1;
    });

    this._host.requestUpdate();
  }
}
