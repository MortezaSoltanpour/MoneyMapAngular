import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-dashboard',
  imports: [BreadcrumbComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
