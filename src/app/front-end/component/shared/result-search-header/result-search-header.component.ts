import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AppRouter} from "../../../constant/constants";
import {GetMangaResponseDTO} from "../../../bkmanga-svc";

@Component({
  selector: 'app-result-search-header',
  templateUrl: './result-search-header.component.html',
  styleUrls: ['./result-search-header.component.scss']
})
export class ResultSearchHeaderComponent {

  @Input() mangaList: Array<GetMangaResponseDTO> = new Array<GetMangaResponseDTO>()
  @ViewChild('contentSearch') contentSearch: TemplateRef<any> | undefined
  @Output() resetSearching: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private router: Router
  ) {
  }

  selectItem = async (event: MouseEvent, id: number | undefined) : Promise<void> => {
    event.stopPropagation()

    if (!id) return
    // if (this.contentSearch) {
    //   this.contentSearch.elementRef.nativeElement.classList
    // }

    this.resetSearching.emit(true)

    await this.router.navigate([AppRouter.Main, AppRouter.MangaDetail, id])
  }
}
