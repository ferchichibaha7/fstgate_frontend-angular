import { TokenStorageService } from './../../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
username: string;
  constructor(private storage:TokenStorageService) { }

  ngOnInit() {
    this.username=this.storage.getUsername();
  }
  logout() {
    this.storage.signOut();
    window.location.reload();
  }
}
