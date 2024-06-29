import {Component, OnInit} from '@angular/core';
import {PaginatorData} from "../../../../interface/paginator-data";
import {OutLawReportControllerService} from "../../../../bkmanga-svc";
import {PageEvent} from "@angular/material/paginator";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-out-law-report-manage',
  templateUrl: './out-law-report-manage.component.html',
  styleUrls: ['./out-law-report-manage.component.scss']
})
export class OutLawReportManageComponent implements OnInit{
  dataSource: PeriodicElement[] = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

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

  }

  paginationData = async ($event: PageEvent): Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getOutLawData()
  }

}
