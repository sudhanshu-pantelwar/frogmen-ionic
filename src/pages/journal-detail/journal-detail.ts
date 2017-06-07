import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';

import { ConnectBackend } from '../../providers/connect-backend';


declare var google;
@Component({
  selector: 'page-journal-detail',
  templateUrl: 'journal-detail.html'
})
export class JournalDetailPage {

  selectedJournal: any;
  location: any;
  latitude: number;
  longitude: number;

  street: string;
  city: string;
  state: string;
  country: string;

  c_at: string;
  day: any;
  date: string;
  weekDay: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public connectBackend: ConnectBackend, public platform: Platform) {
    this.selectedJournal = this.navParams.get('selectedJournal');

    // Get selected Location variable: location
    this.location = this.selectedJournal.location;

    let pos = this.location.search(',');
    
    let tempLatitude = this.location.substring(0, pos);
    let tempLongitude = this.location.substring(pos + 1, this.location.length);

    this.latitude = + tempLatitude;
    this.longitude = + tempLongitude;

    //How to get the Journal Detail Page Title?
    this.c_at = this.selectedJournal.created_at;
    let temp_date = this.c_at.slice(0, 10);

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.day = new Date(temp_date);
    this.date = '' + this.day;

    this.weekDay = days[this.day.getDay()];

    this.platform.ready().then(() => {
      if(!(this.location == "null")){
        this.loadMap();
      }
      else{
        console.log(this.location);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    this.connectBackend.closeLoading();
  }

  loadMap(){
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
          console.log('Map is ready!');

        // create LatLng object
        let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(this.latitude, this.longitude);

        console.log(ionic);

        // create CameraPosition
        let position: CameraPosition = {
          target: ionic,
          zoom: 7,
          tilt: 30
        };

        // move the map's camera to position
        map.moveCamera(position);

        // create new marker
        let markerOptions: GoogleMapsMarkerOptions = {
          position: ionic
        };

        map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
              marker.showInfoWindow();
        });

      }
    );


  }

}
