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

  constructor(private getApiService: GetAPIService, private router: Router, private watchListService: WatchListService) { }

  posterPath: string = 'https://image.tmdb.org/t/p/w154';
  genresArray: any[] = [];
  movieInfo;
  genresDictionary;

  ngOnInit(): void {
    this.genresDictionary = {
      '28': 'Action',
      '12': 'Adventure',
      '16': 'Animation',
      '35': 'Comedy',
      '80': 'Crime',
      '99': 'Documentary',
      '18': 'Drama',
      '10751': 'Family',
      '14': 'Fantasy',
      '36': 'History',
      '27': 'Horror',
      '10402': 'Music',
      '9648': 'Mystery',
      '10749': 'Romance',
      '878': 'Science Fiction',
      '10770': 'TV Movie',
      '53': 'Thriller',
      '10752': 'War',
      '37': 'Western',
    };

    this.getApiService.getGenres().subscribe((result: any) => {
      console.log('result', result);
      this.genresArray = result.genres;
    });

    this.movieInfo = this.watchListService.getWatchList();

  }

  removeFromWatchListService = (i) => {
    this.watchListService.removeMovieFromWatchList(i);
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
