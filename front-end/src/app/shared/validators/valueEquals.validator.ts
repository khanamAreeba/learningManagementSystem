import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function valueEquals(
  controlName: string,
  matchingControlName: string
): ValidatorFn {

  return (form: AbstractControl): ValidationErrors | null => {

    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);

    if (!control || !matchingControl) return null;

    if (control.value !== matchingControl.value) {
      return { valueMismatch: true };
    }

    return null;
  };
}