import {NgModule} from '@angular/core';
// import {RecipeService} from './recipes/recipe.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

@NgModule({
  providers: [/*RecipeService,*/
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true}/*, LoggingService*/] // Services donot need to be exporte
})
export class CoreModule {
}
