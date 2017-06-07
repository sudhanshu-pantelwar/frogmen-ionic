import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { ProjectsPage } from '../pages/projects/projects';
import { JournalPage } from '../pages/journal/journal';
import { JournalDetailPage } from '../pages/journal-detail/journal-detail';
import { SettingPage } from '../pages/setting/setting';
import { CreateJournalPage } from '../pages/create-journal/create-journal';
import { Network } from '@ionic-native/network';
import { ConnectBackend } from '../providers/connect-backend';
import { Journaldetail1Page } from '../pages/journaldetail1/journaldetail1';
import { ReversePipe } from '../pages/journal/pipe';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProjectsPage,
    JournalPage,
    JournalDetailPage,
    SettingPage,
    CreateJournalPage,
    Journaldetail1Page,
    ReversePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ProjectsPage,
    JournalPage,
    JournalDetailPage,
    SettingPage,
    CreateJournalPage,
    Journaldetail1Page
  ],
  providers: [ConnectBackend, Network, Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
