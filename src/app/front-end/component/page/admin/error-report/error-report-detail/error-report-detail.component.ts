import {Component, OnInit} from '@angular/core';
import {
  ErrorChapterReport,
  ErrorChapterReportControllerService,
  GetErrorChapterReportByIdRequestDTO, UpdateErrorChapterReportRequestDTO
} from "../../../../../bkmanga-svc";
import {DialogService} from "../../../../../service/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouterAdmin, RouteErrorReport, RouteOutLawReport} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {ErrorDialogData} from "../../../../../interface/error-dialog-data";
import {SnackbarData} from "../../../../../interface/snackbar-data";

@Component({
  selector: 'app-error-report-detail',
  templateUrl: './error-report-detail.component.html',
  styleUrls: ['./error-report-detail.component.scss']
})
export class ErrorReportDetailComponent implements OnInit{

  private errorReportId?: string
  errorReportData?: ErrorChapterReport

  constructor(
    private errorChapterReportControllerService: ErrorChapterReportControllerService,
    private dialogService: DialogService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activeRoute.params.subscribe(params => {
      this.errorReportId = params[RouteErrorReport.Param];
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getErrorReportDetail()
  }

  private getErrorReportDetail = async (): Promise<void> => {
    if (!this.errorReportId) return

    let getErrorChapterReportByIdRequestDTO: GetErrorChapterReportByIdRequestDTO = {
      idErrorChapterReport: parseInt(this.errorReportId)
    }

    this.errorChapterReportControllerService.getErrorChapterReportDetail(getErrorChapterReportByIdRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.errorReportData = response.result
        } else {
          let errorDialogData: ErrorDialogData = {
            title: response.errorCode ?? "",
            description: response.message ?? "",
            buttonText: "OK",
            onAccept: () => this.redirectToErrorReportManagePage().then()
          }
          this.dialogService.showErrorDialog(errorDialogData)
        }
    })
  }

  updateErrorReport = async (errorReportStatus: number): Promise<void> => {
    if (!this.errorReportId) return

    let updateErrorChapterReportRequestDTO: UpdateErrorChapterReportRequestDTO = {
      errorChapterReportId: parseInt(this.errorReportId),
      errorReportStatusId: errorReportStatus
    }

    this.errorChapterReportControllerService.updateChapterReport(updateErrorChapterReportRequestDTO).subscribe(
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
          let snackbarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackbarData)
        }
    })
  }

  private redirectToErrorReportManagePage = async () => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.ErrorReport])
  }
}
