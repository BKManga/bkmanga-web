import {Component, OnInit} from '@angular/core';
import {PrivacyPolicy, PrivacyPolicyControllerService} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {DialogService} from "../../../../service/dialog.service";
import {ScrollPageService} from "../../../../service/scroll-page.service";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit{

  privacyPolicyList : Array<PrivacyPolicy> = []
  labelPagePrivacyPolicy: string

  constructor(
    private privacyPolicyControllerService: PrivacyPolicyControllerService,
    private dialogService: DialogService,
    private scrollPageService: ScrollPageService,
  ) {
    this.labelPagePrivacyPolicy = 'label.privacyPolicy'
  }

  async ngOnInit(): Promise<void> {
    this.scrollPageService.scrollTopPage()
    await this.getPrivacyPolicyData()
  }

  private getPrivacyPolicyData = async () : Promise<void> => {
    this.privacyPolicyControllerService.getAllPrivacyPolicy().subscribe((response) => {
      if (response.responseCode === StatusCodes.OK) {
        this.privacyPolicyList = response.result ?? []
      } else {
        let snackBarData: SnackbarData = {
          message: response.message ?? ""
        }

        this.dialogService.showSnackBar(snackBarData)
      }
    })
  }
}
