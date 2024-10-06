import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reusable-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSort,
    MatPaginator,
    TitleCasePipe,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
  ],
  templateUrl: './reusable-data-table.component.html',
  styleUrl: './reusable-data-table.component.scss',
})
export class ReusableDataTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() dataList: any[] = [];

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private translate: TranslateService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    // If dataList has objects, derive column names dynamically from object keys
    if (this.dataList && this.dataList.length > 0) {
      this.displayedColumns = Object.keys(this.dataList[0]); // Get object keys as columns
    }

    this.dataSource.data = this.dataList;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataList'] && changes['dataList'].currentValue) {
      this.dataSource.data = changes['dataList'].currentValue;
      this.displayedColumns = Object.keys(this.dataSource.data[0] || {});
    }
  }

  // ngOnChanges(changes: si): void {
  //   debugger;
  //   if (this.dataList && this.dataList.length) {
  //     this.dataSource.data = this.dataList;
  //     this.displayedColumns = Object.keys(this.dataList[0]);
  //   }
  // }

  // Filter method for the data table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Custom action methods
  editRow(row: any): void {
    console.log('Edit row:', row);
    // Implement your edit logic here
  }

  deleteRow(row: any): void {
    console.log('Delete row:', row);
    // Implement your delete logic here
  }
}
