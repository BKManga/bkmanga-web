import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaginatorData} from "../../../../interface/paginator-data";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  ChapterComment,
  ChapterCommentControllerService, CreateChapterCommentRequestDTO, CreateMangaCommentRequestDTO,
  DeleteChapterCommentRequestDTO,
  DeleteMangaCommentRequestDTO, GetListChapterCommentRequestDTO,
  GetListMangaCommentRequestDTO,
  MangaComment,
  MangaCommentControllerService,
} from "../../../../bkmanga-svc";
import {
  AuthToken,
  CommentBlockArea,
  DataOrderBy, GetImage,
  MiddlePrefixHandleImage, OutLawArea,
  RouteChapter,
  RouteManga
} from "../../../../constant/constants";
import {ActivatedRoute} from "@angular/router";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {DialogService} from "../../../../service/dialog.service";
import {JwtDecodeService} from "../../../../service/jwt-decode.service";
import {environment} from "../../../../../../environments/environment.development";
import {CookieService} from "ngx-cookie-service";
import {OutLawReportDialogData} from "../../../../interface/out-law-report-dialog-data";

@Component({
  selector: 'app-block-comment',
  templateUrl: './block-comment.component.html',
  styleUrls: ['./block-comment.component.scss']
})
export class BlockCommentComponent implements OnInit, AfterViewInit{

  formGroup: FormGroup

  toolTipDeleteComment: string = "delete.comment"

  usernameSession?: string

  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage
  protected readonly GetImage = GetImage
  protected readonly environment = environment

  paginatorData: PaginatorData = {
    pageIndex: 0,
    pageSize: 5,
    pageSizeOptions: Array<number>(5, 10, 25, 100),
    showFirstLastButtons: true,
    hidePageSize: true,
  }

  totalComment: number = 0
  dataOrderBy = DataOrderBy.DESC
  id: number = 0
  checkToken: boolean = false

  listComment: Array<MangaComment> | Array<ChapterComment> = []
  @Input() commentBlockArea: string = ""
  @ViewChild('paginator') paginator: MatPaginator | undefined

  constructor(
    formBuilder: FormBuilder,
    private chapterCommentControllerService: ChapterCommentControllerService,
    private mangaCommentControllerService: MangaCommentControllerService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private jwtDecodeService: JwtDecodeService,
    private cookieService: CookieService,
  ) {
    this.formGroup = formBuilder.group({
      comment: [""]
    })

    jwtDecodeService.checkToken().subscribe((value) => {
      this.checkToken = value
      if (value) {
        this.usernameSession = jwtDecodeService.decodeToken(cookieService.get(AuthToken))?.sub
      }
    })
  }

  async ngOnInit(): Promise<void> {

    this.activatedRoute.params.subscribe(async (param) => {
      this.id = this.commentBlockArea === CommentBlockArea.MANGA
        ? param[RouteManga.Param]
        : param[RouteChapter.Param]
    })

    if (this.commentBlockArea === CommentBlockArea.MANGA) {
      await this.getMangaCommentData()
    } else if (this.commentBlockArea === CommentBlockArea.CHAPTER) {
      await this.getChapterCommentData()
    }

  }

  postComment = () => {
    let valueComment = this.formGroup.value.comment.trim()

    if (!valueComment || !this.id) return

    if (this.commentBlockArea === CommentBlockArea.MANGA) {
      let createMangaCommentRequestDTO: CreateMangaCommentRequestDTO = {
        content: valueComment,
        mangaId: this.id
      }

      this.mangaCommentControllerService.createMangaComment(createMangaCommentRequestDTO).subscribe(
        (response) => {
          if (response.responseCode === StatusCodes.OK) {
            this.getMangaCommentData().then()
          } else {
            this.showSnackBarDialog(response.message)
          }
      })
    } else if (this.commentBlockArea === CommentBlockArea.CHAPTER) {
      let createChapterCommentRequestDTO: CreateChapterCommentRequestDTO = {
        content: valueComment,
        chapterId: this.id
      }

      this.chapterCommentControllerService.createChapterComment(createChapterCommentRequestDTO).subscribe(
        (response) => {
          if (response.responseCode === StatusCodes.OK) {
            this.getChapterCommentData().then()
          } else {
            this.showSnackBarDialog(response.message)
          }
        })
    }

    this.formGroup.reset()
    this.paginator?.firstPage()
  }

