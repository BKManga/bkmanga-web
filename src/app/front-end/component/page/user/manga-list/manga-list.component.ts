import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {GetMangaResponseDTO, HistoryResponse} from "../../../../bkmanga-svc";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PaginatorData} from "../../../../interface/paginator-data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent implements OnInit, OnChanges{

  @Input() mangaList: Array<GetMangaResponseDTO> | Array<HistoryResponse> = []
  @Input() totalElement?: number
  @Input() showPaginator?: boolean
  @Output() getPaginatorData: EventEmitter<PageEvent> = new EventEmitter<PageEvent>()

  @ViewChild('paginator') paginator?: MatPaginator

  paginatorData: PaginatorData

  constructor(
    private router: Router
  ) {
    this.paginatorData = {
      pageIndex: 0,
      pageSize: 10,
      pageSizeOptions: Array<number>(10, 25, 50),
      showFirstLastButtons: true,
      hidePageSize: true,
    }
  }

  paginationManga = (pageEvent: PageEvent) => {
    this.getPaginatorData.emit(pageEvent)
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['totalElement']) {
      this.resetPaginationData()
    }
  }

  private resetPaginationData = () => {
    this.paginator?.firstPage()
  }
}
