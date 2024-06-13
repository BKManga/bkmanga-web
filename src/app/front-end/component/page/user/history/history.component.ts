import {Component, OnInit} from '@angular/core';
import {GetListHistoryRequestDTO, HistoryControllerService, HistoryResponse} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{

  labelPageHistory: string
  historyResponseList: Array<HistoryResponse> = new Array<HistoryResponse>()

  constructor(
    private historyControllerService: HistoryControllerService
  ) {
    this.labelPageHistory = 'label.history'
  }

  ngOnInit(): void {

  }

  getHistoryMangaData = async (): Promise<void> => {
    let getListHistoryRequestDTO: GetListHistoryRequestDTO = {
      userId: 1
    }

    this.historyControllerService.getAllHistoryByUser(getListHistoryRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.historyResponseList = response.result?.historyResponseList ?? []
        }
    })
  }
}