  paginationComment = async (pageEvent: PageEvent) : Promise<void> => {
    this.paginatorData.pageSize = pageEvent.pageSize
    this.paginatorData.pageIndex = pageEvent.pageIndex

    if (this.commentBlockArea === CommentBlockArea.MANGA) {
      await this.getMangaCommentData()
    } else if (this.commentBlockArea === CommentBlockArea.CHAPTER) {
      await this.getChapterCommentData()
    }
  }

  ngAfterViewInit(): void {
  }

  deleteComment = async (commentId : number | undefined, userId : number | undefined) : Promise<void> => {
    if (!commentId || !userId) return

    if (this.commentBlockArea === CommentBlockArea.MANGA) {
      await this.deleteMangaComment(commentId, userId)
    } else if (this.commentBlockArea === CommentBlockArea.CHAPTER) {
      await this.deleteChapterComment(commentId, userId)
    }
  }

  private deleteMangaComment = async (mangaCommentId: number, userId: number) : Promise<void> => {
    let deleteMangaCommentRequest: DeleteMangaCommentRequestDTO = {
      mangaCommentId: mangaCommentId,
    }
      this.mangaCommentControllerService.deleteMangaComment(deleteMangaCommentRequest).subscribe(
        async (response) => {
          if (response.responseCode === StatusCodes.OK) {
            await this.getMangaCommentData()
          } else {
            this.showSnackBarDialog(response.message)
          }
      })
  }

  private deleteChapterComment = async (chapterCommentId: number, userId: number) : Promise<void> => {
    let deleteChapterCommentRequest: DeleteChapterCommentRequestDTO = {
      chapterCommentId: chapterCommentId,
    }
    this.chapterCommentControllerService.deleteChapterComment(deleteChapterCommentRequest).subscribe(
       async (response) => {
        if (response.responseCode === StatusCodes.OK) {
          await this.getChapterCommentData()
        } else {
          this.showSnackBarDialog(response.message)
        }
    })
  }

  private getMangaCommentData = async () : Promise<void> => {

    let getListMangaCommentRequestDTO: GetListMangaCommentRequestDTO = {
      mangaId: this.id,
      page: this.paginatorData.pageIndex,
      size: this.paginatorData.pageSize,
      orderBy: this.dataOrderBy
    }

    this.mangaCommentControllerService.getMangaCommentList(getListMangaCommentRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.totalComment = response.result?.totalElements ?? 0
          this.listComment = response.result?.content ?? []
        } else {
          this.showSnackBarDialog(response.message)
        }
      })
  }

  private getChapterCommentData = async () : Promise<void> => {

    let getListChapterCommentRequestDTO : GetListChapterCommentRequestDTO = {
      chapterId: this.id,
      page: this.paginatorData.pageIndex,
      size: this.paginatorData.pageSize,
      orderBy: this.dataOrderBy
    }

    this.chapterCommentControllerService.getChapterCommentList(getListChapterCommentRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.totalComment = response.result?.totalElements ?? 0
          this.listComment = response.result?.content ?? []
        } else {
          this.showSnackBarDialog(response.message)
        }
      })
  }

  private showSnackBarDialog = (message: string | undefined) => {
    let snackBarData: SnackbarData = {
      message: message ?? ""
    }

    this.dialogService.showSnackBar(snackBarData)
  }

  showOutLawReportDialog = (username?: string, commentReportedId?: number) => {
    if (!username) return

    let outLawReportDialogData: OutLawReportDialogData = {
      title: "Báo cáo người dùng vi phạm",
      description: "",
      buttonText: "Xác nhận",
      onAccept: () => {},
      usernameReported: username,
      commentReportedId: commentReportedId,
      outLawArea: this.commentBlockArea === CommentBlockArea.MANGA
        ? OutLawArea.MANGA_COMMENT
        : OutLawArea.CHAPTER_COMMENT
    }

    this.dialogService.showOutLawReportDialog(outLawReportDialogData)
  }
}
