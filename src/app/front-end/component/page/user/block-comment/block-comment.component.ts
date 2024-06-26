import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaginatorData} from "../../../../interface/paginator-data";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  ChapterComment,
  ChapterCommentControllerService,
  DeleteChapterCommentRequestDTO,
  DeleteMangaCommentRequestDTO, GetListChapterCommentRequestDTO,
  GetListMangaCommentRequestDTO,
  MangaComment,
  MangaCommentControllerService,
} from "../../../../bkmanga-svc";
import {CommentBlockArea, DataOrderBy, RouteChapter, RouteManga} from "../../../../constant/constants";
import {ActivatedRoute} from "@angular/router";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {DialogService} from "../../../../service/dialog.service";
import {JwtDecodeService} from "../../../../service/jwt-decode.service";

@Component({
  selector: 'app-block-comment',
  templateUrl: './block-comment.component.html',
  styleUrls: ['./block-comment.component.scss']
})
export class BlockCommentComponent implements OnInit, AfterViewInit{

  formGroup: FormGroup

  toolTipDeleteComment: string = "delete.comment"

  paginatorData: PaginatorData = {
    pageIndex: 0,
    pageSize: 5,
    pageSizeOptions: Array<number>(5, 10, 25, 100),
    showFirstLastButtons: true,
    hidePageSize: true,
  }

  totalComment: number = 0
  dataOrderBy = DataOrderBy.ASC
  id: number = 0

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
  ) {
    this.formGroup = formBuilder.group({
      comment: [""]
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
    console.log(this.formGroup.controls['comment'].value)
    this.formGroup.controls['comment'].reset()
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
}
