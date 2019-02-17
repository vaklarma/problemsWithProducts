import {UserModel} from '../../shared/user-model';
import {FormControl} from '@angular/forms';

export function minimumPasswordLength(getUserfn: () => UserModel) {
  return function (formControl: FormControl) {
    return {
      'validateminLength': true
    };
  };
}
