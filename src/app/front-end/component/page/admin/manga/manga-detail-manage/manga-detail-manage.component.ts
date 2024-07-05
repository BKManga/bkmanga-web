import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  Author,
  AuthorControllerService,
  FileControllerService, Genre,
  GenreControllerService, GetMangaDetailRequestDTO,
  MangaControllerService, UpdateMangaRequestDTO
} from "../../../../../bkmanga-svc";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../../../service/dialog.service";
import {
  AgeRange,
  GetImage,
  MangaStatus,
  MiddlePrefixHandleImage,
  RouteGenre,
  RouteManga
} from "../../../../../constant/constants";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import {StatusCodes} from "http-status-codes";
import {environment} from "../../../../../../../environments/environment.development";
import {ErrorDialogData} from "../../../../../interface/error-dialog-data";

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

  imageLogoManga?: string | any
  imageLargeManga?: string | any

  uploadImageLogo?: Blob
  uploadImageLarge?: Blob

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
      mangaStatus: [MangaStatus.IN_PROCESS, [Validators.required]],
    })

    this.activatedRoute.params.subscribe(async (param) => {
      this.mangaId = param[RouteManga.Param]
      this.getMangaData().then()
      this.imageLogoManga = environment.apiBaseUrl +
        MiddlePrefixHandleImage.Prefix +
        GetImage.MANGA_IMAGE_LOGO +
        this.mangaId

      this.imageLargeManga = environment.apiBaseUrl +
        MiddlePrefixHandleImage.Prefix +
        GetImage.MANGA_IMAGE_LARGE +
        this.mangaId
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
            mangaStatus: mangaData?.mangaStatus?.id
          })
        } else {
          this.showSnackBarAlert(response.message)
        }
    })
  }

  updateManga = async (): Promise<void> => {
    if (!this.mangaId) return

    let updateMangaRequestDTO: UpdateMangaRequestDTO = {
      mangaId: parseInt(this.mangaId),
      name: this.formGroup.value.name.trim(),
      otherName: this.formGroup.value.otherName.trim(),
      description: this.formGroup.value.description.trim(),
      ageRangeId: this.formGroup.value.ageRange,
      mangaStatusId: this.formGroup.value.mangaStatus,
      listGenreId: this.formGroup.value.listGenre,
      listAuthorId: this.formGroup.value.listAuthor
    }

    this.mangaControllerService.updateManga(updateMangaRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.showDialog(
            response.message ?? "",
            "Cập nhật truyện thành công"
          )

          // if ()
        } else {
          this.showDialog(
            response.errorCode ?? "",
            response.message ?? "",
          )
        }
    })
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
  }

  private showDialog = (
    title: string,
    message: string,
    onAccept: Function = () => {},
  ) => {
    let errorDialogData: ErrorDialogData = {
      title: title,
      description: message,
      buttonText: "Đóng",
      onAccept: onAccept
    }

    this.dialogService.showErrorDialog(errorDialogData)
  }

  onChangeImage(event: any, isUploadLogo: boolean = true) {
    const files = event.target.files
    if (files.length === 0) return

    const mimeType = files[0].type;
    if (!mimeType.match(/image\/*/)) {
      this.showDialog(
        "Error",
        "Chỉ upload định dạng ảnh là png"
      )

      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (_event) => {
      if (isUploadLogo) {
        this.imageLogoManga = reader.result ?? ""
        this.uploadImageLogo = new Blob([files[0]], { type: mimeType })
      } else {
        this.imageLargeManga = reader.result ?? ""
        this.uploadImageLarge = new Blob([files[0]], { type: mimeType })
      }
    }
  }

  removeChangeImage = (isRemoveLogo: boolean = true) => {
    if (isRemoveLogo) {
      this.imageLogoManga = environment.apiBaseUrl +
        MiddlePrefixHandleImage.Prefix +
        GetImage.MANGA_IMAGE_LOGO +
        this.mangaId

      this.uploadImageLogo = undefined
      return
    }

    this.imageLargeManga = environment.apiBaseUrl +
      MiddlePrefixHandleImage.Prefix +
      GetImage.MANGA_IMAGE_LARGE +
      this.mangaId

    this.uploadImageLarge = undefined
  }

  protected readonly AgeRange = AgeRange
  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage
  protected readonly GetImage = GetImage
  protected readonly environment = environment
}
