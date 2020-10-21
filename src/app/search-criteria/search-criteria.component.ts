import { Component, OnInit } from '@angular/core';
import { GetAPIService } from '../core/get-api.service';
import { FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})
export class SearchCriteriaComponent implements OnInit {
  constructor(private getApiService: GetAPIService) {}

  genresArray: any[] = [];
  movieInfo: any[] = [];
  newArray: any[] = [];
  genresChecked = [];
  years: any = [];
  startYears: any =[];
  endYears: any =[];
  movieLengthBeginning;
  movieLengthEnd;
  searchForm;


  ngOnInit(): void {
    this.startYears = this.populateYears();
    this.endYears = this.populateYears();
    // this.searchForm = this.formBuilder.group({
    //   // searchTitle: new FormControl()
    // });


    //On initializing gets movies and the genres with no filters or searches
    this.getApiService.getMovies().subscribe((result: any) => {
      console.log('result', result);
      this.movieInfo = result.results;
      console.log(this.movieInfo);
    });

    this.getApiService.getGenres().subscribe((result: any) => {
      console.log('result', result);
      this.genresArray = result.genres;
    });
  }

  //Searches the titles
  titleSearch(form: NgForm) {
    // this.searchForm = form;
    //Calls the API service
    this.getApiService
      .getMovieSearchData(form.value.searchTitle, 1)
      .subscribe((result: any) => {
        this.movieInfo = result.results;
      });
  }

  filterSearch(form: NgForm) {
    console.log(form.value);
    //Based on run time filters you need to get correct movie length like short and average length, only long movies etc.
    if (
      form.value.shortLength == true &&
      form.value.averageLength == '' &&
      form.value.longLength == ''
    ) {
      this.movieLengthBeginning = 0;
      this.movieLengthEnd = 59;
    } else if (
      form.value.shortLength == true &&
      form.value.averageLength == true &&
      form.value.longLength == ''
    ) {
      this.movieLengthBeginning = 0;
      this.movieLengthEnd = 119;
    } else if (
      form.value.shortLength == true &&
      form.value.averageLength == true &&
      form.value.longLength == true
    ) {
      this.movieLengthBeginning = 0;
      this.movieLengthEnd = 500;
    } else if (
      form.value.shortLength == '' &&
      form.value.averageLength == true &&
      form.value.longLength == ''
    ) {
      this.movieLengthBeginning = 60;
      this.movieLengthEnd = 119;
    } else if (
      form.value.shortLength == '' &&
      form.value.averageLength == '' &&
      form.value.longLength == true
    ) {
      this.movieLengthBeginning = 119;
      this.movieLengthEnd = 500;
    }

    //Calls the API service and passes in all of our needed variables
    this.getApiService
      .getMovieFilterData(
        this.genresChecked,
        form.value.startYear ,
        form.value.endYear ,
        this.movieLengthBeginning,
        this.movieLengthEnd
      )
      .subscribe((result: any) => {
        console.log(result.results);
        this.movieInfo = result.results;
          // filter(x => {
        //   return x.vote_average < 5
        // }); 
        // if (this.movieInfo.length < 20) {

        // }
      }); 
  }

  onNextPage(pageNumber, ngForm) {
    this.getApiService
    .getMovieSearchData(ngForm.value.searchTitle, pageNumber)
    .subscribe((result: any) => {
      this.movieInfo = result.results;
    });
  }

  onStartYearsChange(event: any) {
    this.endYears = this.populateYears();
    this.endYears = this.endYears.filter(x => {
      return x > event.target.value.substring(0,4)
    })
  }

  onEndYearsChange(event: any) {
    this.startYears = this.populateYears();
    this.startYears = this.startYears.filter(x => {
      return x < event.target.value.substring(0,4)
    })
  }

  populateYears() {
    var years = [];
    for (var i = 1900; i <= 2020; i++) {
      years.push(i);
    } return years;
  }

  //Checks what genres have been checked and adds it to an array, if unchecked removes it from the array
  genreCheck(event) {
    if (event.target.checked) {
      this.genresChecked.push(event.target.value);
    } else {
      for (var i = 0; i < this.genresChecked.length; i++) {
        if (this.genresChecked[i] == event.target.value) {
          this.genresChecked.splice(i, 1);
        }
      }
    }
    console.log(this.genresChecked);
  }
}
