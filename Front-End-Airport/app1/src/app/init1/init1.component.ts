import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-init1',
  templateUrl: './init1.component.html',
  styleUrls: ['./init1.component.css']
})
export class Init1Component implements OnInit {

  list:any[] = new Array();
  a;
  b;
  x = "http://airporttracking.us-east-1.elasticbeanstalk.com/airports/getall";

  constructor(private http: Http, private route: ActivatedRoute,private router: Router) {}

  getData(){
    this.http.get(this.x).subscribe(
      (response) => {
        console.log(response.json());
        for(let i=0;i<4;i++)
        {
          this.list.push({
            name: response.json()[i].Airport_name,
            aid: response.json()[i].Airport_id,
            aloc: response.json()[i].location
          });
          console.log(this.list[i]);
        }
      },
      (error) => console.log(error)
    );
  }

  onSelect($event){
    this.a = $event;
    console.log(this.a);
  }

  onSubmit(){
    this.router.navigate(['/home', + this.a]).then(
      nav => {console.log('sent value ' + this.a);
      },
      err => {console.log(err);}
    );
  }

  ngOnInit() {
    this.getData();
  }

}
