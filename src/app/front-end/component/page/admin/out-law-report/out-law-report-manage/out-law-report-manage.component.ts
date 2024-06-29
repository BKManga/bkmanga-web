import {Component, OnInit} from '@angular/core';
import {PaginatorData} from "../../../../../interface/paginator-data";
import {GetListOutLawReportRequestDTO, OutLawReport, OutLawReportControllerService} from "../../../../../bkmanga-svc";
import {PageEvent} from "@angular/material/paginator";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-out-law-report-report-manage',
  templateUrl: './out-law-report-manage.component.html',
  styleUrls: ['./out-law-report-manage.component.scss']
})
export class OutLawReportManageComponent implements OnInit{
  dataSource: Array<OutLawReport> = new Array<OutLawReport>()
  displayedColumns: string[] = ['id', 'description', 'uploadedBy','status', 'createdAt', 'action']

  totalElementData: number

  private page: number
  private size: number

  paginatorData: PaginatorData

  constructor(
    private outLawReportControllerService: OutLawReportControllerService
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
    await this.getOutLawData()
  }

  private getOutLawData = async (): Promise<void> => {
    let getListOutLawReportRequestDTO: GetListOutLawReportRequestDTO = {
      page: this.page,
      size: this.size
    }
    this.outLawReportControllerService.getOutLawReport(getListOutLawReportRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.dataSource = response.result?.content ?? []
          this.totalElementData = response.result?.totalElements ?? 0
        }
    })
  }

  paginationData = async ($event: PageEvent): Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getOutLawData()
  }

}
