import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { userModel } from '../model/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ MatToolbarModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public useremail:string | null = localStorage.getItem('usuario');

  constructor(private router:Router){}

  logout(){
    localStorage.removeItem('usuario');
    window.location.reload();
  }
}
