import { Component } from '@angular/core';
import {DialogService} from "../service/dialog.service";
import {UserControllerService} from "../bkmanga-svc";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  private dialogService: DialogService

  private userControllerService: UserControllerService
  constructor(
    dialogService: DialogService,
    userControllerService: UserControllerService
  ) {
    this.dialogService = dialogService;
    this.userControllerService = userControllerService;
  }

  ngOnInit() {
    // this.userControllerService.test().subscribe((result) => {
    //   console.log(result)
    // })
  }
}
