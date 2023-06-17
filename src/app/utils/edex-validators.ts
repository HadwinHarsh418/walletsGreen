import { Observable } from "rxjs";
import { User } from "@root/modules/login/interfaces/user.interface";
import { AbstractControl } from "@angular/forms";
import { map, first } from "rxjs/operators";

export class EdexValidators {

    static notUsersPublicKey(user$: Observable<User>) {
        return (control: AbstractControl) => {
            return user$.pipe(
                map(user => {
                    if (control.value != user.publicKey){
                        return null;
                    } else {
                        return {'ownPublicKey': { value: control.value }}
                    }
                }),
                first()
            )
        };
    }

    static alsoValid(externalControl: AbstractControl) {
        return (currentControl: AbstractControl) => {
            return (externalControl.valid ? null : { 'alsoValid': { value: null } })
        }
    }
}
