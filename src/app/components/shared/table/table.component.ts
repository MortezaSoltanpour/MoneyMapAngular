import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() data: any[] = [];
}
