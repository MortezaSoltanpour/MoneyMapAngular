import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';

@Component({
  selector: 'app-dashboard',
  imports: [BreadcrumbComponent, MainTitleComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  title = 'Dashboard';
}
