import { Pipe, PipeTransform, Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Platform, Events } from 'ionic-angular';

import { Diagnostic } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { CreateJournalPage } from '../create-journal/create-journal';
import { JournalDetailPage } from '../journal-detail/journal-detail';
import { Journaldetail1Page } from '../journaldetail1/journaldetail1';

import { ConnectBackend } from '../../providers/connect-backend';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';
import { ReversePipe } from './pipe';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {
  responseDatas: any;
  responseDatas1: any=[];
  responseDatasArray: any=[];
  journal_count: number = 0;
  responseDatas2: any;
  dates: any = [];
  flag: any;
  pageTitle: string;
  user: any;
  project: any;
  connected: Subscription;
  connected1: Subscription;
  status: any;
  syncData: any=[];
  projects: any;
  syncData1: any=[];
  projectId: any;
  i: any;
  disconnected: Subscription;

  constructor(public events:Events, public navCtrl: NavController,public platform:Platform, public toastCtrl: ToastController, public network: Network, public storage:Storage, public navParams: NavParams, public connectBackend: ConnectBackend, public alertCtrl: AlertController) {
    this.user = this.navParams.get('user');
    this.i = 0;
    console.log("this.user1", this.user);
    this.project = this.navParams.get('project');
    this.pageTitle = this.project.name;
    this.status = this.network.type;
    this.projectId = this.project.id;
    this.events.subscribe('status',(status)=>{
      this.status = status;
      alert("eventStatus "+status);
    })
  }

  
  
  ionViewDidLoad() {
    this.connectBackend.closeLoading();
    console.log('ionViewDidLoad JournalPage');
  }
  ionViewWillLeave(){
      this.events.unsubscribe('status');
      // this.connected1.unsubscribe();
      this.connected.unsubscribe();
      this.disconnected.unsubscribe();
  }

  presentToast(msg) {
    
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  ionViewWillEnter() {
    // alert("ionViewWillEnter");
    this.connected = this.network.onConnect().subscribe(() => {
        this.status = this.network.type;
        // alert("statusWillEnter "+this.status);
        this.synchronize();
      }, error => alert(error));
    this.disconnected = this.network.onDisconnect().subscribe(() =>{
      this.status = 'none';
    })
    this.status = this.network.type;
    // alert(this.status);
    
    this.connectBackend.closeLoading();
    
    //document.addEventListener('offline', () => this.presentToast("offline"));
    this.platform.ready().then(()=>{
      
      // this.presentToast(this.network.type);
      if(!(this.status == 'none')){
          this.connectBackend.closeLoading();
          this.displayData();
      }
    else{
      // alert(this.network.type);
      this.storage.get(this.project.id.toString()).then((val) => {
        //this.presentToast(JSON.stringify(val));
        console.log(val);
        this.responseDatas = val;
        });
      this.storage.keys().then((data) =>{
        //this.connectBackend.closeLoading();
        console.log(data);
        this.syncData1 = [];
        data.forEach(element => {
            if(element.slice(0,7) == 'journal'){
            this.syncData1.push(element);
          }
          this.syncData1.reverse();
          // alert(this.syncData1);
        });
        this.storage.get('index').then((val)=>{
         console.log(val);
         if(val!=null){
           this.responseDatas1 = [];
           if(this.syncData1.length>0){
             this.connectBackend.closeLoading();
             //this.connectBackend.presentAlert('SyncdataLength',this.syncData1.length);
             this.connectBackend.loadingSnipper('Loading Offline Data...');
             this.syncData1.forEach(element => {
             this.storage.get(element).then((val)=>{
              console.log(val);
              //this.connectBackend.presentAlert('data',JSON.stringify(val));
              this.responseDatas1.push(val);
                    })
                  });
              // this.responseDatas1.slice().reverse();
              // alert(JSON.stringify(this.responseDatas1));
              this.responseDatas2 = this.responseDatas1;
              // alert(this.responseDatas2);
              this.connectBackend.closeLoading();
                }
               }
            })
          })
         }
       })
      }

synchronize(){
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
          //  alert("syncDatalength "+ this.syncData.length);
           if(this.syncData.length>0){
             this.connectBackend.loadingSnipper('Syncing Data...');
             this.syncData.forEach(element => {
             this.i = this.i + 1;
             this.storage.get(element).then((val)=>{
              console.log(val);
             this.connectBackend.createJournal(val).subscribe(_data => {
              console.log(_data);
              this.storage.remove(element);
              // this.displayData();
              // alert(this.i + " gap " +this.syncData.length);
              if(this.i == this.syncData.length){
                  this.displayData('sync');
                  this.i = 0;
                }
              this.connectBackend.closeLoading();
                      })
                    })
                  })
                }
              }
            })
          })
         }

  displayData(sync?){
    this.connectBackend.loadingSnipper('displaying data...');
        this.connectBackend.getJournalDetail(this.user, this.project.id).subscribe(_data => {
                  this.responseDatas = _data.result;
                  console.log(this.responseDatasArray);
                  this.responseDatasArray.push(this.responseDatas);
                  console.log(this.responseDatasArray);
                 // alert("id "+this.project.id.toString());
                  this.storage.remove(this.project.id.toString());
                  this.storage.set(this.project.id.toString(), this.responseDatas);
                });
        if(sync == 'sync'){
          this.responseDatas2 = [];
        }
        
        this.connectBackend.closeLoading();
  }

  createJournal() {
    // this.navCtrl.push(CreateJournalPage, {user: this.user, project: this.project});
    Diagnostic.isLocationEnabled().then(_success => {
      console.log('isLocationEnable value : ' + _success);
      if(_success){
        this.navCtrl.push(CreateJournalPage, {user: this.user, project: this.project});
      } else{
        this.presentConfirm();
      }
    }, _err => {
      console.log(_err);
    });
  }

  // Go to Journal Detail Page If user click the each Journal title.
  gotoJournalDetailPage(responseData: any) {
      this.connectBackend.loadingSnipper('Please wait...');
      this.navCtrl.push(JournalDetailPage, {selectedJournal: responseData});
  }

  gotoJournalDetailPage1(responseData: any){
    this.connectBackend.loadingSnipper('Please wait...');
    this.navCtrl.push(Journaldetail1Page, {selectedJournal: responseData})
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Location Services disabled.',
      message: 'This app needs access to your location. Please enable Location Services for This app.',
      buttons: [
        {
          text: 'Okay',
          role: 'change mode',
          handler: () => {
            console.log('Okay clicked');
            Diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    alert.present();
  }  
}

