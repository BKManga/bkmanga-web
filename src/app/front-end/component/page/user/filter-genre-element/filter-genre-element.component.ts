import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FilterCheckData} from "../../../../interface/filter-check-data";
import {FilterSearchCheckBox} from "../../../../constant/constants";

@Component({
  selector: 'app-filter-genre-element',
  templateUrl: './filter-genre-element.component.html',
  styleUrls: ['./filter-genre-element.component.scss']
})
export class FilterGenreElementComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() idGenre: number | undefined
  @Input() nameGenre: string | undefined
  @Input() triggerReset: boolean | undefined
  @ViewChild('filterGenreElement') private filterGenreElement: ElementRef
  @Output() exportValueListFilter: EventEmitter<FilterCheckData> = new EventEmitter<FilterCheckData>()

  constructor(
    filterGenreElement: ElementRef
  ) {
    this.filterGenreElement = filterGenreElement
  }

  private bindClickEvent = () : void => {
    this.filterGenreElement.nativeElement.addEventListener(
      'click',
      (event: MouseEvent) => this.setStateFilterGenreElement(),
    )
  }

  private setStateFilterGenreElement = () : void => {
    let genreElementClassList = this.filterGenreElement.nativeElement.classList
    let filterCheckData : FilterCheckData

    if (genreElementClassList.contains('icon-default')) {
      filterCheckData = {
        type: FilterSearchCheckBox.Choose,
        id: this.idGenre!
      }
      this.setClassValueToElement('icon-default', 'icon-tick')
    } else if (genreElementClassList.contains('icon-tick')) {
      filterCheckData = {
        type: FilterSearchCheckBox.Except,
        id: this.idGenre!
      }
      this.setClassValueToElement('icon-tick', 'icon-cross')
    } else {
      filterCheckData = {
        type: FilterSearchCheckBox.Blank,
        id: this.idGenre!
      }
      this.setClassValueToElement('icon-cross', 'icon-default')
    }

    this.exportValueListFilter.emit(filterCheckData)
  }

  private setClassValueToElement = (
    classRemove: string,
    classAdd: string,
  ) : void => {
    this.filterGenreElement.nativeElement.classList.remove(classRemove)
    this.filterGenreElement.nativeElement.classList.add(classAdd)
  }

  private resetClassValue = () : void => {
    this.filterGenreElement.nativeElement.classList.remove('icon-cross', 'icon-default', 'icon-tick')
    this.filterGenreElement.nativeElement.classList.add('icon-default')
  }

  ngAfterViewInit(): void {
    this.bindClickEvent()
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetClassValue()
  }
}
