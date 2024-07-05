import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  Author,
  AuthorControllerService, CreateMangaRequestDTO, FileControllerService, Genre,
  GenreControllerService,
  MangaControllerService
} from "../../../../../bkmanga-svc";
import {Router} from "@angular/router";
import {DialogService} from "../../../../../service/dialog.service";
import {AgeRange, TargetImage} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import {ErrorDialogData} from "../../../../../interface/error-dialog-data";

@Component({
  selector: 'app-manga-add',
  templateUrl: './manga-add.component.html',
  styleUrls: ['./manga-add.component.scss']
})
export class MangaAddComponent implements OnInit{

  formGroup: FormGroup

  authorList: Array<Author> = []
  genreList: Array<Genre> = []

  imageLargeManga?: string | any
  imageLogoManga?: string | any

  uploadImageLogo?: Blob
  uploadImageLarge?: Blob
  uploadChapterManga?: Blob

  constructor(
    formBuilder: FormBuilder,
    private mangaControllerService: MangaControllerService,
    private router: Router,
    private dialogService: DialogService,
    private genreControllerService: GenreControllerService,
    private authorControllerService: AuthorControllerService,
    private fileControllerService: FileControllerService
  ) {
    this.formGroup = formBuilder.group({
      name: ["", [Validators.required]],
      otherName: ["", [Validators.required]],
      description: ["" , Validators.required],
      listGenre: [[]],
      listAuthor: [[]],
      firstChapterName: ["", [Validators.required]],
      chapterMangaNameUpload:[
        {value: "", disabled: true},
        [Validators.required]
      ],
      ageRange: [AgeRange.AllAge.at(0), [Validators.required]],
    })
  }

  createManga = async (): Promise<void> => {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let createMangaRequestDTO: CreateMangaRequestDTO = {
      name: this.formGroup.value.name.trim(),
      otherName: this.formGroup.value.otherName.trim(),
      description: this.formGroup.value.description.trim(),
      listGenreId: this.formGroup.value.listGenre,
      listAuthorId: this.formGroup.value.listAuthor,
      firstChapterName: this.formGroup.value.firstChapterName.trim(),
      ageRangeId: this.formGroup.value.ageRange
    }

    this.mangaControllerService.createManga(createMangaRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.showDialog(
            response.message ?? "",
            "Tạo truyện mới thành công"
          )

          let mangaId = response.result?.id

          if (mangaId) {
            if (this.uploadImageLogo) {
              this.fileControllerService.uploadImageManga(
                mangaId,
                TargetImage.IMAGE_LOGO,
                this.uploadImageLogo
              ).subscribe((res) => {
                if (res.responseCode !== StatusCodes.OK) {
                  this.showSnackBarAlert(res.message)
                }
              })
            }

            if (this.uploadImageLarge) {
              this.fileControllerService.uploadImageManga(
                mangaId,
                TargetImage.IMAGE_LARGE,
                this.uploadImageLarge
              ).subscribe((res) => {
                if (res.responseCode !== StatusCodes.OK) {
                  this.showSnackBarAlert(res.message)
                }
              })
            }
          }
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

  protected readonly AgeRange = AgeRange

  onChangeChapterUpload(event: any) {
    const files = event.target.files
    if (files.length === 0) return

    const mimeType = files[0].type;
    if (mimeType !== 'application/zip') {
      this.showDialog(
        "Error",
        "Cần upload file nén"
      )

      return
    }
    this.formGroup.controls["chapterMangaNameUpload"].setValue(files[0].name)

    this.uploadChapterManga = new Blob([files[0]], { type: mimeType })
  }
}
