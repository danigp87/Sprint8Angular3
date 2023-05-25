import { Starship, StarshipList } from '../interfaces/starships';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.less']
})
export class StarshipsComponent implements OnInit {

  starships: Starship[] = []
  private reload = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.reload) {
      this.reload = false;
    }
    this.callAPI();
  }

  currentPage: number = 0;
  totalPages: number = 0;
  loading: boolean = false;

  callAPI() {
    if (this.currentPage === this.totalPages && this.totalPages !== 0) {
      return; // Detener la llamada si ya se alcanzó la última página
    }
    if (this.loading) {
      return; // Evitar solicitudes simultáneas
    }

    const itemsPerPage = 10;
    const itemsLoaded = this.starships.length;
    const nextPage = Math.ceil((itemsLoaded + 1) / itemsPerPage);

    this.http.get<StarshipList>('https://swapi.dev/api/starships/?page=' + (this.currentPage + 1))
      .pipe(
        map((data: StarshipList) => {
          this.starships = this.starships.concat(data.results); // Concatena los nuevos elementos al array existente
          this.currentPage = nextPage; // Incrementa la página actual
          this.totalPages = Math.ceil(data.count / itemsPerPage); // Calcula el total de páginas
          console.log(data.results)
        }),
      )
      .subscribe(() => {
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (windowHeight + scrollTop >= scrollHeight) {
      this.callAPI();
    }
  }

  extractStarshipId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

}