import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SpaceDataService } from '../services/space-data.service';
import { LaunchDetails } from '../launch-details';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()
  launches!: LaunchDetails[] | [];
  @Input() launchYears:string[] | undefined;
  @Output() filterParams = new EventEmitter<any>();
  filterParameters:any={};
  constructor(private router: Router) { 
  }
  ngOnInit() {
    console.log(this.launches);
    if(localStorage.getItem("filterParams")){
      let obj = localStorage.getItem("filterParams") || '';
      this.filterParameters = JSON.parse(obj);
    }else{
      this.filterParameters={
        launch_year:null,
        launch_success:null,
        land_success:null
      }
    }
  }

  ngOnChanges(){
    console.log(this.launches);
  }

  filterByYear(_$event: any){
    console.log(_$event);
    let selectedElement = document.getElementById("year_"+this.filterParameters.launch_year);
    if(selectedElement && selectedElement != _$event.target){
      selectedElement?.classList.remove("selected");
    }
    if(_$event.target.classList.contains("selected")){
      _$event.target.classList.remove("selected");
      this.filterParameters.launch_year = null;
    }else{
      _$event.target.classList.add("selected");
      this.filterParameters.launch_year= _$event.target.innerText
    }
    localStorage.setItem("filterParams",JSON.stringify(this.filterParameters));
    this.filterParams.emit(this.filterParameters);
  }

  filterByLaunch(_$event: any){
    console.log(_$event);
    let selectedElement = document.getElementById("launchSuccess_"+this.filterParameters.launch_success);
    if(selectedElement && selectedElement != _$event.target){
      selectedElement?.classList.remove("selected");
    }
    if(_$event.target.classList.contains("selected")){
      _$event.target.classList.remove("selected");
      this.filterParameters.launch_success = null;
    }else{
      _$event.target.classList.add("selected");
      this.filterParameters.launch_success= _$event.target.innerText == "True"?true:false
    }
    localStorage.setItem("filterParams",JSON.stringify(this.filterParameters));
    this.filterParams.emit(this.filterParameters);
  }
  filterByLand(_$event: any){
    console.log(_$event);
    let selectedElement = document.getElementById("landSuccess_"+this.filterParameters.land_success);
    if(selectedElement && selectedElement != _$event.target){
      selectedElement?.classList.remove("selected");
    }
    if(_$event.target.classList.contains("selected")){
      _$event.target.classList.remove("selected");
      this.filterParameters.land_success = null;
    }else{
      _$event.target.classList.add("selected");
      this.filterParameters.land_success= _$event.target.innerText == "True"?true:false
    }
    localStorage.setItem("filterParams",JSON.stringify(this.filterParameters));
    this.filterParams.emit(this.filterParameters);
  }

}
