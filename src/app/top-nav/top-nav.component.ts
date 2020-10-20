import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(private activatedRoute: Router, private router: Router) { }

  ngOnInit(): void {
  }

  goSearch() {
    this.router.navigateByUrl('/search');
  }

  goWatchList() {
    this.router.navigateByUrl('/watch-list');
  }

}
