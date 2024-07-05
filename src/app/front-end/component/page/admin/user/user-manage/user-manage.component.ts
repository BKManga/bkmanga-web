import {Component, OnInit} from '@angular/core';
import {PaginatorData} from "../../../../../interface/paginator-data";
import {
  GetUserListRequestDTO,
  GetUserManagementResponseDTO,
  User,
  UserControllerService
} from "../../../../../bkmanga-svc";
import {PageEvent} from "@angular/material/paginator";
import {StatusCodes} from "http-status-codes";
import {DialogService} from "../../../../../service/dialog.service";
import {Router} from "@angular/router";
import {SnackbarData} from "../../../../../interface/snackbar-data";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit{
  dataSource: Array<GetUserManagementResponseDTO> = new Array<GetUserManagementResponseDTO>();
  displayedColumns: string[] = ['username', 'email', 'status', 'createdAt','action'];

  totalElementData: number

  private page: number
  private size: number

  paginatorData: PaginatorData

  constructor(
    private userControllerService: UserControllerService,
    private dialogService: DialogService,
    private router: Router,
  ) {
    this.paginatorData = {
      pageIndex: 0,
      pageSize: 10,
      pageSizeOptions: Array<number>(5, 10, 25, 100),
      showFirstLastButtons: true,
      hidePageSize: false,
    }

    this.page = this.paginatorData.pageIndex
    this.size = this.paginatorData.pageSize
    this.totalElementData = 0
  }

  paginationData = async ($event: PageEvent): Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getUserData()
  }

  private getUserData = async (): Promise<void> => {
    let getUserListRequestDTO: GetUserListRequestDTO = {
      page: this.page,
      size: this.size
    }

    this.userControllerService.getUserList(getUserListRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.dataSource = response.result?.content ?? []
          this.totalElementData = response.result?.totalElements ?? 0
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? "",
          }
          this.dialogService.showSnackBar(snackBarData)
        }
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getUserData()
  }
}
