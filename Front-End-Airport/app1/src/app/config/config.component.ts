import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})

export class ConfigComponent implements OnInit {
  airId: any;
  newid: any;
  newloc: any;
  body: any ;
  list: any[] = new Array();
  nid: any;
  constructor(private http: Http, private route: ActivatedRoute,private router: Router) { }

  onSubmit(lname){
    console.log(lname.value);
    this.body = lname.value;
    const val = {'Airport_id': this.airId.toString() ,'Location': this.body.toString()};
    console.log(val);
    this.http.post( 'http://airporttracking.us-east-1.elasticbeanstalk.com/config/addnetwork', val)
      .subscribe(
        (response) => {
          console.log(response.json());
          window.alert(response.json().message);
        },
        (error) => console.log(error)
      );
    lname.value=" ";
  }
  addin(){
    const k = {'Airport_id': this.airId.toString()};
    this.http.post('http://airporttracking.us-east-1.elasticbeanstalk.com/devices/allnetworks',k)
      .subscribe(
        (response) => {
          console.log(response.json());
          for ( let i = 0; i < response.json().length; i++) {
            this.list.push({
              bid: response.json()[i].Device_id,
              bloc: response.json()[i].Location
            });
            //   console.log(this.lis[i]);
          }
        },
        (error) => console.log(error)
      );
  }
  onSubmit1(){
    console.log(this.nid);
    this.newloc = this.nid;
    this.final1();
  }
  onSelect($event){
    console.log($event);
    this.newid = $event;
  }

  final1(){
    const u={'Airport_id': this.airId.toString(),'Location': this.newloc.toString(),'Network_Device_id':this.newid.toString()};
    console.log(u);
    this.http.post('http://airporttracking.us-east-1.elasticbeanstalk.com/config/addnode',u)
      .subscribe(
        (response) => {
          console.log(response.json());
          window.alert(response.json().message +' with device id: '+ response.json().Device_id);
        },
        (error) => console.log(error)
      );
    this.newid= " ";
    this.newloc= " ";
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.airId = +params['id'];
      console.log('id on this page: ' + this.airId);
    });
  }
  onBack(){
    this.router.navigate(['/home',this.airId]);
  }
}
