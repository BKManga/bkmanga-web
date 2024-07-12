import {Component, OnInit} from '@angular/core';
import {
  ChapterComment,
  ChapterCommentControllerService, GetChapterCommentDetailRequestDTO, GetMangaCommentDetailRequestDTO,
  GetOutLawReportByIdRequestDTO, MangaComment, MangaCommentControllerService,
  OutLawReport,
  OutLawReportControllerService,
  UpdateOutLawReportRequestDTO
} from "../../../../../bkmanga-svc";
import {DialogService} from "../../../../../service/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouterAdmin, OutLawArea, OutLawType, RouteOutLawReport} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {ErrorDialogData} from "../../../../../interface/error-dialog-data";
import {SnackbarData} from "../../../../../interface/snackbar-data";

@Component({
  selector: 'app-out-law-report-detail',
  templateUrl: './out-law-report-detail.component.html',
  styleUrls: ['./out-law-report-detail.component.scss']
})
export class OutLawReportDetailComponent implements OnInit{

  private outLawReportId?: string
  outLawReport?: OutLawReport

  dataComment?: ChapterComment | MangaComment

  constructor(
    private outLawReportControllerService: OutLawReportControllerService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chapterCommentControllerService: ChapterCommentControllerService,
    private mangaCommentControllerService: MangaCommentControllerService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.outLawReportId = params[RouteOutLawReport.Param];
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getOutLawReportDetail()
  }

  private getOutLawReportDetail = async (): Promise<void> => {
    if (!this.outLawReportId) return

    let getOutLawReportByIdRequestDTO: GetOutLawReportByIdRequestDTO = {
      id: parseInt(this.outLawReportId),
    }

    this.outLawReportControllerService.getOutLawReportDetail(getOutLawReportByIdRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.outLawReport = response.result

          if (this.outLawReport?.outLawArea?.id === OutLawArea.CHAPTER_COMMENT) {
            this.getChapterComment(this.outLawReport.commentReported).then()
          } else if (this.outLawReport?.outLawType?.id === OutLawArea.MANGA_COMMENT) {
            this.getMangaComment(this.outLawReport.commentReported).then()
          }
        } else {
          let errorDialogData: ErrorDialogData = {
            title: response.errorCode ?? "",
            description: response.message ?? "",
            buttonText: "OK",
            onAccept: () => this.redirectToOutLawReportManagePage().then()
          }

          this.dialogService.showErrorDialog(errorDialogData)
        }
    })
  }

  private getChapterComment = async (chapterCommentId?: number): Promise<void> => {
    if (!chapterCommentId) return

    let getChapterCommentDetailRequestDTO: GetChapterCommentDetailRequestDTO = {
      chapterCommentId: chapterCommentId
    }

    this.chapterCommentControllerService.getChapterCommentDetail(getChapterCommentDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.dataComment = response.result
        } else {
          this.showSnackBar(response.message)
        }
    })
  }

  private getMangaComment = async (mangaCommentId?: number): Promise<void> => {
    if (!mangaCommentId) return

    let getMangaCommentDetailRequestDTO: GetMangaCommentDetailRequestDTO = {
      mangaCommentId: mangaCommentId
    }

    this.mangaCommentControllerService.getMangaCommentDetail(getMangaCommentDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.dataComment = response.result
        } else {
          this.showSnackBar(response.message)
        }
    })
  }

  updateOutLawReport = async (outLawReportProcessStatus: number): Promise<void> => {
    if (!this.outLawReportId) return

    let updateOutLawReportRequestDTO: UpdateOutLawReportRequestDTO = {
      outLawReportId: parseInt(this.outLawReportId),
      outLawReportProcessStatus: outLawReportProcessStatus
    }

    this.outLawReportControllerService.updateOutLawReport(updateOutLawReportRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          let errorDialogData: ErrorDialogData = {
            title: "Thành công",
            description: "Cập nhật dữ liệu thành công",
            buttonText: "OK",
            onAccept: () => {}
          }
          this.dialogService.showErrorDialog(errorDialogData)
        } else {
          this.showSnackBar(response.message)
        }
    })
  }

  private redirectToOutLawReportManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.OutLawReport])
  }

  private showSnackBar(message?: string) {
    let snackbarData: SnackbarData = {
      message: message ?? ""
    }

    this.dialogService.showSnackBar(snackbarData)
  }
}
