import { Component, INJECTOR, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-title',
  imports: [RouterModule],
  templateUrl: './main-title.component.html',
})
export class MainTitleComponent implements OnInit {
  @Input() parent: string = '';
  @Input() showAddBtn: boolean = false;
  @Input() title: string = '';

  ngOnInit() {
    if (!this.parent) {
      this.parent = this.title;
    }
  }
}
