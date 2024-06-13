import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-label-page',
  templateUrl: './label-page.component.html',
  styleUrls: ['./label-page.component.scss']
})
export class LabelPageComponent {
  @Input() labelPage: string = 'Label Page'
  @Input() paramLabel?: string
}
