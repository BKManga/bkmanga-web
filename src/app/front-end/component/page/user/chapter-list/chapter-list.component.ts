import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppRouter} from "../../../../constant/constants";
import {Chapter} from "../../../../bkmanga-svc";

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit{
  @Input() listChapter: Array<Chapter> = new Array<Chapter>()

  constructor(
    private router : Router
  ) {}

  ngOnInit(): void {}

  redirectToChapterDetail = async (idChapter: number | undefined) : Promise<void> => {
    if (!idChapter) return

    await this.router.navigate([
      AppRouter.Main,
      AppRouter.MangaDetail,
      idChapter,
      AppRouter.ChapterDetail,
      idChapter
    ])
  }
}
