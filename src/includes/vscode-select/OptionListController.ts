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
  private _selectedIndexes: Set<number> = new Set();
  private _multiSelect = false;
  private _numOfVisibleOptions = 0;

  constructor(host: ReactiveControllerHost) {
    (this._host = host).addController(this);
  }

  hostConnected(): void {}

  //#region getters/setters

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(index: number) {
    this._activeIndex = index;
    this._host.requestUpdate();
  }

  get relativeActiveIndex(): number {
    return this._options[this._activeIndex]?.filteredIndex ?? -1;
  }

  set comboboxMode(enabled: boolean) {
    this._combobox = enabled;
    this._host.requestUpdate();
  }

  get comboboxMode() {
    return this._combobox;
  }

  get multiSelect() {
    return this._multiSelect;
  }

  set multiSelect(multiSelect: boolean) {
    this._selectedIndex = -1;
    this._selectedIndexes.clear();
    this._multiSelect = multiSelect;
    this._host.requestUpdate();
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    if (this._selectedIndex !== -1) {
      this._options[this._selectedIndex].selected ??= false;
    }

    const op = this.getOptionByIndex(index);

    this._selectedIndex = op ? index : -1;
    this._host.requestUpdate();
  }

  get selectedIndexes() {
    return Array.from(this._selectedIndexes);
  }

  set selectedIndexes(value: number[]) {
    this._selectedIndexes.forEach((v) => {
      this._options[v].selected = false;
    });

    this._selectedIndexes = new Set(value);

    value.forEach((v) => {
      if (this._options[v] !== undefined) {
        this._options[v].selected = true;
      }
    });

    this._host.requestUpdate();
  }

  set value(newValue: string | string[]) {
    if (this._multiSelect) {
      const valueList = (newValue as string[])
        .map((v) => this._indexByValue.get(v))
        .filter((v) => v !== undefined);

      this._selectedIndexes = new Set(valueList);
    } else {
      this._selectedIndex = this._indexByValue.get(newValue as string) ?? -1;
    }
    this._host.requestUpdate();
  }

  get value(): string | string[] {
    if (this._multiSelect) {
      return this._selectedIndexes.size > 0
        ? Array.from(this._selectedIndexes).map((v) => this._options[v].value)
        : [];
    } else {
      return this._selectedIndex > -1
        ? this._options[this._selectedIndex].value
        : '';
    }
  }

  set multiSelectValue(newValue: string[]) {
    const valueList = (newValue as string[])
      .map((v) => this._indexByValue.get(v))
      .filter((v) => v !== undefined);

    this._selectedIndexes = new Set(valueList);
  }

  get multiSelectValue(): string[] {
    return this._selectedIndexes.size > 0
      ? Array.from(this._selectedIndexes).map((v) => this._options[v].value)
      : [];
  }

  get filterPattern() {
    return this._filterPattern;
  }

  set filterPattern(pattern: string) {
    if (pattern !== this._filterPattern) {
      this._filterPattern = pattern;
      this._updateState();
    }
  }

  get filterMethod(): FilterMethod {
    return this._filterMethod;
  }

  set filterMethod(method: FilterMethod) {
    if (method !== this._filterMethod) {
      this._filterMethod = method;
      this._updateState();
    }
  }

  get options(): InternalOption[] {
    return this._options;
  }

  get numOfVisibleOptions() {
    return this._numOfVisibleOptions;
  }

  get numOptions() {
    return this._options.length;
  }

  //#endregion

  //#region public functions

  populate(options: Option[]) {
    this._indexByValue.clear();
    this._indexByLabel.clear();

    this._options = options.map((op, index) => {
      this._indexByValue.set(op.value ?? '', index);
      this._indexByLabel.set(op.label ?? '', index);

      return {
        description: op.description ?? '',
        disabled: op.disabled ?? false,
        label: op.label ?? '',
        selected: op.selected ?? false,
        value: op.value ?? '',
        index,
        filteredIndex: index,
        ranges: [],
        visible: true,
      };
    });

    this._numOfVisibleOptions = this._options.length;
  }

  add(option: Option) {
    const nextIndex = this._options.length;
    const {description, disabled, label, selected, value} = option;
    let visible = true;
    let ranges: [number, number][] = [];

    if (this._combobox && this._filterPattern !== '') {
      const res = this._searchByPattern(label ?? '');
      visible = res.match;
      ranges = res.ranges;
    }

    this._indexByValue.set(value ?? '', nextIndex);
    this._indexByLabel.set(label ?? '', nextIndex);

    if (selected) {
      this._selectedIndex = nextIndex;
      this._selectedIndexes.add(nextIndex);
      this._activeIndex = nextIndex;
    }

    this._options.push({
      index: nextIndex,
      filteredIndex: nextIndex,
      description: description ?? '',
      disabled: disabled ?? false,
      label: label ?? '',
      selected: selected ?? false,
      value: value ?? '',
      visible,
      ranges,
    });

    if (visible) {
      this._numOfVisibleOptions += 1;
    }
  }

  clear() {
    this._options = [];
    this._indexByValue.clear();
    this._indexByLabel.clear();
    this._numOfVisibleOptions = 0;
  }

  getIsIndexSelected(index: number) {
    if (this._multiSelect) {
      return this._selectedIndexes.has(index);
    } else {
      return this._selectedIndex === index;
    }
  }

  expandMultiSelection(values: string[]) {
    values.forEach((v) => {
      const foundIndex = this._indexByValue.get(v) ?? -1;

      if (foundIndex !== -1) {
        this._selectedIndexes.add(foundIndex);
      }
    });

    this._host.requestUpdate();
  }

  toggleActiveMultiselectOption() {
    const activeOption = this._options[this._activeIndex] ?? null;
    const checked = this._selectedIndexes.has(activeOption.index);

    if (checked) {
      this._selectedIndexes.delete(activeOption.index);
    } else {
      this._selectedIndexes.add(activeOption.index);
    }

    this._host.requestUpdate();
  }

  toggleOptionSelected(optIndex: number) {
    const checked = this._selectedIndexes.has(optIndex);
    this._options[optIndex].selected = !this._options[optIndex].selected;

    if (checked) {
      this._selectedIndexes.delete(optIndex);
    } else {
      this._selectedIndexes.add(optIndex);
    }

    this._host.requestUpdate();
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

  findOptionIndex(value: string) {
    return this._indexByValue.get(value) ?? -1;
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

  next(fromIndex?: number): InternalOption | null {
    const from = fromIndex ?? this._activeIndex;
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
    if (this._multiSelect) {
      if (this._selectedIndexes.size > 0) {
        const indexes = this._selectedIndexes.values();
        const first = indexes.next();
        this._activeIndex = first.value ? first.value : 0;
      }
    } else {
      if (this._selectedIndex > -1) {
        this._activeIndex = this._selectedIndex;
      } else {
        this._activeIndex = 0;
      }
    }

    this._host.requestUpdate();
  }

  activatePrev() {
    const prevOp = this.getPrevSelectableOption();
    this._activeIndex = prevOp?.index ?? -1;
    this._host.requestUpdate();
    return prevOp;
  }

  //#endregion

  //#region private functions

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

  private _updateState() {
    if (!this._combobox || this._filterPattern === '') {
      this._options.forEach((_, i) => {
        this._options[i].visible = true;
        this._options[i].ranges = [];
      });
      this._numOfVisibleOptions = this._options.length;
    } else {
      let filteredListNextIndex = -1;
      this._numOfVisibleOptions = 0;

      this._options.forEach(({label}, i) => {
        const result = this._searchByPattern(label);
        this._options[i].visible = result.match;
        this._options[i].ranges = result.ranges;
        this._options[i].filteredIndex = result.match
          ? ++filteredListNextIndex
          : -1;

        if (result.match) {
          this._numOfVisibleOptions += 1;
        }
      });
    }

    this._host.requestUpdate();
  }

  //#endregion
}
