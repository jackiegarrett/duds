import { Component, OnInit, Input } from '@angular/core';
import { GetAPIService } from '../core/get-api.service';
import { Router } from '@angular/router';
import { WatchListService } from '../core/watch-list.service';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  constructor(private getApiService: GetAPIService, private router: Router, private watchListServe: WatchListService) { }

  posterPath: string = 'https://image.tmdb.org/t/p/w154';
  genresArray: any[] = [];
  movieInfo;

  ngOnInit(): void {
    this.getApiService.getGenres().subscribe((result: any) => {
      console.log('result', result);
      this.genresArray = result.genres;
    });

    this.movieInfo = this.watchListServe.getWatchList();

  }

  goSearch() {
    this.router.navigateByUrl('/search');
  }

  routeToDetails(id) {
    console.log(this.movieInfo);
    const data = this.movieInfo.find((x) => x.id === id);
    this.router.navigateByUrl('/movie-details', {
      state: {
        data: data,
      },
    });
    
  }
}
