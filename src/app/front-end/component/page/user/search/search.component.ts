import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  labelPageSearch: string
  listMangaFound : Array<number> = []

  constructor() {
    this.labelPageSearch = 'label.search'
  }

  ngOnInit(): void {
    for (let i = 1; i < 15; i++) {
      this.listMangaFound.push(i)
    }
  }
}
