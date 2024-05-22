import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent {
  @Input() mangaList: Array<number> = Array<number>()
}
