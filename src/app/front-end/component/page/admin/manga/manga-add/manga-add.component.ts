import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  Author,
  AuthorControllerService, Genre,
  GenreControllerService,
  MangaControllerService
} from "../../../../../bkmanga-svc";
import {Router} from "@angular/router";
import {DialogService} from "../../../../../service/dialog.service";
import {AgeRange, Gender} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../../interface/snackbar-data";

@Component({
  selector: 'app-manga-add',
  templateUrl: './manga-add.component.html',
  styleUrls: ['./manga-add.component.scss']
})
export class MangaAddComponent implements OnInit{

  formGroup: FormGroup

  authorList: Array<Author> = []
  genreList: Array<Genre> = []

  constructor(
    formBuilder: FormBuilder,
    private mangaControllerService: MangaControllerService,
    private router: Router,
    private dialogService: DialogService,
    private genreControllerService: GenreControllerService,
    private authorControllerService: AuthorControllerService,
  ) {
    this.formGroup = formBuilder.group({
      name: ["", [Validators.required]],
      otherName: ["", [Validators.required]],
      description: ["" , Validators.required],
      listGenre: [[]],
      listAuthor: [[]],
      firstChapterName: ["", [Validators.required]],
      ageRange: [AgeRange.AllAge.at(0), [Validators.required]],
    })
  }

  createManga = async (): Promise<void> => {
  }

  private getGenreData = async (): Promise<void> => {
    this.genreControllerService.getAllGenre().subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.genreList = response.result ?? []
        } else {
          this.showSnackBarAlert(response.message)
        }
    })
  }

  private getAuthorData = async (): Promise<void> => {
    this.authorControllerService.getAllAuthor().subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.authorList = response.result ?? []
        } else {
          this.showSnackBarAlert(response.message)
        }
    })
  }

  private showSnackBarAlert = (message?: string) => {
    let snackBarData: SnackbarData = {
      message: message ?? ""
    }

    this.dialogService.showSnackBar(snackBarData)
  }

  async ngOnInit(): Promise<void> {
    await this.getGenreData()
    await this.getAuthorData()
  }

  protected readonly AgeRange = AgeRange;
}
