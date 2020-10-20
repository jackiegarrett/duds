import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAPIService {
  constructor(private httpClient: HttpClient) {}

  public $getMovieAPI = new Subject<any>();

  //This service file will have more than a function to get, a function to search, etc.
  //This link will be broken up

  pageCount: number = 1;

  //Gets the inital movies
  getMovies = (): any => {
    let url =
      'https://api.themoviedb.org/3/discover/movie?api_key=80293729e43a58b6df6bccaa278d8358&sort_by=vote_average.asc&vote_count.gte=50&page=' +
      this.pageCount;
    return this.httpClient.get<any>(url);
  };

  //Gets all the genres
  getGenres = (): any => {
    let genreUrl =
      'https://api.themoviedb.org/3/genre/movie/list?api_key=80293729e43a58b6df6bccaa278d8358&language=en-US';
    return this.httpClient.get<any>(genreUrl);
  };

  //Searches only based on the titel given
  getMovieSearchData = (searchTerm: string): any => {
    let searchTitle = new HttpParams().set('query', searchTerm);
    return this.httpClient.get(
      'https://api.themoviedb.org/3/search/movie?api_key=80293729e43a58b6df6bccaa278d8358&language=en-US&page=1&include_adult=false',
      { params: searchTitle }
    );
  };

  getMovieFilterData = (
    genres,
    startYear,
    endYear,
    movieLengthBeginning,
    movieLengthEnd
  ): any => {
    let filterParam = new HttpParams();

    //If parameter not set then dont search it doing set adds it to the parameter list
    if (genres.length != 0) {
      filterParam = filterParam.set('with_genres', genres.toString());
    }

    if (startYear != null) {
      filterParam = filterParam.set('release_date.gte', startYear);
    }

    if (endYear != null) {
      filterParam = filterParam.set('release_date.lte', endYear);
    }

    if (movieLengthBeginning != null) {
      filterParam = filterParam.set('with_runtime.gte', movieLengthBeginning);
    }

    if (movieLengthEnd != null) {
      filterParam = filterParam.set('with_runtime.lte', movieLengthEnd);
    }

    return this.httpClient.get(
      'https://api.themoviedb.org/3/discover/movie?api_key=80293729e43a58b6df6bccaa278d8358&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=false&page=1',
      { params: filterParam }
    );
  };
}
