import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  watchListArray = []

  constructor() { }

  getWatchList = () => {
    return this.watchListArray;
  }

  addMovieToWatchList = (movie) => {
    this.watchListArray.push(movie);
  }

  removeMovieFromWatchList = (i) => {
    this.watchListArray.splice(i, 1);
  }

}
