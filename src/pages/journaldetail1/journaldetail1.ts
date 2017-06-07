import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnectBackend } from '../../providers/connect-backend';
/*
  Generated class for the Journaldetail1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journaldetail1',
  templateUrl: 'journaldetail1.html'
})
export class Journaldetail1Page {
  selectedJournal: any;
  location: any;
  latitude: number;
  longitude: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public connectBackend:ConnectBackend) {
    this.selectedJournal = this.navParams.get('selectedJournal');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Journaldetail1Page');
    this.connectBackend.closeLoading();
  }

  ionViewWillLeave(){
    this.connectBackend.loadingSnipper('Please wait');
  }

}
