import {Component, OnInit} from '@angular/core';
import {
  FollowControllerService,
  GetListFollowRequestDTO,
  GetMangaResponseDTO,
  MangaControllerService
} from "../../../../bkmanga-svc";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit{
  labelPageFollow: string

  private page: number
  private size: number

  listMangaFound: Array<GetMangaResponseDTO> = []
  totalElementData: number

  constructor(
    private followControllerService: FollowControllerService
  ) {
    this.labelPageFollow = 'label.follow'
    this.page = 0
    this.size = 10
    this.totalElementData = 0
  }

  async ngOnInit(): Promise<void> {
    await this.getFollowMangaListData()
  }

  private getFollowMangaListData = async (): Promise<void> => {
    let getListFollowRequestDTO: GetListFollowRequestDTO = {
      page: this.page,
      size: this.size
    }

    this.followControllerService.getListFollow(getListFollowRequestDTO).subscribe(
      (response) => {
        this.listMangaFound = response?.result?.content ?? []
        this.totalElementData = response.result?.totalElements ?? 0
    })
  }

  setPaginatorData = async ($event: PageEvent) : Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getFollowMangaListData()
  }
}
