import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Genre, GenreControllerService} from "../../../../bkmanga-svc";
import {ActivatedRoute} from "@angular/router";
import {RouteGenre} from "../../../../constant/constants";
import {parseInt} from "lodash";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit, OnChanges{
  listMangaFound : Array<number> = []
  private idGenre: string | undefined
  genreData: Genre | undefined;

  constructor(
    private genreControllerService: GenreControllerService,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (param) => {
      this.idGenre = param[RouteGenre.Param]
      await this.getGenreData()
    });

    for (let i = 1; i < 15; i++) {
      this.listMangaFound.push(i)
    }
  }

  private getGenreData = async () : Promise<void> => {
    if (!this.idGenre) return
    let idGenreTypeNum = parseInt(this.idGenre!);
    this.genreControllerService
      .getGenreById(idGenreTypeNum)
      .subscribe((response) => {
        if (response.responseCode === 200) {
          this.genreData = response.result
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
}
