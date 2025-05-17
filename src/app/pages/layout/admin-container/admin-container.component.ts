import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/common/header/header.component';
import { FooterComponent } from '../../../components/common/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-container',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './admin-container.component.html',
})
export class AdminContainerComponent {}
