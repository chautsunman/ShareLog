import {Component, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {Log} from '../log';
import {LogService} from '../log-service/log.service';

declare var google: any;

@Component({
  selector: 'log-detail',
  templateUrl: './log-detail.html',
  styleUrls: ['./log-detail.css']
})
export class LogDetailComponent implements OnInit {
  logId: string = '';
  log: Log = new Log();
  logDate: Date = null;
  map: any;
  mapMarker: any;

  // TODO: const
  titlePlaceholders = {
    activity: 'Activity name',
    food: 'Food'
  };

  // TODO: const
  detailPlaceholders = {
    activity: 'Activity detail',
    food: 'Detail'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private logService: LogService
  ) {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        // signed out
        router.navigateByUrl('/');
      }

      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.logId = this.route.snapshot.params['id'];

    if (firebase.auth().currentUser && this.logId) {
      this.logService.getLog(firebase.auth().currentUser.uid, this.logId)
          .then((log) => {
            this.log = new Log(this.logId, log.title, log.detail, log.type, log.money, log.recommend, log.rate, log.date, log.lat, log.lng);
            this.logDate = log.date ? new Date(log.date) : null;
            this.initializeMap({lat: log.lat, lng: log.lng});
          })
          .catch((error) => {
            console.log('LogDetail init error', error);
          })
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

  save(f: NgForm): void {
    console.log("save", f.value, f.valid);

    if (f.valid) {
      this.log.date = this.logDate ? this.logDate.getTime() : null;

      this.logService.saveLog(firebase.auth().currentUser.uid, this.log)
          .then(() => {
            this.router.navigateByUrl('/home');
          })
          .catch((error) => {
            console.log('LogDetail save error', error);
          });
    } else {
      alert('Invalid input.');
      return;
    }
  }
}
