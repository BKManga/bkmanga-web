import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RouteManga} from "../../../../constant/constants";

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})
export class MangaDetailComponent implements OnInit{

  private activatedRoute: ActivatedRoute

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get(RouteManga.Param))
  }
}
