import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RouteChapter, RouteManga} from "../../../../constant/constants";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss']
})
export class ChapterDetailComponent implements OnInit{
  private activatedRoute: ActivatedRoute

  listImage: Array<number> = [1, 2, 3, 4, 5]
  listComment: Array<number> = [1, 2, 3]

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get(RouteManga.Param))
    console.log(this.activatedRoute.snapshot.paramMap.get(RouteChapter.Param))
  }

  commentPaginationEvent = (pageEvent: PageEvent) => {
    console.log(pageEvent)
  }
}
