import { Component } from '@angular/core';
import {MangaControllerService} from "../../../../bkmanga-svc";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {

  constructor(
    private mangaControllerService: MangaControllerService
  ) {

  }

  private getMangaByAuthor = async (): Promise<void> => {
    // this.mangaControllerService.
  }
}
