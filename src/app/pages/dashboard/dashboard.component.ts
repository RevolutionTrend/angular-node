import { Component, OnInit } from '@angular/core';

import { Hero } from '../../modals/hero';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[];
  page: number = 1;
  countPerPage: number = 4;
  maxPage: number = 1;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getHeros();
  }

  getHeros() {
    this.httpService.send('get', 'heroesPage', {
      page: this.page,
      countPerPage: this.countPerPage
    }).subscribe(obj => {
      this.heroes = obj.heroes;
      this.maxPage = Math.ceil(obj.total / this.countPerPage);
    });
  }

  prePage() {
    this.page = Math.max(this.page - 1, 1);
    this.httpService.send('get', 'heroesPage', {
      page: this.page,
      countPerPage: this.countPerPage
    }).subscribe(({ heroes }) => this.heroes = heroes);
  }

  nextPage() {
    this.page = Math.min(this.page + 1, this.maxPage);
    this.httpService.send('get', 'heroesPage', {
      page: this.page,
      countPerPage: this.countPerPage
    }).subscribe(({ heroes }) => this.heroes = heroes);
  }

}
