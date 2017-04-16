import {Component, Input} from '@angular/core';

import {Log} from '../log';

@Component({
  selector: 'log-card',
  templateUrl: './log-card.html',
  styleUrls: ['./log-card.css']
})
export class LogCardComponent {
  @Input() id: string;
  @Input() log: Log;
}
