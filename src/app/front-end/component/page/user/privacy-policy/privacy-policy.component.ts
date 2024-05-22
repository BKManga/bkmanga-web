import {Component, OnInit} from '@angular/core';
import {PrivacyPolicy, PrivacyPolicyControllerService} from "../../../../bkmanga-svc";

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
  ) {
    this.labelPagePrivacyPolicy = 'label.privacyPolicy'
  }

  async ngOnInit(): Promise<void> {
    await this.getPrivacyPolicyData()
  }

  private getPrivacyPolicyData = async () : Promise<void> => {
    this.privacyPolicyControllerService.getAllPrivacyPolicy().subscribe((response) => {
      if (response.responseCode === 200) {
        this.privacyPolicyList = response.result ?? []
      }
    })
  }
}
