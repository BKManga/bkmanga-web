import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  AuthorControllerService,
  GetAuthorDetailRequestDTO,
  UpdateAuthorRequestDTO,
} from "../../../../../bkmanga-svc";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouterAdmin, RouteAuthor} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import {DialogService} from "../../../../../service/dialog.service";

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit{

  formGroup: FormGroup

  authorId?: string

  constructor(
    formBuilder: FormBuilder,
    private authorControllerService: AuthorControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
    })

    this.activatedRoute.params.subscribe(async (param) => {
      this.authorId = param[RouteAuthor.Param]
    })
  }

  updateAuthor = () => {
    if (!this.formGroup.valid) {
      this.formGroup.markAsTouched()
      return
    }

    if (!this.authorId) return

    let updateAuthorRequestDTO: UpdateAuthorRequestDTO = {
      authorId: parseInt(this.authorId),
      name : this.formGroup.value.name.trim().toLocaleLowerCase(),
    }

    this.authorControllerService.updateAuthor(updateAuthorRequestDTO).subscribe(
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

  async ngOnInit(): Promise<void> {
    await this.getAuthorData()
  }

  private getAuthorData = async (): Promise<void> => {
    if (!this.authorId) return

    let getAuthorDetailRequestDTO: GetAuthorDetailRequestDTO = {
      authorId: parseInt(this.authorId)
    }

    this.authorControllerService.getAuthorDetail(getAuthorDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.formGroup.setValue({
            name: response.result?.name ?? "",
          })
        }
    })
  }
}
