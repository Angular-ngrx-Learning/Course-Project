import { Component, OnInit, Input } from '@angular/core';
import { Recipe} from '../recipe.model';
import { RecipeService} from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
   recipe: Recipe;
   id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
   /* this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
     // this.recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        this.recipe = recipe;
      });
    });*/

    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }), map(recipeState => {
      return recipeState.recipes.find((recipe, index) => {
        return index === this.id;
      });
    })).subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onEditRecipe() {
this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onAddToShoppingList() {
 this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
