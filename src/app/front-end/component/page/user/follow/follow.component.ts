import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit{
  labelPageFollow: string
  listMangaFound : Array<number> = []

  constructor() {
    this.labelPageFollow = 'label.follow'
  }

  ngOnInit(): void {
    for (let i = 1; i <= 15; i++) {
      this.listMangaFound.push(i)
    }
  }
}
