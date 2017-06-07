import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { ConnectBackend } from '../../providers/connect-backend';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';
/*
  Generated class for the CreateJournal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-journal',
  templateUrl: 'create-journal.html'
})
export class CreateJournalPage {
  latitude: number;
  longitude: number;
  location: string;
  user: any;
  project: any;
  index: any;
  journal: any;
  status: any;
  projects: any;
  willCreateJournal: any;
  connectSubscription1: Subscription;
  disconnectSubscription: Subscription;
//  createJournalModel: {name?: string, description?: string} = {};
  description: string;
  constructor(public events:Events, public storage:Storage, private network: Network, public navCtrl: NavController, public navParams: NavParams, public connectBackend: ConnectBackend) {

    this.user = this.navParams.get('user');
    console.log(this.user);
    this.project = this.navParams.get('project');
    this.status = this.network.type;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateJournalPage');
  }

  ionViewWillEnter() {
    this.connectSubscription1 = this.network.onConnect().subscribe(() => {
        //alert("Network Connected");
        this.status = this.network.type;
        // this.connectBackend.createJournal(this.willCreateJournal).subscribe(_data => {
        //   if(_data.status == true){
        //     //this.connectBackend.presentAlert('Success!', _data.message);
        //     this.navCtrl.pop();
        //   }
        // });
      })

      this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.status = 'none';
        // this.storage.get('index').then((val)=>{
        //   this.index = val;
        //   alert("value is " + val);
        //   if(this.index == null){
        //     this.index = 0;
        //     this.storage.set('index', this.index);
        //   }
        //   else{
        //     this.index = this.index + 1;
        //     this.storage.set('index', this.index);
        //   }
        //   this.journal = 'journal' + this.index;
        // console.log("this.journal", this.journal);
        //   this.storage.set(this.journal, this.willCreateJournal);
        // this.navCtrl.pop();
        // });
      })

      this.events.publish('status', this.status);
    Geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log("this.latitude", this.latitude);
    }).catch((_error) => {
      console.log('Error getting location', _error.message);
    });
  }

  ionViewWillLeave(){
    this.connectSubscription1.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

  createJournal(){
    console.log("this.latitude2323", this.latitude);
    if(!this.latitude){
      Geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log("this.latitude1",this.latitude);
      }).catch((_error) => {
        console.log('Error getting location', _error.message);
      });
    }

    this.willCreateJournal = {
      user_id:      this.user,
      project_id:   this.project.id,
//      name:         this.createJournalModel.name,
      location:     '' + this.latitude + ',' + this.longitude,
//      description:  this.createJournalModel.description
      description:  this.description
    };

    console.log(this.willCreateJournal);
    
    if(this.latitude && this.longitude){
      
      if(!(this.status == 'none')){
          this.connectBackend.loadingSnipper('Please wait');
          this.connectBackend.createJournal(this.willCreateJournal).subscribe(_data => {
          //need to save data to the storage here
          if(_data.status == true){
            //this.connectBackend.presentAlert('Success!', _data.message);
            this.connectBackend.getProject(this.user).subscribe(_data => {
            this.projects = _data.result;
            console.log(this.projects);
            this.storage.set('projects', this.projects);
         });
            this.connectBackend.closeLoading();
            //this.connectBackend.loadingSnipper("Please wait...");
            this.navCtrl.pop();
          }
      });
      }
      else{
        this.connectBackend.loadingSnipper('Please wait');
        this.storage.get('index').then((val)=>{
          this.index = val;
          //alert("value is " + val);
          if(this.index == null){
            this.index = 0;
            this.storage.set('index', this.index);
          }
          else{
            this.index = this.index + 1;
            this.storage.set('index', this.index);
          }
          this.journal = 'journal' + this.index;
          console.log("this.journal", this.journal);
          this.storage.set(this.journal, this.willCreateJournal);
          this.navCtrl.pop();
        });
      }
    
    } 
    else{
      // this.connectBackend.presentAlert('Error', 'Please check the Location option.');
      if(!(this.status == 'none')){
          this.connectBackend.loadingSnipper('Please wait');
          this.connectBackend.createJournal(this.willCreateJournal).subscribe(_data => {
          //need to save data to the storage here
          if(_data.status == true){
            //this.connectBackend.presentAlert('Success!', _data.message);
            this.connectBackend.getProject(this.user).subscribe(_data => {
            this.projects = _data.result;
            console.log(this.projects);
            this.storage.set('projects', this.projects);
         });
            this.connectBackend.closeLoading();
            //this.connectBackend.loadingSnipper("Please wait...");
            this.navCtrl.pop();
          }
      });
      }
      else{
        this.connectBackend.loadingSnipper('Please wait');
        this.storage.get('index').then((val)=>{
          this.index = val;
          //alert("value is " + val);
          if(this.index == null){
            this.index = 0;
            this.storage.set('index', this.index);
          }
          else{
            this.index = this.index + 1;
            this.storage.set('index', this.index);
          }
          this.journal = 'journal' + this.index;
          console.log("this.journal", this.journal);
          this.storage.set(this.journal, this.willCreateJournal);
          this.navCtrl.pop();
        });
      }
    }
  }
}
