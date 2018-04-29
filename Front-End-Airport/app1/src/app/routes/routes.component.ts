import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  getRoutes = false;
  id: any;
  list: any[] = new Array();

  constructor(private http: Http, private route: ActivatedRoute,private router: Router) { }

  onSubmit(){
    this.getRoutes = true;
  }

  onSubmit1(){
    this.router.navigate(['/airport', this.id]).then(
      nav => {console.log('sent value ' + this.id);
      },
      err => {console.log(err);}
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
