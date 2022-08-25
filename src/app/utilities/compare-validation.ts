import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CompareValidation(control1 : string, control2 : string) : ValidatorFn {
    return function(group : AbstractControl) : ValidationErrors | null {
        
        const value1 = group.get(control1)?.value
        const value2 = group.get(control2)?.value

        if(value1 === value2) {
            return null;
        }

        return { compare : true }
        
    }
}
