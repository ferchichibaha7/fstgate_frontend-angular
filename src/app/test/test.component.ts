import { Component, OnInit } from '@angular/core';
import { TestService } from '../Services/Data/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  userid:number;
  id:number;
  name:string;
  constructor(private test: TestService) { }

  ngOnInit() {
    this.test.getinfo().subscribe(data=>{
      this.name=data.name;
     this.userid=data.id
    })
  }

}
