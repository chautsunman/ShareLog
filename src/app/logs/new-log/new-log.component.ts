import {Component} from '@angular/core';

@Component({
  selector: 'new-log',
  templateUrl: './new-log.html',
  styleUrls: ['./new-log.css']
})
export class NewLogComponent {
  add(): void {
    console.log("add");

    // TODO: add a new log
  }
}
