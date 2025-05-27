import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private authServices: AuthService, private router: Router) {}

  handleLogOff() {
    this.authServices.logout();
    this.router.navigate(['/']);
  }
}
