import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateGenreRequestDTO, Genre, GenreControllerService} from "../../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {AppRouterAdmin} from "../../../../../constant/constants";
import {DialogService} from "../../../../../service/dialog.service";
import {SnackbarData} from "../../../../../interface/snackbar-data";

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.scss']
})
export class GenreAddComponent implements OnInit{

  formGroup: FormGroup;
  genre?: Genre;

  constructor(
    formBuilder: FormBuilder,
    private genreControllerService: GenreControllerService,
    private router: Router,
    private dialogService: DialogService,
  ) {
    this.formGroup = formBuilder.group({
      name: ["" , Validators.required],
      description: ["" , Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
  }

  createGenre = async (): Promise<void> => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let createGenreRequestDTO: CreateGenreRequestDTO = {
      name : this.formGroup.value.name.trim().toLocaleLowerCase(),
      description : this.formGroup.value.description.trim(),
    }

    this.genreControllerService.createGenre(createGenreRequestDTO).subscribe(
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
