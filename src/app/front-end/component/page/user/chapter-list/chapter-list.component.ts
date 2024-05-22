import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppRouter} from "../../../../constant/constants";

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit{
  listChapter: Array<number> = []

  constructor(
    private router : Router
  ) {}

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.listChapter.push(i)
    }
  }

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
