import {Component, OnInit} from '@angular/core';
import { HistoryControllerService, HistoryResponse} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {DialogService} from "../../../../service/dialog.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{

  labelPageHistory: string

  historyResponseList: Array<HistoryResponse> = new Array<HistoryResponse>()
  totalElementData: number

  constructor(
    private historyControllerService: HistoryControllerService,
    private dialogService: DialogService,
  ) {
    this.labelPageHistory = 'label.history'
    this.totalElementData = 0
  }

  async ngOnInit(): Promise<void> {
    await this.getHistoryMangaData()
  }

  getHistoryMangaData = async (): Promise<void> => {
    this.historyControllerService.getListHistoryByUser().subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.historyResponseList = response.result?.historyResponseList ?? []
          this.totalElementData = this.historyResponseList.length
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
    })
  }
}
