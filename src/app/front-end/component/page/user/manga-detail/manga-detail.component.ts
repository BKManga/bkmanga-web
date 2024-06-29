import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  AppRouter,
  CommentBlockArea,
  GetImage,
  MiddlePrefixHandleImage,
  RouteManga
} from "../../../../constant/constants";
import {
  CreateFollowRequestDTO, CreateLikeMangaRequestDTO,
  DeleteFollowRequestDTO, DeleteLikeMangaRequestDTO,
  FollowControllerService,
  GetFollowByMangaRequestDTO,
  GetLikeMangaRequestDTO, GetMangaDetailRequestDTO,
  GetMangaResponseDTO,
  LikeControllerService,
  MangaControllerService
} from "../../../../bkmanga-svc";
import {parseInt} from "lodash";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {DialogService} from "../../../../service/dialog.service";
import {ScrollPageService} from "../../../../service/scroll-page.service";
import {JwtDecodeService} from "../../../../service/jwt-decode.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../../environments/environment.development";

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})
export class MangaDetailComponent implements OnInit{

  mangaId ?: string
  private getMangaDetailRequestDTO ?: GetMangaDetailRequestDTO

  manga?: GetMangaResponseDTO
  followId?: number
  likeId?: number

  mangaFormGroup: FormGroup

  isFollow: boolean
  isLike: boolean
  checkAuthentication?: boolean

  readonly commentBlockArea: string = CommentBlockArea.MANGA

  constructor(
    private activatedRoute: ActivatedRoute,
    private mangaControllerService: MangaControllerService,
    private router: Router,
    private dialogService: DialogService,
    private scrollPageService: ScrollPageService,
    private jwtDecodeService: JwtDecodeService,
    private followControllerService: FollowControllerService,
    private likeControllerService: LikeControllerService,
    private formBuilder: FormBuilder,
  ) {
    this.jwtDecodeService.checkToken().subscribe((value) => {
      this.checkAuthentication = value
    })
    this.isFollow = false
    this.isLike = false
    this.mangaFormGroup = this.formBuilder.group({
      numberOfLikes: [0],
      numberOfFollows: [0],
    })
  }

  async ngOnInit(): Promise<void> {
    this.scrollPageService.scrollTopPage()
    this.activatedRoute.params.subscribe(async (param) => {
      this.mangaId = param[RouteManga.Param]

      if (this.mangaId && parseInt(this.mangaId)) {
        this.getMangaDetailRequestDTO = {
          mangaId: parseInt(this.mangaId),
        }

        await this.getMangaData(this.getMangaDetailRequestDTO)
      }

      if (this.checkAuthentication) {
        await this.getFollowData()
        await this.getLikeData()
      }
    })
  }

