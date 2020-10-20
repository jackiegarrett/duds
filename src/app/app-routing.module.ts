import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MovieListComponent } from './movie-list/movie-list.component';

//Routing to movie details and home page

const routes: Routes = [
  {
    path: 'movie-list',
    loadChildren: () => import('./core/core-routing.module').then(m => m.CoreRoutingModule)
  },
  // { path: 'movie-details', component: MovieDetailComponent },
  {
    path: '',
    redirectTo: '/movie-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: MovieListComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
