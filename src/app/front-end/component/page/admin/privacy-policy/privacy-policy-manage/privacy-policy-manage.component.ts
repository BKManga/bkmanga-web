import {Component, OnInit} from '@angular/core';
import {DeletePrivacyPolicyRequestDTO, PrivacyPolicy, PrivacyPolicyControllerService} from "../../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {Router} from "@angular/router";
import {AppRouterAdmin} from "../../../../../constant/constants";
import {DialogService} from "../../../../../service/dialog.service";
import {SnackbarData} from "../../../../../interface/snackbar-data";

@Component({
  selector: 'app-privacy-policy-manage',
  templateUrl: './privacy-policy-manage.component.html',
  styleUrls: ['./privacy-policy-manage.component.scss']
})
export class PrivacyPolicyManageComponent implements OnInit{
  dataSource: Array<PrivacyPolicy> = [];
  displayedColumns: string[] = ['id', 'question', 'answer', 'action'];

  constructor(
    private privacyPolicyControllerService: PrivacyPolicyControllerService,
    private router: Router,
    private dialogService: DialogService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.getPrivacyPolicyData()
  }

  private getPrivacyPolicyData = async (): Promise<void> => {
    this.privacyPolicyControllerService.getAllPrivacyPolicy().subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.dataSource = response.result ?? []
        }
    })
  }

  redirectToAddPrivacyPolicyPage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.PrivacyPolicy, AppRouterAdmin.Add])
  }

  redirectToPrivacyPolicyDetailPage = async (privacyPolicyId?: number): Promise<void> => {
    await this.router.navigate([
      AppRouterAdmin.Admin,
      AppRouterAdmin.PrivacyPolicy,
      AppRouterAdmin.Detail,
      privacyPolicyId
    ])
  }

  private deletePrivacyPolicy = async (privacyPolicyId: number): Promise<void> => {
    let deletePrivacyPolicyRequestDTO: DeletePrivacyPolicyRequestDTO = {
      privacyPolicyId: privacyPolicyId
    }

    this.privacyPolicyControllerService.deletePrivacyPolicy(deletePrivacyPolicyRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.getPrivacyPolicyData()
        }

        let snackBarData: SnackbarData = {
          message: response.message ?? ""
        }
        this.dialogService.showSnackBar(snackBarData)
    })
  }
}
