import { Directive, WritableSignal } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[appNoDuplicates]',
})
export class NoDuplicatesDirective {
    constructor() {}
}

export function noDuplicatesValidator<T = any>(list: WritableSignal<T[]>): ValidatorFn {
    return (control: AbstractControl<T>): ValidationErrors | null => {
        const hasValue = list().includes(control.value);
        if (hasValue) {
            return { duplicate: { value: control.value } };
        }
        return null;
    };
}
