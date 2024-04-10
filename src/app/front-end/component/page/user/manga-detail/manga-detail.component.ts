import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RouteManga} from "../../../../constant/constants";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})
export class MangaDetailComponent implements OnInit{

  private activatedRoute: ActivatedRoute

  listComment: Array<number> = [1, 2, 3]

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get(RouteManga.Param))
  }

  commentPaginationEvent = (pageEvent: PageEvent) => {
    console.log(pageEvent)
  }
}
