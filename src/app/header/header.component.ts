import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

 // Router concepts @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
  //  this.dataStorageService.fetchRecipes().subscribe();
  this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
   // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });

  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  /* Router Concepts onSelect(feature: string) {
    this.featureSelected.emit(feature);
   } */

}
