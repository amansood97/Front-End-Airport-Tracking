import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.css']
})
export class ShowMapComponent implements OnInit {

  fid: any;
  getRoutes = false;
  list: any[] = new Array();
  id: any;

  constructor(private http: Http, private route: ActivatedRoute,private router: Router) { }

  onSubmit(){
    this.getRoutes = true;
    console.log(this.fid);
    const jsonObj = {'Airport_id': this.id.toString(), 'Flight_id': this.fid};
    this.http.post('http://airporttracking.us-east-1.elasticbeanstalk.com/routes/flight', jsonObj)
      .subscribe(
        (response) => {
          console.log(response.json());
          for(let i = 0; i < response.json().length; i++){
            this.list.push({
              rid: response.json()[i].Route_id,
              fid: response.json()[i].Flight_id,
              aid: response.json()[i].Airport_id,
              routes: response.json()[i].Route,
            });
            console.log(this.list[i]);
          }
        },
        (err) => console.log(err)
      );

  }

  onSubmit1(){
    this.router.navigate(['/airport', this.id]).then(
      nav => {console.log('sent value ' + this.id);
      },
      err => {console.log(err);}
    );
  }

  onReset(){
    this.getRoutes = false;
    this.fid = '';
    for(let i = 0; i <= this.list.length + 1; i++){
      this.list.pop();
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.id = +params['id']});
  }

}
