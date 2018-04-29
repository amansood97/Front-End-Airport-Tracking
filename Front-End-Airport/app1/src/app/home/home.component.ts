import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Http } from "@angular/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: any;

  constructor(private http: Http, private route: ActivatedRoute,private router: Router) { }

  hardConfig(){
    this.router.navigate(['/config',this.id]).then(
      nav => {console.log('sent value: '+this.id);
      },
      err => {console.log(err);
      });
  }
  airConfig(){
    this.router.navigate(['/airport', + this.id]).then(
      nav => {console.log('sent value ' + this.id);
      },
      err => {console.log(err);}
    );
  }

  onBack(){
    this.router.navigate(['/']).then(
      nav => {console.log(nav);
      },
      err => {console.log(err);}
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.id = +params['id']});
      console.log('id on this page: ' + this.id);
    }

}

