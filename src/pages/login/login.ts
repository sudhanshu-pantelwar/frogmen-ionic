import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';

import { ProjectsPage } from '../projects/projects';
import { ConnectBackend } from '../../providers/connect-backend';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ConnectBackend]
})
export class LoginPage {

  date: Date;
  user : any;
  login: {username?: string, password?: string} ={};

  constructor(public platform: Platform, public storage:Storage,public navCtrl: NavController, public navParams: NavParams, public loadCtrl: LoadingController, public connectBackend: ConnectBackend) {
    this.date = new Date();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  loginUser(){
    // Display loading snipper.
/*
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
*/  
    // var offline = Observable.fromEvent(document, "offline");
    // var online = Observable.fromEvent(document, "online");

    // offline.subscribe(() => {
    //     alert("Offline");
    // });

    // online.subscribe(()=>{
    //     alert("offline");
    // });


    this.connectBackend.loadingSnipper('Please wait...');
    
    console.log('User name : ' + this.login.username + 'Password : ' + this.login.password);

    this.connectBackend.signIn(this.login.username, this.login.password).subscribe(_data => {
      this.storage.set('username', this.login.username);
      this.storage.set('password', this.login.password);
 //     loading.dismiss();
      this.connectBackend.closeLoading();
      
      if (_data.result == true){
        
        this.user = _data.user;
        console.log(this.user);
        this.storage.set('userdata', this.user);
        this.navCtrl.setRoot(ProjectsPage, {user: this.user, flag: "first"});
        
      } else if (_data.result == false){
        // this.storage.set('userdata', '5');
        // this.navCtrl.setRoot(ProjectsPage);
        this.connectBackend.presentAlert('Error', 'Please type correct Info.\n Try again!');
      }

    });

  }

}