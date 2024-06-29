import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorControllerService, CreateAuthorRequestDTO} from "../../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {DialogService} from "../../../../../service/dialog.service";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import {Router} from "@angular/router";
import {AppRouterAdmin} from "../../../../../constant/constants";

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.scss']
})
export class AuthorAddComponent {

  formGroup: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private authorControllerService: AuthorControllerService,
    private dialogService: DialogService,
    private router: Router,
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
    })
  }

  createAuthor = () => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let createAuthorRequestDTO: CreateAuthorRequestDTO = {
      name : this.formGroup.value.name.trim().toLocaleLowerCase(),
    }

    this.authorControllerService.createAuthor(createAuthorRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Author]).then()
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
    })
  }
}
