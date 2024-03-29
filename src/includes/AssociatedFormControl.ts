export interface AssociatedFormControl {
  autofocus: boolean;
  disabled: boolean;
  name: string | undefined;
  type: string;
  value: string | string[];

  pattern?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;

  readonly form: HTMLFormElement | null;
  readonly validationMessage: string;
  readonly validity: ValidityState;
  readonly willValidate: boolean;

  checkValidity(): boolean;
  reportValidity(): boolean;

  formDisabledCallback?(disabled: boolean): void;
  formResetCallback(): void;
  formStateRestoreCallback(
    state: string | FormData | File,
    mode: 'restore' | 'autocomplete'
  ): void;
}
