import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services-and-guards/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isLogingOut = false;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.isLogingOut = true;
    this.authService.Logout()
    .then(()=>{
      this.isLogingOut = false;
    });
  }

}
