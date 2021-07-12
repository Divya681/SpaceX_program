import { Component, OnInit } from '@angular/core';
import { Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,isPlatformServer} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SpaceDataService } from './services/space-data.service';
import { LaunchDetails } from './launch-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  spaceLaunches!: LaunchDetails[];
  launchYears:any | undefined;
  launchCount:number|undefined;
  constructor( @Inject(PLATFORM_ID) private platformId: object, private title:Title, private meta:Meta, private spaceDataService: SpaceDataService){
    this.spaceLaunches=[];
    if(isPlatformServer(platformId)){
      console.log("isServer");
    }
  }
 ngOnInit(){
   this.title.setTitle("SpaceX Launch Program");
   this.meta.addTag({description:"SpaceX code assignment for Publicis Sapient"});
   this.meta.addTag({author:"Divya Goyal"});
   this.spaceDataService.getSpaceXData().subscribe(data => {
    let filterParams = localStorage.getItem("filterParams");
    if(filterParams){
      let years = new Set();
      for(let launch of data){
        years.add(launch.launch_year);
      }
      this.launchYears = years; 
     this.filterLaunch(JSON.parse(filterParams));
    }else{
      this.manipulateLaunchData(data,false);
    }
    });
 }

 filterLaunch(filterParams:any){
  this.spaceDataService.filterSpaceXData(filterParams).subscribe(data => {
    this.manipulateLaunchData(data, true);
  });
 }

  manipulateLaunchData(data: any,isFilter:boolean) {
    let spaceData = [];
    let years = new Set();
    
    for(let launch of data){
      var islaunchSuccess = launch.rocket.first_stage.cores.find(function(ele:any) {
        return ele.land_success == true;
    });
      var launchData:LaunchDetails ={
        flightNumber:launch.flight_number,
        missionName:launch.mission_name,
        launchYear:launch.launch_year,
        missionIds:launch.mission_id.length>0?launch.mission_id:['-'],
        launchSuccess:launch.launch_success != undefined ? launch.launch_success:'-',
        landSuccess:islaunchSuccess != undefined ? true:false,
        imageLink:launch.links.mission_patch_small?launch.links.mission_patch_small:'http://eesun.co.in/image/data/blank_product.png'
      }
      spaceData.push(launchData);
      years.add(launch.launch_year);
    }
    this.spaceLaunches = spaceData;
    if(!isFilter){
     this.launchYears = years; 
    }
  }
}


