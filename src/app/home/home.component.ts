import { TokenStorageService } from './../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  roles: string[] = [];
  constructor(
    private tokenstorage:TokenStorageService
    ) { }

  ngOnInit() {
    this.roles = this.tokenstorage.getAuthorities();
    this.username = this.tokenstorage.getUsername();
  }

}
