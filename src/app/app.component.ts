import { Component } from '@angular/core';

@Component({
  selector: 'sharelog-app',
  template: `
    <app-bar></app-bar>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

}
