import {Actions, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffects {
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START)            // Filters the actions, Mulitple actions can be added
  );
  constructor(private actions$: Actions) {   // stream of dispatched actions
  }
}
