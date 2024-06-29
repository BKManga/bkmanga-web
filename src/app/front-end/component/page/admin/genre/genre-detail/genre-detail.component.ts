import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateGenreRequestDTO, Genre, GenreControllerService, UpdateGenreRequestDTO} from "../../../../../bkmanga-svc";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouterAdmin, RouteGenre} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import {DialogService} from "../../../../../service/dialog.service";

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.scss']
})
export class GenreDetailComponent implements OnInit{
  formGroup: FormGroup;
  genreId?: string

  constructor(
    formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private genreControllerService: GenreControllerService,
    private router: Router,
    private dialogService: DialogService,
  ) {
    this.formGroup = formBuilder.group({
      name: ["" , Validators.required],
      description: ["" , Validators.required]
    })

    this.activatedRoute.params.subscribe(async (param) => {
      this.genreId = param[RouteGenre.Param]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getGenreData()
  }

  private getGenreData = async (): Promise<void> => {
    if (!this.genreId) return
    this.genreControllerService.getGenreById(parseInt(this.genreId)).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.formGroup.setValue({
            name: response.result?.name ?? "",
            description: response.result?.description ?? ""
          })
        }
      })
  }

  updateGenre = async (): Promise<void> => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    if (!this.genreId) return

    let updateGenreRequestDTO: UpdateGenreRequestDTO = {
      genreId: parseInt(this.genreId),
      name : this.formGroup.value.name.trim().toLocaleLowerCase(),
      description : this.formGroup.value.description.trim(),
    }

    this.genreControllerService.updateGenre(updateGenreRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Genre])
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }
          this.dialogService.showSnackBar(snackBarData)
        }
      })
  }
}
