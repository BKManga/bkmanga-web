import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit{
  listChapter: Array<number> = []

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.listChapter.push(i)
    }
  }
}
