import { ViewChild } from '@angular/core';
import {App, Platform, IonicApp, Nav , Storage, SqlStorage, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {PageHelloPage} from './pages/page-hello/page-hello';
import { Myservices } from './providers/myservices/myservices';


interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@App({
  //template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl : 'build/app.html', 
  config: {
    mode: 'md',
    tabbarPlacement: 'bottom'
  }, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [Myservices]
})
export class MyApp {
  //reference la navivagion de l'application
  @ViewChild(Nav) nav:Nav;
  app: IonicApp;
  myservices: Myservices;
  isDeskRunning: boolean = false;
  pages: PageObj[];

  constructor(platform: Platform, app: IonicApp, myservices: Myservices) {
    this.app = app;
    this.myservices = myservices;
    
    
    
    /*this.pages = [
      { title:"Test Hello", component:'PageHelloPage', icon: 'calendar' }
    ];
    */
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      
      
      if (platform.is('core')) {
        console.log("S'exécute sur une platform de bureau!")
        this.isDeskRunning = true;
      } else {
        console.log("Platform",platform.navigatorPlatform());
        console.log("Agent",platform.userAgent());
      }
      
      this.initMenus();
      
      
    });
  }
  
  initMenus() {
    this.pages = [];
    
    this.myservices.getMenu().then((result)=>{
      result.forEach(eltMenu => {
        this.pages.push({title:eltMenu.title,component:eltMenu.component,icon:eltMenu.icon});
      }); 
    },(error)=>{
      console.log("Erreur",error);
    })
    //--------------------------------
  }
  
  
  openPage(page: PageObj) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //let nav = this.app.getComponent('nav');
    this.nav.setRoot(page.component);
  }
  
  onPageLoaded() {
    console.log("Navigation properties :",this.app.getComponent('nav'));
  }
}
