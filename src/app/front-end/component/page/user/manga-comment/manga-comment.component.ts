import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-manga-comment',
  templateUrl: './manga-comment.component.html',
  styleUrls: ['./manga-comment.component.scss']
})
export class MangaCommentComponent implements OnInit, AfterViewInit{
  formGroup: FormGroup
  showFirstLastButtons: boolean = true
  hidePageSize: boolean = false
  length: BehaviorSubject<number> = new BehaviorSubject<number>(5)
  pageSize: number = 5
  pageSizeOptions: Array<number> = [5, 10, 25, 100]
  listComment: Array<number> = []

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      comment: [""]
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < this.length.getValue(); i++) {
      this.listComment.push(i)
    }
  }

  postComment = () => {
    console.log(this.formGroup.controls['comment'].value)
    this.formGroup.controls['comment'].reset()
  }

  paginationComment = (pageEvent: PageEvent) => {
    this.length.next(pageEvent.pageSize)

    this.listComment = []

    for (let i = 0; i < this.length.getValue(); i++) {
      this.listComment.push(i)
    }
  }

  ngAfterViewInit(): void {
  }
}
