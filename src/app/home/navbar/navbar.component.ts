import { TokenStorageService } from './../../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private storage:TokenStorageService) { }

  ngOnInit() {
  }
  logout() {
    this.storage.signOut();
    window.location.reload();
  }
}
