import {Component, OnInit} from '@angular/core';
import {
  Author,
  AuthorControllerService,
  GetAuthorDetailRequestDTO,
  GetMangaByAuthorDTO,
  GetMangaResponseDTO,
  MangaControllerService
} from "../../../../bkmanga-svc";
import {ActivatedRoute} from "@angular/router";
import {RouteAuthor, RouteGenre} from "../../../../constant/constants";
import {DialogService} from "../../../../service/dialog.service";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit{

  authorId?: number

  labelPageAuthor: string

  author?: Author
  mangaFoundList: Array<GetMangaResponseDTO> = new Array<GetMangaResponseDTO>()
  totalElementData: number

  constructor(
    private mangaControllerService: MangaControllerService,
    private authorControllerService: AuthorControllerService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
  ) {
    this.labelPageAuthor = "label.author"
    this.totalElementData = 0
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (param) => {
      this.authorId = this.getAuthorId(param[RouteAuthor.Param])

      await this.getAuthorData()
      await this.getMangaByAuthor()
    })
  }

  private getAuthorData = async (): Promise<void> => {
    if (!this.authorId) return

    let getAuthorDetailRequestDTO: GetAuthorDetailRequestDTO = {
      authorId: this.authorId,
    }

    this.authorControllerService.getAuthorDetail(getAuthorDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.author = response.result
        } else {
          this.showSnackBar(response.message ?? "")
        }
    })
  }

  private getMangaByAuthor = async (): Promise<void> => {
    if (!this.authorId) return

    let getMangaByAuthorDTO: GetMangaByAuthorDTO = {
      authorId: this.authorId,
    }

    this.mangaControllerService.searchMangaByAuthor(getMangaByAuthorDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.mangaFoundList = response.result ?? []
          this.totalElementData = this.mangaFoundList.length
        } else {
          this.showSnackBar(response.message ?? "")
        }
    })
  }

  private getAuthorId = (authorIdParam: string) : number | undefined => {
    try {
      return parseInt(authorIdParam)
    } catch (e) {
      return undefined
    }
  }

  private showSnackBar = (message: string) => {
    let snackbarData: SnackbarData = {
      message: message
    }

    this.dialogService.showSnackBar(snackbarData)
  }
}
