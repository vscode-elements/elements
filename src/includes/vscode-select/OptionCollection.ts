import {filterOptionsByPattern} from './helpers';
import {InternalOption, Option, FilterMethod} from './types';

export class OptionCollection {
  private _activeIndex = 0;
  private _combobox = false;
  private _options: InternalOption[] = [];
  // cached filtered options
  private _filterMethod: FilterMethod = 'fuzzy';
  private _filteredOptions: InternalOption[] | null = null;
  private _filterPattern = '';

  private _filter() {
    this._options.forEach((op, i) => {

    });
  }

  toggleComboboxMode(enabled: boolean) {
    this._filteredOptions = null;
    this._combobox = enabled;
  }

  populate(options: Option[]) {
    this._filteredOptions = null;

    this._options = options.map((op, index) => ({
      description: op.description ?? '',
      disabled: op.disabled ?? false,
      label: op.label ?? '',
      selected: op.selected ?? false,
      value: op.value ?? '',
      index,
      absoluteIndex: index,
      ranges: [],
      // TODO: hidden
    }));
  }

  getConfiguration(): Option[] {
    return this._options.map(
      ({description, disabled, label, selected, value, absoluteIndex}) => ({
        description,
        disabled,
        label,
        selected,
        value,
        index: absoluteIndex,
      })
    );
  }

  setFilterPattern(filterPattern: string) {
    this._filteredOptions = null;
    this._filterPattern = filterPattern;
  }

  setFilterMethod(method: FilterMethod) {
    this._filteredOptions = null;
    this._filterMethod = method;
  }

  getOptions(): InternalOption[] {
    return this._options;
  }

  getVisibleOptions(): InternalOption[] {
    if (!this._combobox || this._filterPattern === '') {
      return this._options;
    }

    if (!this._filteredOptions) {
      this._filteredOptions = filterOptionsByPattern(
        this._options,
        this._filterPattern,
        this._filterMethod
      );
    }

    return this._filteredOptions;
  }

  /**
   * Sets the index of the active (highlighted) option.
   *
   * @param index Index of the active option in the unfiltered option list.
   */
  setActiveIndex(index: number) {
    this._activeIndex = index;
  }

  /**
   * @returns Index of the active option in the unfiltered option list.
   */
  getActiveIndex(): number {
    return this._activeIndex;
  }

  /**
   * Get next selectable option from the list of visible options.
   * @see getVisibleOptions()
   * @param fromIndex
   */
  getNextSelectableOption(fromIndex = 0): InternalOption | null {
    let nextIndex = 0;
    const options = this.getVisibleOptions();

    if (!options[fromIndex]) {
      return null;
    }

    if (!options[fromIndex + 1]) {
      return options[fromIndex];
    }

    for (let i = fromIndex + 1; i < options.length; i++) {
      if (!options[i].disabled) {
        nextIndex = i;
        break;
      }
    }

    return options[nextIndex];
  }
}
