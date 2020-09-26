import { Component, OnInit } from '@angular/core';
import {ActuService} from '../../shared/actu.service';

@Component({
  selector: 'app-actu',
  templateUrl: './actu.component.html',
  styleUrls: ['./actu.component.scss']
})
export class ActuComponent implements OnInit {
  data: any;

  constructor(private actuservice: ActuService) { }

  ngOnInit(): void {

    this.actuservice.getActu()
        .subscribe(
            res => {
              this.data= res.articles;
              console.log(this.data)

            }, () => {
              console.log("erreur d'appel a league service");
            });
  }

}
