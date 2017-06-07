import { Component, NgZone } from '@angular/core';
// import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Platform, Events } from 'ionic-angular';
import { ProjectsPage } from '../pages/projects/projects';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { ConnectBackend } from '../providers/connect-backend';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  username: any;
  password: any;
  userData: any;
  syncData: any=[];
  status: any;
  constructor(public events: Events,public storage:Storage, platform: Platform, private network:Network, private _ngZone: NgZone, public connectBackend: ConnectBackend) {
    platform.ready().then(() => {
      // _ngZone.run(() => { alert(this.network.type); });
      // // Okay, so the platform is ready and our plugins are available.
      // // Here you can do any higher level native things you might need.
      // // alert(this.network.onConnect());
      // var offline = Observable.fromEvent(document, "offline");
      // var online = Observable.fromEvent(document, "online");

      // offline.subscribe(() => {
      //     alert("Offline");
      // });

      // online.subscribe(()=>{
      //     alert("online");
      // });

      // if(this.network.type == 'cellular' || this.network.type == 'wifi'){
      //  this.storage.keys().then((data) =>{
      //   console.log(data);
      //   data.forEach(element => {
      //     console.log(element.slice(0,7));
      //     if(element.slice(0,7) == 'journal'){
      //       console.log(element);
      //       this.syncData.push(element);
      //     }
      //   });
      //   this.storage.get('index').then((val)=>{
      //    console.log(val);
      //    if(val!=null){
      //      if(this.syncData.length>0){
      //        this.connectBackend.loadingSnipper('Syncing Data...');
      //        this.syncData.forEach(element => {
      //        this.storage.get(element).then((val)=>{
      //         console.log(val);
      //        this.connectBackend.createJournal(val).subscribe(_data => {
      //       console.log(_data);
      //       this.storage.remove(element);
      //       this.connectBackend.closeLoading();
      //         })
      //         })
      //       });
      //     }
           
          
      //    }
      //  })
        
      //  });
      // }
      //  this.status = this.network.type;
      // _ngZone.run(() => {  
      // this.network.onConnect().subscribe(() => {
      //   alert(this.network.type);
      //   events.publish('status', this.status);
      //   alert("network connected");
      //   console.log('network connected!');
      //   this.status = this.network.type;
      //   // this.storage.keys().then((data) =>{
      //   // console.log(data);
      //   // data.forEach(element => {
      //   //   console.log(element.slice(0,7));
      //   //   if(element.slice(0,7) == 'journal'){
      //   //     console.log(element);
      //   //     this.syncData.push(element);
      //   //   }
      //   // });
      //   // this.storage.get('index').then((val)=>{
      //   //  console.log(val);
      //   //  if(val!=null){
      //   //    if(this.syncData.length>0){
      //   //      this.connectBackend.loadingSnipper('Syncing Data...');
      //   //      this.syncData.forEach(element => {
      //   //      this.storage.get(element).then((val)=>{
      //   //       console.log(val);
      //   //      this.connectBackend.createJournal(val).subscribe(_data => {
      //   //     console.log(_data);
      //   //     this.storage.remove(element);
      //   //     this.connectBackend.closeLoading();
      //   //               })
      //   //             })
      //   //           });
      //   //         }
      //   //       }
      //   //     })
      //   //   });
      //   setTimeout(() => {
      //     alert(network.type);
      //     console.log(network.type);
      //   }, 3000);
      // });

      // this.network.onDisconnect().subscribe(()=>{
      //   alert("network Disconnected");
      //   this.status = 'none';
      // });
      // });

      // this.events.publish('status', (status1) =>{
      //   console.log("afadfasdfasfd", status1);
      // })
      
      // if(!(this.status == 'none')){
      //   alert(this.status);
      //   this.storage.keys().then((data) =>{
      //   console.log(data);
      //   data.forEach(element => {
      //     console.log(element.slice(0,7));
      //     if(element.slice(0,7) == 'journal'){
      //       console.log(element);
      //       this.syncData.push(element);
      //     }
      //   });
      //   this.storage.get('index').then((val)=>{
      //    console.log(val);
      //    if(val!=null){
      //      if(this.syncData.length>0){
      //        this.connectBackend.loadingSnipper('Syncing Data...');
      //        this.syncData.forEach(element => {
      //        this.storage.get(element).then((val)=>{
      //         console.log(val);
      //        this.connectBackend.createJournal(val).subscribe(_data => {
      //       console.log(_data);
      //       this.storage.remove(element);
      //       this.connectBackend.closeLoading();
      //                 })
      //               })
      //             });
      //           }
      //         }
      //       })
      //     });
      // }
      StatusBar.styleDefault();
      this.hideSplashScreen();
      
      this.storage.ready().then(()=>{
        this.storage.get('username').then((val) => {
          this.username = val;
      });
      this.storage.get('password').then((val) => {
        this.password = val;
        if(!(this.username == null || this.password == null)){
                console.log('please enter something');
                // localStorage.getItem('userdata');
                this.rootPage = ProjectsPage;
                
            }
            else{ 
                  this.rootPage = LoginPage;
                  
                }

      });
      
      })
      
    });
  }
  hideSplashScreen() {
    if (Splashscreen) {
        setTimeout(() => {
            Splashscreen.hide();
        }, 100);
    }
}
}
