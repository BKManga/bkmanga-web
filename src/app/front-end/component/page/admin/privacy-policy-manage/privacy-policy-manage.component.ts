import {Component, OnInit} from '@angular/core';
import {PrivacyPolicy, PrivacyPolicyControllerService} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-privacy-policy-manage',
  templateUrl: './privacy-policy-manage.component.html',
  styleUrls: ['./privacy-policy-manage.component.scss']
})
export class PrivacyPolicyManageComponent implements OnInit{
  dataSource: Array<PrivacyPolicy> = [];
  displayedColumns: string[] = ['id', 'question', 'answer', 'action'];

  constructor(
    private privacyPolicyControllerService: PrivacyPolicyControllerService
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
}
