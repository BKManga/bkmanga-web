import {Component, OnInit, ViewChild} from '@angular/core';
import {
  Author,
  AuthorControllerService, GetListAuthorByNameDTO,
  GetListAuthorRequestDTO,
} from "../../../../../bkmanga-svc";
import {PaginatorData} from "../../../../../interface/paginator-data";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AppRouterAdmin, DataOrderBy} from "../../../../../constant/constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DialogService} from "../../../../../service/dialog.service";

@Component({
  selector: 'app-author-manage',
  templateUrl: './author-manage.component.html',
  styleUrls: ['./author-manage.component.scss']
})
export class AuthorManageComponent implements OnInit{
  dataSource: Array<Author> = new Array<Author>()
  displayedColumns: string[] = ['id', 'name', 'action']
  placeHolder: string

  fromGroup: FormGroup

  private page: number
  private size: number
  totalElementData: number

  paginatorData: PaginatorData

  @ViewChild('paginator') paginator?: MatPaginator

  constructor(
    private authorControllerService: AuthorControllerService,
    formBuilder: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
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

    this.fromGroup = formBuilder.group({
      search: [""]
    })

    this.placeHolder = "Nhập tên tác giả"
  }

  private getAuthorData = async (): Promise<void> => {
    let getListAuthorRequestDTO: GetListAuthorRequestDTO = {
      page: this.page,
      size: this.size
    }

    this.authorControllerService.getListAuthor(getListAuthorRequestDTO).subscribe(
      (response) => {
        this.dataSource = response.result?.content ?? []
        this.totalElementData = response.result?.totalElements ?? 0
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getAuthorData()
  }

  paginationData = async ($event: PageEvent): Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize

    if (this.fromGroup.controls['search'].value.trim()) {
      this.searchAuthor(this.page, this.size)
    } else {
      await this.getAuthorData()
    }
  }

  searchAuthor = (page: number, size: number, isPressEnter: boolean = false) => {

    let valueSearch = this.fromGroup.controls['search'].value.trim()

    if (!valueSearch) {
      this.getAuthorData().then()
      return
    }

    if (isPressEnter) this.paginator?.firstPage()

    let getListAuthorByName: GetListAuthorByNameDTO = {
      name: valueSearch,
      page: page,
      size: size,
    }

    this.authorControllerService.getAuthorListByName(getListAuthorByName).subscribe(
      (response) => {
        this.dataSource = response.result?.content ?? []
        this.totalElementData = response.result?.totalElements ?? 0
      })
  }

  redirectToAuthorAddPage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Author, AppRouterAdmin.Add])
  }

  redirectToAuthorDetailPage = async (authorId?: number): Promise<void> => {
    if (!authorId) return

    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Author, AppRouterAdmin.Detail, authorId])
  }
}