  private getMangaData = async (getMangaDetailRequestDTO: GetMangaDetailRequestDTO) : Promise<void> => {
    this.mangaControllerService.getMangaDetail(getMangaDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.manga = response.result
          this.setMangaFormBuilder(
            this.manga?.numberOfFollow ?? 0,
            this.manga?.numberOfLikes ?? 0
          )
        } else {
          this.showSnackBar(response.message ?? "")
        }
    })
  }

  private getFollowData = async () : Promise<void> => {
    if (!this.mangaId) return

    let getFollowByMangaRequestDTO: GetFollowByMangaRequestDTO = {
      mangaId: parseInt(this.mangaId)
    }
    this.followControllerService.getFollow(getFollowByMangaRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.setFollowId(response.result?.id)
        } else {
          this.showSnackBar(response.message ?? "")
        }
    })
  }

  private getLikeData = async (): Promise<void> => {
    if (!this.mangaId) return

    let getLikeMangaRequestDTO: GetLikeMangaRequestDTO = {
      mangaId: parseInt(this.mangaId)
    }

    this.likeControllerService.getLikeManga(getLikeMangaRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.setLikeId(response.result?.id)
        } else {
          this.showSnackBar(response.message ?? "")
        }
    })
  }

  handleUnfollowManga = async (): Promise<void> => {
    if (!this.followId) return

    let deleteFollowRequestDTO: DeleteFollowRequestDTO = {
      id: this.followId
    }

    this.followControllerService.deleteFollow(deleteFollowRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.setFollowId(undefined)
          this.setMangaFormBuilder(
            this.mangaFormGroup.controls["numberOfFollows"].value - 1,
            this.mangaFormGroup.controls["numberOfLikes"].value,
          )
        } else {
          this.showSnackBar(response.message ?? "")
        }
    })
  }

  handleUnlikeManga = async (): Promise<void> => {
    if (!this.likeId) return

    let deleteLikeMangaRequestDTO: DeleteLikeMangaRequestDTO = {
      id: this.likeId
    }

    this.likeControllerService.deleteLikeManga(deleteLikeMangaRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.setLikeId(undefined)
          this.setMangaFormBuilder(
            this.mangaFormGroup.controls["numberOfFollows"].value,
            this.mangaFormGroup.controls["numberOfLikes"].value - 1,
          )
        } else {
          this.showSnackBar(response.message ?? "")
        }
      })
  }

  createFollowManga = async (): Promise<void> => {
    if (!this.mangaId) return

    let createFollowRequestDTO: CreateFollowRequestDTO = {
      mangaId: parseInt(this.mangaId)
    }

    this.followControllerService.createFollow(createFollowRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.followId = response.result?.id
          this.setMangaFormBuilder(
            this.mangaFormGroup.controls["numberOfFollows"].value + 1,
            this.mangaFormGroup.controls["numberOfLikes"].value,
          )
        } else {
          this.showSnackBar(response.message ?? "")
        }
    })
  }

  createLikeManga = async (): Promise<void> => {
    if (!this.mangaId) return

    let createLikeMangaRequestDTO: CreateLikeMangaRequestDTO = {
      mangaId: parseInt(this.mangaId)
    }

    this.likeControllerService.createLikeManga(createLikeMangaRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.setLikeId(response.result?.id)
          this.setMangaFormBuilder(
            this.mangaFormGroup.controls["numberOfFollows"].value,
            this.mangaFormGroup.controls["numberOfLikes"].value + 1,
          )
        } else {
          this.showSnackBar(response.message ?? "")
        }
      })
  }

  redirectToGenrePage = async (genreId: number | undefined) : Promise<void> => {
    if (!genreId) return
    await this.router.navigate([AppRouter.Main, AppRouter.Genre, genreId])
  }

  redirectToMainPage = async (): Promise<void> => {
    await this.router.navigate([AppRouter.Main])
  }

  redirectToAuthorPage = async (authorId: number | undefined): Promise<void> => {
    if (!authorId) return

    await this.router.navigate([AppRouter.Main, AppRouter.Author, authorId])
  }

  redirectToFirstChapterDetailPage = async (chapterId: number | undefined): Promise<void> => {
    if (!chapterId) return

    await this.router.navigate([
      AppRouter.Main,
      AppRouter.MangaDetail,
      this.mangaId,
      AppRouter.ChapterDetail,
      chapterId
    ])
  }

  private showSnackBar = (message: string) => {
    let snackBarData: SnackbarData = {
      message: message
    }

    this.dialogService.showSnackBar(snackBarData)
  }

  private setFollowId = (followId: number | undefined): void => {
    this.followId = followId
  }

  private setLikeId = (likeId: number | undefined): void => {
    this.likeId = likeId
  }

  private setMangaFormBuilder = (
    numberOfFollows: number,
    numberOfLikes: number
  ) => {
    this.mangaFormGroup.setValue({
      numberOfFollows: numberOfFollows,
      numberOfLikes: numberOfLikes
    })
  }
  protected readonly environment = environment;
  protected readonly RouteManga = RouteManga;
  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
}
