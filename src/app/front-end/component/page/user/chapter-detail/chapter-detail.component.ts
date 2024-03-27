import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RouteChapter, RouteManga} from "../../../../constant/constants";

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss']
})
export class ChapterDetailComponent implements OnInit{
  private activatedRoute: ActivatedRoute

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get(RouteManga.Param))
    console.log(this.activatedRoute.snapshot.paramMap.get(RouteChapter.Param))
  }
}
