import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  Author,
  AuthorControllerService,
  FileControllerService, Genre,
  GenreControllerService, GetMangaDetailRequestDTO,
  MangaControllerService, UploadImageMangaRequest
} from "../../../../../bkmanga-svc";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../../../service/dialog.service";
import {AgeRange, GetImage, MiddlePrefixHandleImage, RouteGenre, RouteManga} from "../../../../../constant/constants";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import {StatusCodes} from "http-status-codes";
import {environment} from "../../../../../../../environments/environment.development";

@Component({
  selector: 'app-manga-detail-manage',
  templateUrl: './manga-detail-manage.component.html',
  styleUrls: ['./manga-detail-manage.component.scss']
})
export class MangaDetailManageComponent implements OnInit{

  formGroup: FormGroup

  authorList: Array<Author> = []
  genreList: Array<Genre> = []

  mangaId?: string

  constructor(
    formBuilder: FormBuilder,
    private mangaControllerService: MangaControllerService,
    private router: Router,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private fileControllerService: FileControllerService,
    private genreControllerService: GenreControllerService,
    private authorControllerService: AuthorControllerService,
  ) {
    this.formGroup = formBuilder.group({
      name: ["", [Validators.required]],
      otherName: ["", [Validators.required]],
      description: ["" , Validators.required],
      listGenre: [[]],
      listAuthor: [[]],
      ageRange: [AgeRange.AllAge.at(0), [Validators.required]],
    })

    this.activatedRoute.params.subscribe(async (param) => {
      this.mangaId = param[RouteManga.Param]
      this.getMangaData().then()
    })
  }

  private getMangaData = async (): Promise<void> => {
    if (!this.mangaId) return

    let getMangaDetailRequestDTO: GetMangaDetailRequestDTO = {
      mangaId: parseInt(this.mangaId)
    }

    this.mangaControllerService.getMangaDetail(getMangaDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          let mangaData = response.result
          this.formGroup.patchValue({
            name: mangaData?.name ?? "",
            otherName: mangaData?.name ?? "",
            description: mangaData?.description ?? "",
            ageRange: mangaData?.ageRange?.id,
            listGenre: mangaData?.genreMangaList?.map(element => {
              return element.genre?.id
            }),
            listAuthor: mangaData?.mangaAuthorList?.map(element => {
              return element.author?.id
            }),
          })
        console.log(mangaData?.mangaAuthorList?.map(element => {
          return element.author?.id
        }))
        } else {
          this.showSnackBarAlert(response.message)
        }
    })
  }

  updateManga = async (): Promise<void> => {

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

  private uploadImage = () => {
    let formData = new FormData()
    const reader = new FileReader();
    // let file?: Fil
    // reader.readAsArrayBuffer(File);
    // reader.onload = () => {
    //   const blob = new Blob([reader.result], { type: this.selectedFile.type });
    //   this.uploadImage(blob);
    // };
    // let uploadImageMangaRequest: UploadImageMangaRequest = {
    //   file: Blo
    // }
    // this.fileControllerService.uploadImageManga(1, "lmao", formData)
  }

  protected readonly AgeRange = AgeRange
  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;
}
