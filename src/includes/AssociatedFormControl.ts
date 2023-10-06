export interface AssociatedFormControl {
  checkValidity(): boolean;
  /** The assigned form */
  form: HTMLFormElement | null;
  reportValidity(): boolean;
  readonly validationMessage: string;
  readonly validity: ValidityState;
  value: string | string[];
  readonly willValidate: boolean;
}
