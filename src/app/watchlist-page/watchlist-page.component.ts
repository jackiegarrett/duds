import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  constructor(private activatedRoute: Router, private router: Router) { }

  ngOnInit(): void {
  }

  goSearch() {
    this.router.navigateByUrl('/search');
  }

}
