import {Component, OnInit} from '@angular/core';
import {ErrorChapterReport, ErrorChapterReportControllerService} from "../../../../bkmanga-svc";
import {PaginatorData} from "../../../../interface/paginator-data";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-error-report-manage',
  templateUrl: './error-report-manage.component.html',
  styleUrls: ['./error-report-manage.component.scss']
})
export class ErrorReportManageComponent implements OnInit{
  dataSource: Array<ErrorChapterReport> = new Array<ErrorChapterReport>()
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']

  private page: number
  private size: number
  totalElementData: number

  paginatorData: PaginatorData

  constructor(
    private errorChapterReportControllerService: ErrorChapterReportControllerService
  ) {
    this.paginatorData = {
      pageIndex: 0,
      pageSize: 10,
      pageSizeOptions: Array<number>(5, 10, 25, 100),
      showFirstLastButtons: true,
      hidePageSize: false,
    }

    this.page = this.paginatorData.pageIndex
    this.size = this.paginatorData.pageSize
    this.totalElementData = 0
  }

  async ngOnInit(): Promise<void> {
    await this.getErrorReportData()
  }

  private getErrorReportData = async (): Promise<void> => {

  }

  paginationData = async ($event: PageEvent): Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getErrorReportData()
  }

}
