import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouter, CommentBlockArea, RouteManga} from "../../../../constant/constants";
import {
  ChapterControllerService,
  GetMangaRequestDTO,
  GetMangaResponseDTO,
  MangaControllerService
} from "../../../../bkmanga-svc";
import {parseInt} from "lodash";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})
export class MangaDetailComponent implements OnInit{

  private idManga ?: string
  private getMangaRequestDTO ?: GetMangaRequestDTO

  manga?: GetMangaResponseDTO

  readonly commentBlockArea: string = CommentBlockArea.MANGA

  constructor(
    private activatedRoute: ActivatedRoute,
    private mangaControllerService: MangaControllerService,
    private chapterControllerService: ChapterControllerService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (param) => {
      this.idManga = param[RouteManga.Param]

      if (this.idManga && parseInt(this.idManga)) {
        this.getMangaRequestDTO = {
          mangaId: parseInt(this.idManga),
        }

        await this.getMangaData(this.getMangaRequestDTO)
      }
    });
  }

  private getMangaData = async (getMangaRequestDTO: GetMangaRequestDTO) : Promise<void> => {
    this.mangaControllerService.getMangaDetail(getMangaRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.manga = response.result
        }
    })
  }

  redirectToGenrePage = async (idGenre: number | undefined) : Promise<void> => {
    if (!idGenre) return
    await this.router.navigate([AppRouter.Main, AppRouter.Genre, idGenre])
  }
}
