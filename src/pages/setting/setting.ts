import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConnectBackend } from '../../providers/connect-backend';

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  selectedProject: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public connectBackend: ConnectBackend) {
    this.selectedProject = this.navParams.get('selectedProject');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ionViewWillEnter() {
    this.connectBackend.closeLoading();
  }

}
