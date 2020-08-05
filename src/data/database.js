import Realm from 'realm';
import {UserSchema, TrackSchema, CoordinatesSchema} from './schemas';

class AppDatabase {
  instance = null;
  store = {};

  constructor() {
    Realm.open({
      schema: [UserSchema, TrackSchema, CoordinatesSchema],
      schemaVersion: 0,
    })
      .then((realm) => {
        console.log('realm connected');
        this.instance = realm;
        const user = this.instance.objects('User')[0];

        if (!user) {
          this.write(() => {
            this.create('User', {});
          });
        }

        this.store = this.instance.objects('User');
      })
      .catch((e) => {
        console.warn('realm error', e);
      });
  }

  write = (cb) => {
    this.instance.write(cb);
  };

  create = (name, params) => {
    return this.instance.create(name, params);
  };

  get = () => {
    return this.store[0];
  };
}

export default new AppDatabase();
