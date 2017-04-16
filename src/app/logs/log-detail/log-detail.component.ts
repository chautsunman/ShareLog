import {Component, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {Log} from '../log';

import * as firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'log-detail',
  templateUrl: './log-detail.html',
  styleUrls: ['./log-detail.css']
})
export class LogDetailComponent implements OnInit {
  logId: string = '';
  log: Log = new Log();
  map: any;
  mapMarker: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        // signed out
        router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {
    this.logId = this.route.snapshot.params['id'];

    if (this.logId) {
      firebase.database().ref('/log/'+firebase.auth().currentUser.uid+'/'+this.logId).once('value')
          .then((snapshot) => {
            console.log('log snapshot', snapshot.val());

            let log = snapshot.val();

            this.log = new Log(log.title, log.detail, log.money, log.recommend, log.rate, log.lat, log.lng);
            this.initializeMap({lat: log.lat, lng: log.lng});
          })
          .catch((error) => {
            console.log('get log detail error', error);
          });
    } else {
      this.initializeMap({lat: this.log.lat, lng: this.log.lng});
    }
  }

  initializeMap(latLng: any): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 10
    });

    this.mapMarker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });

    this.map.addListener('click', (e: any) => {
      this.mapMarker.setMap(null);

      this.log.lat = e.latLng.lat();
      this.log.lng = e.latLng.lng();

      this.mapMarker = new google.maps.Marker({
        position: {lat: this.log.lat, lng: this.log.lng},
        map: this.map
      });
    });
  }

  save(f: NgForm, logId: string): void {
    console.log("save", f.value, f.valid);

    if (f.valid) {
      let logRef = firebase.database().ref('/log/'+firebase.auth().currentUser.uid);
      if (logId) {
        logRef = logRef.child(logId);
      } else {
        logRef = logRef.push();
      }

      logRef.update(this.log)
          .then(() => {
            console.log('saved log');

            this.router.navigateByUrl('/home');
          })
          .catch((error) => {
            console.log('save log error', error);
          });
    } else {
      alert('Invalid input.');
      return;
    }
  }
}
