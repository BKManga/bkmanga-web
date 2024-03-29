import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaginatorData} from "../../../../interface/paginator-data";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-block-comment',
  templateUrl: './block-comment.component.html',
  styleUrls: ['./block-comment.component.scss']
})
export class BlockCommentComponent implements OnInit, AfterViewInit{
  formGroup: FormGroup

  toolTipDeleteComment: string = "delete.comment"

  paginatorData: PaginatorData = {
    pageIndex: 0,
    pageSize: 5,
    pageSizeOptions: Array<number>(5, 10, 25, 100),
    showFirstLastButtons: true,
    hidePageSize: true,
  }

  @Input() listComment: Array<number> = Array<number>()
  @Output() pagePaginationEmitEvent = new EventEmitter<PageEvent>()

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      comment: [""]
    })
  }

  ngOnInit(): void {
  }

  postComment = () => {
    console.log(this.formGroup.controls['comment'].value)
    this.formGroup.controls['comment'].reset()
  }

  paginationComment = (pageEvent: PageEvent) => {
    this.pagePaginationEmitEvent.emit(pageEvent)
  }

  ngAfterViewInit(): void {
  }
}
