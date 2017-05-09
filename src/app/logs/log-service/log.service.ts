import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

import {Log} from '../log';

@Injectable()
export class LogService {
  // TODO: return Promise<Log[]>
  getLogs(uid: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.database().ref('/log/'+uid)
          .once('value')
          .then((logsSnapshot) => {
            console.log('logs snapshot', logsSnapshot.val());

            resolve(logsSnapshot.val());
          })
          .catch((error) => {
            console.log('LogService getLogs error', error);
          });
    });
  }

  // TODO: return Promise<Log>
  getLog(uid: string, logId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.database().ref('/log/'+uid+'/'+logId)
          .once('value')
          .then((logSnapshot) => {
            console.log('log snapshot', logSnapshot.val());

            resolve(logSnapshot.val());
          })
          .catch((error) => {
            console.log('LogService getLog error', error);
          })
    });
  }

  saveLog(uid: string, logId: string, log: Log): Promise<any> {
    let logRef = firebase.database().ref('/log/'+uid);
    if (logId) {
      logRef = logRef.child(logId);
    } else {
      logRef = logRef.push();
    }

    return new Promise<any>((resolve, reject) => {
      logRef.update(log)
          .then(() => {
            console.log('saved log');

            resolve();
          })
          .catch((error) => {
            console.log('LogService saveLog error', error);
          });
    });
  }
}
