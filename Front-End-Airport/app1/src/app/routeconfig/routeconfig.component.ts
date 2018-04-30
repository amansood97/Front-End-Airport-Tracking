import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Http } from "@angular/http";
import { NgForm } from "@angular/forms";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-routeconfig',
  templateUrl: './routeconfig.component.html',
  styleUrls: ['./routeconfig.component.css']
})
export class RouteconfigComponent implements OnInit {

  addOn = false;
  id: any;
  home = true;
  carryOn = true;
  final = '';
  first = '';
  Route = '';
  list: any[] = new Array();
  last = false;
  dis: any[] = new Array();
  addRoute = false;

  constructor(private http: Http, private route: ActivatedRoute,private router: Router) { }

  onAdd(){
    this.addOn = true;
    this.addRoute = true;
    this.home = false;
  }

  onNext(){
    this.carryOn = true;
    this.final = this.final + this.first + ',';
    for(let i=0; i < this.list.length; i++){
      if(this.first == this.list[i].did){
        this.Route = this.Route + " " + this.list[i].loc;
        this.dis[i] = true;
      }
    }
    console.log('new string: '+ this.final);
    this.first = '';
  }

  onDelete(){
    this.final = '';
    this.Route = '';
    for(let i=0; i < this.list.length; i++){
      this.dis[i] = false;
    }
  }

  onSelect($event){
    console.log($event);
    this.first = $event.toString();
    console.log(this.Route);
    for(let i=0; i < this.list.length; i++){
      this.dis[i] = false;
    }
  }

  onBack(){
    this.addOn = false;
    this.addRoute = false;
    this.home = true;
  }

  onSubmit(){
    this.addOn = true;
    this.carryOn = true;
    //this.addRoute = false;
    //this.home = true;
    const jsonObj = {'Airport_id': this.id.toString(), 'Route': this.final.toString()};
    this.http.post('http://airporttracking.us-east-1.elasticbeanstalk.com/routes/saveroute', jsonObj)
      .subscribe(
        (response) => {
          console.log(response.json());
          window.alert(response.json().Message);
        },
        (err) => console.log(err)
      );
    this.onDelete();
  }

  onSubmit1(){
      this.router.navigate(['/airport_routes', this.id]).then(
        nav => {console.log('sent value ' + this.id);
        },
        err => {console.log(err);}
      );
  }

  onSubmit2(){
    this.router.navigate(['/airport_flight_map', this.id]).then(
      nav => {console.log('sent value ' + this.id);
      },
      err => {console.log(err);}
    );
  }

  onSubmit3(){
    this.router.navigate(['/airport_show_map', this.id]).then(
      nav => {console.log('sent value ' + this.id);
      },
      err => {console.log(err);}
    );
  }

  onBackHome(){
    this.router.navigate(['/home', + this.id]).then(
      nav => {console.log(nav);
      },
      err => {console.log(err);}
    );
  }

  ngOnInit() {
    this.final = '';
    this.route.params.subscribe(params => {this.id = +params['id']});
    this.getData();
  }

  getData(){
    const jsonObj = {'Airport_id': this.id.toString()};
    this.http.post('http://airporttracking.us-east-1.elasticbeanstalk.com/devices/getall', jsonObj)
      .subscribe(
        (response) => {
          console.log(response.json());
          for(let i = 0; i < response.json().length; i++){
            this.list.push({
              did: response.json()[i].Device_id,
              aid: response.json()[i].Airport_id,
              nodeid: response.json()[i].Node_id,
              netid: response.json()[i].Network_id,
              nodec: response.json()[i].Node_count,
              loc: response.json()[i].Location
            });
            console.log(this.list[i]);
          }
        },
        (err) => console.log(err)
      );
  }

}
