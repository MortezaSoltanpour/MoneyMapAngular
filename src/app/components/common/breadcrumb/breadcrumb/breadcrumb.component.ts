import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  @Input() breadCrumbList: { title: string; link: string }[] = [];
}
