import {Component, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';

import {Router} from '@angular/router';

import * as firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'new-log',
  templateUrl: './new-log.html',
  styleUrls: ['./new-log.css']
})
export class NewLogComponent implements OnInit {
  map: any;
  mapMarker: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 22.3964, lng: 114.1095},
      zoom: 10
    });

    this.mapMarker = new google.maps.Marker({
      position: {lat: 22.3964, lng: 114.1095},
      map: this.map
    });

    this.map.addListener('click', (e: any) => {
      this.mapMarker.setMap(null);

      this.mapMarker = new google.maps.Marker({
        position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
        map: this.map
      });
    });
  }

  add(f: NgForm): void {
    console.log("add", f.value, f.valid);

    if (f.valid) {
      firebase.database().ref('/log/'+firebase.auth().currentUser.uid)
          .push({
            title: f.value.title,
            detail: f.value.detail,
            money: f.value.money,
            recommend: f.value.recommend,
            rate: f.value.rate,
            lat: this.mapMarker.getPosition().lat(),
            lng: this.mapMarker.getPosition().lng()
          })
          .then(() => {
            console.log('added new log');

            this.router.navigateByUrl('/home');
          })
          .catch((error) => {
            console.log('add new log error', error);
          });
    } else {
      alert('Invalid input');
      return;
    }
  }
}
