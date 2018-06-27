import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../modals/hero';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.httpService.send('get', 'detail', {
      id: id
    }).subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.httpService.send('post', 'update', this.hero)
      .subscribe(() => console.log('success'));
  }

  goBack(): void {
    this.location.back();
  }

}
