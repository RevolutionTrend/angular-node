import { Injectable } from '@angular/core';

import { Hero } from '../modals/hero';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpService: HttpService) { }

  getHeroes() {
    return this.httpService.get('/api/heroes');
  }
}
