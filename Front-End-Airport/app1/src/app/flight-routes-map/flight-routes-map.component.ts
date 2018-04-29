import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-flight-routes-map',
  templateUrl: './flight-routes-map.component.html',
  styleUrls: ['./flight-routes-map.component.css']
})
export class FlightRoutesMapComponent implements OnInit {

  list: any[] = new Array();
  list1: any[] = new Array();
  fid: any;
  id: any;
  rid: any;

  constructor(private http: Http, private route: ActivatedRoute,private router: Router) { }

  onBack(){
    this.router.navigate(['/airport', this.id]).then(
      nav => {console.log('sent value ' + this.id);
      },
      err => {console.log(err);}
    );
  }

  onSelect($event){
    this.fid = $event;
    console.log(this.fid);
  }

  onSelect1($event){
    this.rid = $event;
    console.log(this.rid);
  }

  onSubmit(){
    const jsonObj = {'Airport_id': this.id.toString(), 'Route_id': this.rid, 'Flight_id': this.fid};
    this.http.post('http://airporttracking.us-east-1.elasticbeanstalk.com/routes/mapflight', jsonObj)
      .subscribe(
        (response) => {
          console.log(response.json());
          for(let i = 0; i < response.json().length; i++){
            this.list1.push({
              rid: response.json()[i].Route_id,
              fid: response.json()[i].Flight_id,
              routes: response.json()[i].Route,
            });
            console.log(this.list1[i]);
          }
          window.alert(response.json().Message);
        },
        (err) => console.log(err)
      );
  }

  getData(){
    const jsonObj = {'Airport_id': this.id.toString()};
    this.http.post('http://airporttracking.us-east-1.elasticbeanstalk.com/routes/getall', jsonObj)
      .subscribe(
        (response) => {
          console.log(response.json());
          for(let i = 0; i < response.json().length; i++){
            this.list.push({
              rid: response.json()[i].Route_id,
              aid: response.json()[i].Airport_id,
              routes: response.json()[i].Route,
            });
            console.log(this.list[i]);
          }
        },
        (err) => console.log(err)
      );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.id = +params['id']});
    this.getData();
  }

}
