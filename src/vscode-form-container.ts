import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult,
  query,
  queryAssignedNodes,
} from 'lit-element';
import {VscodeCheckbox} from './vscode-checkbox';
import {VscodeCheckboxGroup} from './vscode-checkbox-group';
import {VscodeFormGroup} from './vscode-form-group';
import {VscodeRadio} from './vscode-radio';
import {VscodeRadioGroup} from './vscode-radio-group';

// type FormGroupLayout = 'horizontal' | 'vertical';

enum FormGroupLayout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

type FormButtonWidgetGroup = VscodeRadioGroup | VscodeCheckboxGroup;

@customElement('vscode-form-container')
export class VscodeFormContainer extends LitElement {
  @property({type: Boolean})
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

  @queryAssignedNodes()
  private _assignedNodes!: VscodeFormGroup[];

  private _responsive = true;

  private _firstUpdateComplete = false;

  private _currentFormGroupLayout!: FormGroupLayout;

  private _toggleCompactLayout(layout: FormGroupLayout) {
    console.log('layout:', layout);
    const groups = this._assignedNodes.filter(
      (el) => el.matches && el.matches('vscode-form-group')
    );

    groups.forEach((group) => {
      /* const label = group.querySelector('vscode-label');

      if (label) {
        console.log(label);
        label.sideAligned = layout === 'horizontal' ? 'end' : 'start';
      } */
      group.vertical = layout === FormGroupLayout.VERTICAL;

      const widgetGroups = group.querySelectorAll(
        'vscode-checkbox-group, vscode-radio-group'
      ) as NodeListOf<FormButtonWidgetGroup>;

      widgetGroups.forEach((widgetGroup) => {
        if (!widgetGroup.dataset.originalLayout) {
          widgetGroup.dataset.originalLayout = widgetGroup.hasAttribute('vertical')
            ? FormGroupLayout.VERTICAL
            : FormGroupLayout.HORIZONTAL;
        }

        const originalLayout = widgetGroup.dataset.originalLayout;

        if (
          layout === FormGroupLayout.HORIZONTAL &&
          originalLayout === FormGroupLayout.HORIZONTAL
        ) {
          widgetGroup.vertical = false;
        } else{
          widgetGroup.vertical = true;
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

  private _resizeObserverCallbackBound = this._resizeObserverCallback.bind(
    this
  );

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

  static styles = css``;

  firstUpdated(): void {
    this._firstUpdateComplete = true;

    if (this._responsive) {
      this._activateResponsiveLayout();
    }
  }

  render(): TemplateResult {
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
