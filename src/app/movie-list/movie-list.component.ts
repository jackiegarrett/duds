import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetAPIService } from '../core/get-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  constructor(private getApiService: GetAPIService, private router: Router) {}
  movieDetails;
  genresDictionary;
  pageNumberCounter: number = 1;
  posterPath: string = 'https://image.tmdb.org/t/p/w154';
  genresArray: any[] = [];
  @Input() movieInfo;
  @Output() nextPage = new EventEmitter();

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

    //getYear, pass in release date to getFullYear return the year
  }

  goToNextPage() {
    this.pageNumberCounter++;
    this.nextPage.emit(this.pageNumberCounter);
  }

  //Previous Page

  //Uses the ID of the movie and finds the movie in the list they selected and sends their info along with it using a state
  routeToDetails(id) {
    console.log(this.movieInfo);
    const data = this.movieInfo.find((x) => x.id === id);
    this.router.navigateByUrl('/movie-details', {
      state: {
        data: data,
      },
    });
    //console.log('data', data);
  }
}
