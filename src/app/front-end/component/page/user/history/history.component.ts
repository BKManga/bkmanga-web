import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  labelPageHistory: string
  listMangaFound : Array<number> = []

  constructor() {
    this.labelPageHistory = 'label.history'
  }

  ngOnInit(): void {
    for (let i = 1; i < 15; i++) {
      this.listMangaFound.push(i)
    }
  }
}
