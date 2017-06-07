import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ToastController } from 'ionic-angular';

import { JournalPage } from '../journal/journal';
import { SettingPage } from '../setting/setting';
import { ConnectBackend } from '../../providers/connect-backend';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {
  projects: any;
  
  user: any;
  userId: number;
  storage1: any;
  responseDatas: any=[];
  status: any;
  syncData: any=[];
  connectSubscription: Subscription;
  disconnectSubscription: Subscription;
  flag: any;
  platform: any;
  constructor(public storage:Storage,public toastCtrl:ToastController, platform: Platform, private network: Network, public navCtrl: NavController, public navParams: NavParams, public connectBackend: ConnectBackend) {
    this.user = this.navParams.get('user');
    this.flag = this.navParams.get('flag');
    this.platform = platform;
    this.status = this.network.type;
     
    if(!(this.status=='none')){
      // first login
      if(this.flag=='first'){
        this.userId = this.user.id;
        this.connectBackend.loadingSnipper("loading data..");
          this.connectBackend.getProject(this.userId).subscribe(_data => {
          this.projects = _data.result;
          console.log(this.projects);
          this.storage.set('projects', this.projects);
          this.connectBackend.closeLoading();
         });
      }
      else{
        this.platform.ready().then(()=>{
        this.storage.keys().then((data) =>{
        console.log(data);
        data.forEach(element => {
          console.log(element.slice(0,7));
          if(element.slice(0,7) == 'journal'){
            console.log(element);
            this.syncData.push(element);
          }
        });
        this.storage.get('index').then((val)=>{
         console.log(val);
         if(val!=null){
           if(this.syncData.length>0){
             this.connectBackend.loadingSnipper('Syncing Data...');
             this.syncData.forEach(element => {
             this.storage.get(element).then((val)=>{
              console.log(val);
             this.connectBackend.createJournal(val).subscribe(_data => {
            console.log(_data);
            this.storage.remove(element);
            this.connectBackend.closeLoading();
                      })
                    })
                  })
                }
              }
            })
          })
      
    })
        this.storage.get('userdata').then((val) => {
          console.log("val", val);
          this.user = val;
          this.userId = val.id;
          this.connectBackend.getProject(this.userId).subscribe(_data => {
          this.projects = _data.result;
          console.log(this.projects);
          this.storage.set('projects', this.projects);
          this.connectBackend.closeLoading();
         });
        });
      }
       
    }
    else{
      this.storage.get('projects').then((val)=>{
        this.projects = val;
      })
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

    ionViewWillLeave(){
    this.connectSubscription.unsubscribe();
    console.log('ionViewWillLeave Jounarl page');
  }
  
  ionViewWillEnter(){ 
    console.log('ionViewWillEnter ProjectsPage');
    this.platform.ready().then(()=>{
      this.connectSubscription = this.network.onConnect().subscribe(() => {
        this.storage.keys().then((data) =>{
        console.log(data);
        data.forEach(element => {
          console.log(element.slice(0,7));
          if(element.slice(0,7) == 'journal'){
            console.log(element);
            this.syncData.push(element);
          }
        });
        this.storage.get('index').then((val)=>{
         console.log(val);
         if(val!=null){
           if(this.syncData.length>0){
             this.connectBackend.loadingSnipper('Syncing Data...');
             this.syncData.forEach(element => {
             this.storage.get(element).then((val)=>{
              console.log(val);
             this.connectBackend.createJournal(val).subscribe(_data => {
            console.log(_data);
            this.storage.remove(element);
            this.connectBackend.closeLoading();
                      })
                    })
                  })
                }
              }
            })
          })
      });
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }

  openJournalPage(project: any){
    this.connectBackend.loadingSnipper('Please wait...');
    this.storage.get('userdata').then((val)=>{
      console.log(val);
      this.user = val.id;
      console.log("this.user0",this.user);
      this.navCtrl.push(JournalPage, {user: this.user, project: project});
    })
    
  }

  gotoProjectSetting(project: any){
    this.connectBackend.loadingSnipper('Please wait...');
    this.navCtrl.push(SettingPage, {selectedProject: project})
  }

}