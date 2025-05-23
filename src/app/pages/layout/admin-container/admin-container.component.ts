import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/common/header/header.component';
import { FooterComponent } from '../../../components/common/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';

@Component({
  selector: 'app-admin-container',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, LoadingComponent],
  templateUrl: './admin-container.component.html',
})
export class AdminContainerComponent {}
