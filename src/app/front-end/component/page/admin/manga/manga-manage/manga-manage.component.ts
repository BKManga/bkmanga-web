import {Component, OnInit, ViewChild} from '@angular/core';
import {
  GetMangaByNameRequestDTO,
  GetMangaRequestDTO,
  GetMangaResponseDTO,
  MangaControllerService
} from "../../../../../bkmanga-svc";
import {PaginatorData} from "../../../../../interface/paginator-data";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {StatusCodes} from "http-status-codes";
import {AppRouterAdmin, DataOrderBy, GetImage, MiddlePrefixHandleImage} from "../../../../../constant/constants";
import {environment} from "../../../../../../../environments/environment.development";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manga-manage',
  templateUrl: './manga-manage.component.html',
  styleUrls: ['./manga-manage.component.scss']
})

export class MangaManageComponent implements OnInit{
  dataSource: Array<GetMangaResponseDTO> = []
  displayedColumns: string[] = ['name', 'logo', 'created_at', 'action']
  fromGroup: FormGroup
  placeHolder: string

  totalElementData: number

  @ViewChild('paginator') paginator?: MatPaginator

  private page: number
  private size: number

  paginatorData: PaginatorData

  constructor(
    private mangaControllerService: MangaControllerService,
    formBuilder: FormBuilder,
    private router: Router,
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

    this.placeHolder = "Nhập tên truyện"
  }

  private getMangaData = async (): Promise<void> => {

    let getMangaRequestDTO: GetMangaRequestDTO = {
      page: this.page,
      size: this.size
    }

    this.mangaControllerService.getMangaList(getMangaRequestDTO).subscribe(
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
    if (this.fromGroup.controls['search'].value.trim()) {
      this.searchManga(this.page, this.size)
    } else {
      await this.getMangaData()
    }

  }

  async ngOnInit(): Promise<void> {
    await this.getMangaData()
  }

  searchManga = (page: number, size: number, isPressEnter: boolean = false) => {

    let valueSearch = this.fromGroup.controls['search'].value.trim()

    if (!valueSearch) {
      this.getMangaData().then()
      return
    }

    if (isPressEnter) this.paginator?.firstPage()

    let getMangaByNameRequestDTO: GetMangaByNameRequestDTO = {
      name: valueSearch,
      otherName: valueSearch,
      page: page,
      size: size,
      orderBy: DataOrderBy.ASC,
    }

    this.mangaControllerService.searchMangaByName(getMangaByNameRequestDTO).subscribe(
      (response) => {
        this.dataSource = response.result?.content ?? []
        this.totalElementData = response.result?.totalElements ?? 0
    })
  }

  redirectToAddMangaPage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Manga, AppRouterAdmin.Add])
  }

  redirectToDetailMangaPage = async (mangaId?: number): Promise<void> => {
    if (!mangaId) return

    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Manga, AppRouterAdmin.Detail, mangaId])
  }

  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;


}
