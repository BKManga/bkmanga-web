import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {FilterCheckData} from "../../../../interface/filter-check-data";
import {FilterSearchCheckBox} from "../../../../constant/constants";
import {ApiResponseListGenre, Genre, GenreControllerService} from "../../../../bkmanga-svc";

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit, AfterViewInit{
  formGroup: FormGroup
  filterListLabel: string
  listGenre: Array<Genre> = Array<Genre>()
  triggerReset : boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private genreControllerService: GenreControllerService
  ) {
    this.filterListLabel = 'Thể loại truyện'

    this.formGroup = formBuilder.group({
      listChooseGenres: [[]],
      listExceptGenres: [[]],
      statusManga: ["male"],
      numberOfChapter: ["male"],
      orderManga: ["male"]
    })
  }

  ngOnInit(): void {
    this.genreControllerService.getAllGenre().subscribe((result: ApiResponseListGenre) => {
      if (result?.responseCode === 200) {
        this.listGenre = result?.result ?? []
      }
    })
  }

  getFilterValue = () => {
    console.log(this.formGroup.value)
  }

  setFilterCheckBoxValue = (exportFilterCheckData: FilterCheckData) : void => {
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

  resetFilterBox = () : void => {
    _.remove(this.formGroup.controls['listExceptGenres'].value, (element) => true)
    _.remove(this.formGroup.controls['listChooseGenres'].value, (element) => true)
    this.triggerReset = !this.triggerReset
  }

  ngAfterViewInit(): void {

  }
}
