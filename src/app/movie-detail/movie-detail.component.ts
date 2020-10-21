import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieDetails;
  posterPath: string = 'https://image.tmdb.org/t/p/w200';
  genresDictionary;
  constructor(private activatedRoute: Router, private router: Router) {
    //Receieves the data from the movie list and now has access to all the information needed
    this.movieDetails = this.activatedRoute.getCurrentNavigation().extras.state[
      'data'
    ];
    console.log(this.movieDetails);
  }

  ngOnInit(): void {
    //Dictionary to list the movie genres
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
  }

  goSearch() {
    this.router.navigateByUrl('/search');
  }

  goBack() {
    //Sends user back to the home page
    this.router.navigateByUrl('/');
  }
}
