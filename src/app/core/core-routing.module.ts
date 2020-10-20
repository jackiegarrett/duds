import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { WatchlistPageComponent } from '../watchlist-page/watchlist-page.component';
import { SearchCriteriaComponent } from '../search-criteria/search-criteria.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';


const routes: Routes = [
  {
    path: 'search',
    component: SearchCriteriaComponent
  },
  {
    path: 'watch-list',
    component: WatchlistPageComponent
  },
  { path: 'movie-details',
  component: MovieDetailComponent },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: MovieListComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
