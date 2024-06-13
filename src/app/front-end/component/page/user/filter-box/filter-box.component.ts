import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {DataOrderBy, FilterSearchCheckBox, MangaStatus} from "../../../../constant/constants";
import {ApiResponseListGenre, Genre, GenreControllerService} from "../../../../bkmanga-svc";
import {FilterCheckData} from "../../../../interface/filter-check-data";
import {FilterData} from "../../../../interface/filter-data";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  formGroup: FormGroup
  filterListLabel: string
  listGenre: Array<Genre> = Array<Genre>()
  triggerReset: boolean = false

  @Output() getDataFilter: EventEmitter<FilterData> = new EventEmitter<FilterData>()

  protected readonly MangaStatus = MangaStatus

  constructor(
    formBuilder: FormBuilder,
    private genreControllerService: GenreControllerService
  ) {
    this.filterListLabel = 'Thể loại truyện'

    this.formGroup = formBuilder.group({
      listChooseGenres: [[]],
      listExceptGenres: [[]],
      mangaStatus: [MangaStatus.IN_PROCESS],
      orderManga: [DataOrderBy.DESC]
    })
  }

  ngOnInit(): void {
    this.genreControllerService.getAllGenre().subscribe((result: ApiResponseListGenre) => {
      if (result?.responseCode === StatusCodes.OK) {
        this.listGenre = result?.result ?? []
      }
    })
  }

  getFilterValue = () => {
    let filterData: FilterData = {
      listChooseGenres: this.formGroup.controls['listChooseGenres'].value,
      listExceptGenres: this.formGroup.controls['listExceptGenres'].value,
      mangaStatus: this.formGroup.controls['mangaStatus'].value,
      orderManga: this.formGroup.controls['orderManga'].value,
    }

    this.getDataFilter.emit(filterData)
  }

  setFilterCheckBoxValue = (exportFilterCheckData: FilterCheckData): void => {
    if (exportFilterCheckData.type === FilterSearchCheckBox.Choose) {
      this.formGroup.controls['listChooseGenres'].value.push(exportFilterCheckData.id)
      _.remove(this.formGroup.controls['listExceptGenres'].value, (element) => {
        return element === exportFilterCheckData.id
      })
    } else if (exportFilterCheckData.type === FilterSearchCheckBox.Except) {
      this.formGroup.controls['listExceptGenres'].value.push(exportFilterCheckData.id)
      _.remove(this.formGroup.controls['listChooseGenres'].value, (element) => {
        return element === exportFilterCheckData.id
      })
    } else {
      _.remove(this.formGroup.controls['listExceptGenres'].value, (element) => {
        return element === exportFilterCheckData.id
      })
      _.remove(this.formGroup.controls['listChooseGenres'].value, (element) => {
        return element === exportFilterCheckData.id
      })
    }
  }

  resetFilterBox = (): void => {
    _.remove(this.formGroup.controls['listExceptGenres'].value, (element) => true)
    _.remove(this.formGroup.controls['listChooseGenres'].value, (element) => true)
    this.triggerReset = !this.triggerReset

    this.getFilterValue()
  }
}
