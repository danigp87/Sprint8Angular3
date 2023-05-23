import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Starship, StarshipList } from '../interfaces/starships';

@Injectable({
  providedIn: 'root'
})
export class ApiShipService {

  constructor(private http: HttpClient) { }

  public starShipsList: Starship[] = []

  getShips(page: number): Observable<StarshipList> {
    return this.http.get<StarshipList>(`https://starpi.herokuapp.com/starpi/starships/${page}`);
  }

  getShipCard(id: number): Observable <Starship>{
    return this.http.get<Starship>(`https://swapi.dev/api/starships/${id}/`);
  }

}