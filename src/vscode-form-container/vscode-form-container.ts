import {html, TemplateResult} from 'lit';
import {property, query, queryAssignedElements} from 'lit/decorators.js';
import {customElement, VscElement} from '../includes/VscElement.js';
import {VscodeCheckboxGroup} from '../vscode-checkbox-group/index.js';
import {VscodeFormGroup, FormGroupVariant} from '../vscode-form-group/index.js';
import {VscodeRadioGroup} from '../vscode-radio-group/index.js';
import styles from './vscode-form-container.styles.js';

enum FormGroupLayout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

type CheckboxOrRadioGroup = VscodeRadioGroup | VscodeCheckboxGroup;

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

  private _resizeObserver!: ResizeObserver | null;

  @query('.wrapper')
  private _wrapperElement!: Element;

  @queryAssignedElements({selector: 'vscode-form-group'})
  private _assignedFormGroups!: VscodeFormGroup[];

  private _responsive = false;

  private _firstUpdateComplete = false;

  private _currentFormGroupLayout!: FormGroupLayout;

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
