import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class ConnectBackend {
  apiUrl: string = 'http://app.dianedata.com/api/v1/';
//  apiUrl: string = '/api/';

  project_endpoint: string = 'project';
  login_endpoint: string = 'login';
  journal_endpoint: string = 'journal';

  loading: any;

  constructor(public http: Http, public alertCtrl: AlertController, public loadCtrl: LoadingController) {
    console.log('Hello ConnectBackend Provider');
  }

/**
 *  Login function
 */
  signIn(username: string, password: string){
    let data = JSON.stringify({
      username: username,
      password: password
    });
    
    let url = this.apiUrl + this.login_endpoint;
    return this.http.post(url, data, this.getHeaders()).map(_res => _res.json());
  }

/**
 *  Get Project 
 */
  getProject(user_id: number){
    let url = this.apiUrl + this.project_endpoint + '?' + 'user_id=' + user_id;
    return this.http.get(url).map(_res => _res.json());
  }

/**
 *  Get Journal Detail
 */
  getJournalDetail(user_id: number, project_id: number){
    let url = this.apiUrl + this.journal_endpoint + '?' + 'user_id=' + user_id + '&' + 'project_id=' + project_id;
    return this.http.get(url).map(_res => _res.json());
  }

/**
 *  Create Journal
 */
  createJournal(tempJournal: any){
    let data = JSON.stringify({
      user_id:      tempJournal.user_id,
      project_id:   tempJournal.project_id,
      name:         tempJournal.name,
      location:     tempJournal.location,
      description:  tempJournal.description 
    });

    let url = this.apiUrl + this.journal_endpoint;
    return this.http.post(url, data, this.getHeaders()).map(_res => _res.json());
  }

/**
 *  Get Headers
 */
  getHeaders(): any{
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Authorization','Basic MlpG');
    let options= new RequestOptions({headers: headers});
    return options;
  }

/**
 *  Loading snipper display.
 */
  loadingSnipper(contentText: string){
    this.loading = this.loadCtrl.create({
      content: contentText
    });
    
    this.loading.present();
  }

/**
 *  Close the loading snipper.
 */
  closeLoading(){
    this.loading.dismiss();
  }

/**
 *  Alert
 */
  presentAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Okay!']
    });
    alert.present();
  }
}
