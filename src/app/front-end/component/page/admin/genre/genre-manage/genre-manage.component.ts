import {Component, OnInit} from '@angular/core';
import {Genre, GenreControllerService} from "../../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {AppRouterAdmin} from "../../../../../constant/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genre-manage',
  templateUrl: './genre-manage.component.html',
  styleUrls: ['./genre-manage.component.scss']
})
export class GenreManageComponent implements OnInit{
  dataSource: Array<Genre> = new Array<Genre>()
  displayedColumns: string[] = ['id', 'name', 'description', 'action']

  constructor(
    private genreControllerService: GenreControllerService,
    private router: Router,
  ) {
  }

  private getGenreData = async () => {
    this.genreControllerService.getAllGenre().subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.dataSource = response.result ?? []
        }
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getGenreData()
  }

  redirectToAddGenrePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Genre, AppRouterAdmin.Add])
  }

  redirectToDetailGenrePage = async (genreId?: number): Promise<void> => {
    if (!genreId) return
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Genre, AppRouterAdmin.Detail, genreId])
  }
}
