import { Starship } from './../../interfaces/starships';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starships-info',
  templateUrl: './starships-info.component.html',
  styleUrls: ['./starships-info.component.less']
})

export class StarshipsInfoComponent implements OnInit {

  starship: Starship | undefined;
  starshipsArray: Starship[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const starshipId = params['id'];
      if (starshipId) {
        this.starship = this.getStarshipById(starshipId);
        if (!this.starship) {
          this.getStarshipDetails(starshipId);
        }
      }
    })
  }
  getStarshipDetails(id: string) {
    this.http.get<Starship>(`https://swapi.dev/api/starships/${id}`)
      .subscribe((data: Starship) => {
        this.starship = data;
        this.starship.imgURL = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
        this.starshipsArray.push(data); // Agrega la información de la nave espacial al array
      });
  }
  getStarshipById(id: string): Starship | undefined {
    return this.starshipsArray.find(starship => starship.url.endsWith(id));
  }
}