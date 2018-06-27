import { Component, OnInit } from '@angular/core';

import { Hero } from '../../modals/hero';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.httpService.get('heroes').subscribe((heroes: Hero[]) => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.httpService.send('post', 'addHero', {
      name: name
    }).subscribe((hero: Hero) => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.httpService.send('delete', 'deleteHero', { id: hero.id })
      .subscribe((id: number) => this.heroes = this.heroes.filter(h => h.id !== id));
  }

}
