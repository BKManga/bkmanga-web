import {Component, OnInit} from '@angular/core';
import {DeleteGenreRequestDTO, Genre, GenreControllerService} from "../../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {AppRouterAdmin} from "../../../../../constant/constants";
import {Router} from "@angular/router";
import {DialogService} from "../../../../../service/dialog.service";
import {ConfirmDialogData} from "../../../../../interface/confirm-dialog-data";
import {SnackbarData} from "../../../../../interface/snackbar-data";

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
    private dialogService: DialogService,
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

  onDeleteGenre(genreId?: number, genreName?: string) {
    if (!genreId) return

    let confirmDialogData: ConfirmDialogData = {
      title: "Xác nhận xóa thể loại?",
      description: `Bạn có chắc chắn muốn xóa thể loại ${genreName}?`,
      buttonText: "Đồng ý",
      onAccept: () => this.deleteGenre(genreId).then()
    }

    this.dialogService.showConfirmDialog(confirmDialogData)
  }

  private deleteGenre = async (genreId: number) => {
    let deleteGenreRequestDTO: DeleteGenreRequestDTO = {
      genreId: genreId,
    }

    this.genreControllerService.deleteGenre(deleteGenreRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.getGenreData().then()
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
    })
  }
}
