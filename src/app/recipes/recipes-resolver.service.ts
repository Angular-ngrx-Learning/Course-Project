import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {Observable} from 'rxjs';
import {RecipeService} from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import {Store} from '@ngrx/store';
import { Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(/*private dataStorageService: DataStorageService,
                private recipeService: RecipeService*/ private store: Store<fromApp.AppState>,
                private actions$: Actions) {}

   /* resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataStorageService.fetchRecipes();
    }*/
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    /* const recipes = this.recipeService.getRecipes();
     if (recipes.length === 0) {
       return this.dataStorageService.fetchRecipes();
     } else {
       return recipes;
     }*/
    this.store.dispatch(new RecipesActions.FetchRecipes());
    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
   }
}
