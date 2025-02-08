import {html, TemplateResult} from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedElements,
} from 'lit/decorators.js';
import {VscElement} from '../includes/VscElement.js';
import {VscodeCheckbox} from '../vscode-checkbox/index.js';
import {VscodeCheckboxGroup} from '../vscode-checkbox-group/index.js';
import {VscodeFormGroup, FormGroupVariant} from '../vscode-form-group/index.js';
import {VscodeMultiSelect} from '../vscode-multi-select/index.js';
import {VscodeRadio} from '../vscode-radio/index.js';
import {VscodeRadioGroup} from '../vscode-radio-group/index.js';
import {VscodeSingleSelect} from '../vscode-single-select/index.js';
import styles from './vscode-form-container.styles.js';
import {VscodeTextarea, VscodeTextfield} from '../main.js';

enum FormGroupLayout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

type CheckboxOrRadioGroup = VscodeRadioGroup | VscodeCheckboxGroup;

type VscFormWidget =
  | VscodeSingleSelect
  | VscodeMultiSelect
  | VscodeCheckbox
  | VscodeRadio;

const isTextInput = (el: Element): el is VscodeTextarea | VscodeTextfield => {
  return ['vscode-textfield', 'vscode-textarea'].includes(
    el.tagName.toLocaleLowerCase()
  );
};

const isSingleSelect = (el: Element): el is VscodeSingleSelect => {
  return el.tagName.toLocaleLowerCase() === 'vscode-single-select';
};

const isMultiSelect = (el: Element): el is VscodeMultiSelect => {
  return el.tagName.toLocaleLowerCase() === 'vscode-multi-select';
};

const isCheckbox = (el: Element): el is VscodeCheckbox => {
  return el.tagName.toLocaleLowerCase() === 'vscode-checkbox';
};

const isRadio = (el: Element): el is VscodeRadio => {
  return el.tagName.toLocaleLowerCase() === 'vscode-radio';
};

/**
 * @tag vscode-form-container
 */
@customElement('vscode-form-container')
export class VscodeFormContainer extends VscElement {
  static override styles = styles;

  @property({type: Boolean, reflect: true})
  set responsive(isResponsive: boolean) {
    this._responsive = isResponsive;

    if (this._firstUpdateComplete) {
      if (isResponsive) {
        this._activateResponsiveLayout();
      } else {
        this._deactivateResizeObserver();
      }
    }
  }
  get responsive(): boolean {
    return this._responsive;
  }

  @property({type: Number})
  breakpoint = 490;

  /** @deprecated - Use the native `<form>` element instead. */
  @property({type: Object})
  get data(): {[key: string]: string | string[]} {
    return this._collectFormData();
  }

  private _resizeObserver!: ResizeObserver | null;

  @query('.wrapper')
  private _wrapperElement!: Element;

  @queryAssignedElements({selector: 'vscode-form-group'})
  private _assignedFormGroups!: VscodeFormGroup[];

  private _responsive = false;

  private _firstUpdateComplete = false;

  private _currentFormGroupLayout!: FormGroupLayout;

  private _collectFormData() {
    const query = [
      'vscode-textfield',
      'vscode-textarea',
      'vscode-single-select',
      'vscode-multi-select',
      'vscode-checkbox',
      'vscode-radio',
    ].join(',');
    const vscFormWidgets = this.querySelectorAll(
      query
    ) as NodeListOf<VscFormWidget>;
    const data: {[key: string]: string | string[]} = {};

    vscFormWidgets.forEach((widget) => {
      if (!widget.hasAttribute('name')) {
        return;
      }

      const name = widget.getAttribute('name') as string;

      if (!name) {
        return;
      }

      if (isCheckbox(widget) && widget.checked) {
        data[name] = Array.isArray(data[name])
          ? [...data[name], widget.value as string]
          : [widget.value as string];
      } else if (isMultiSelect(widget)) {
        data[name] = widget.value;
      } else if (isCheckbox(widget) && !widget.checked) {
        data[name] = Array.isArray(data[name]) ? data[name] : [];
      } else if (
        (isRadio(widget) && widget.checked) ||
        isTextInput(widget) ||
        isSingleSelect(widget)
      ) {
        data[name] = widget.value;
      } else if (isRadio(widget) && !widget.checked) {
        data[name] = data[name] ? data[name] : '';
      }
    });

    return data;
  }

  private _toggleCompactLayout(layout: FormGroupLayout) {
    this._assignedFormGroups.forEach((group) => {
      if (!group.dataset.originalVariant) {
        group.dataset.originalVariant = group.variant;
      }

      const oVariant = group.dataset.originalVariant as FormGroupVariant;

      if (layout === FormGroupLayout.VERTICAL && oVariant === 'horizontal') {
        group.variant = 'vertical';
      } else {
        group.variant = oVariant;
      }

      const checkboxOrRadioGroup = group.querySelectorAll(
        'vscode-checkbox-group, vscode-radio-group'
      ) as NodeListOf<CheckboxOrRadioGroup>;

      checkboxOrRadioGroup.forEach((widgetGroup) => {
        if (!widgetGroup.dataset.originalVariant) {
          widgetGroup.dataset.originalVariant = widgetGroup.variant;
        }

        const originalVariant = widgetGroup.dataset.originalVariant;

        if (
          layout === FormGroupLayout.HORIZONTAL &&
          originalVariant === FormGroupLayout.HORIZONTAL
        ) {
          widgetGroup.variant = 'horizontal';
        } else {
          widgetGroup.variant = 'vertical';
        }
      });
    });
  }

  private _resizeObserverCallback(entries: ResizeObserverEntry[]) {
    let wrapperWidth = 0;

    for (const entry of entries) {
      wrapperWidth = entry.contentRect.width;
    }

    const nextLayout: FormGroupLayout =
      wrapperWidth < this.breakpoint
        ? FormGroupLayout.VERTICAL
        : FormGroupLayout.HORIZONTAL;

    if (nextLayout !== this._currentFormGroupLayout) {
      this._toggleCompactLayout(nextLayout);
      this._currentFormGroupLayout = nextLayout;
    }
  }

  private _resizeObserverCallbackBound =
    this._resizeObserverCallback.bind(this);

  private _activateResponsiveLayout() {
    this._resizeObserver = new ResizeObserver(
      this._resizeObserverCallbackBound
    );
    this._resizeObserver.observe(this._wrapperElement);
  }

  private _deactivateResizeObserver() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  override firstUpdated(): void {
    this._firstUpdateComplete = true;

    if (this._responsive) {
      this._activateResponsiveLayout();
    }
  }

  override render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-form-container': VscodeFormContainer;
  }
}
