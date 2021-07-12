import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceDataService {
  spaceInfo:any;
  launchUrl:string ='https://api.spacexdata.com/v3/launches?limit=100';
  constructor(private http:HttpClient) { }

  getSpaceXData():Observable<any>{
    let filterParams = localStorage.getItem("filterParams");
    if(filterParams){
      this.filterSpaceXData(JSON.parse(filterParams));
    }
   return this.http.get(this.launchUrl);
  }

  filterSpaceXData(filterParams:any):Observable<any>{
    let url = this.launchUrl;
    if(Object.values(filterParams).every(x => x === null)){
      console.log("No Filters");
    }else{
      if(filterParams.launch_year != null){
        url+='&launch_year='+filterParams.launch_year;
      }
      if(filterParams.launch_success != null){
        url+='&launch_success='+filterParams.launch_success;
      }
      if(filterParams.land_success != null){
        url+='&land_success='+filterParams.land_success;
      }
    }
    return this.http.get(url);
  }
}
