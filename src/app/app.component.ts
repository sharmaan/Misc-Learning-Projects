import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StockAddEditComponent } from './stock-add-edit/stock-add-edit.component';
import { StockService } from './services/stock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'infs740_project_app';

  displayedColumns: string[] = [
    'symbol',
    'companyName',
    'sector',
    'industry',
    'country',
    'currency',
    'marketCap',
    'sharesOutstanding',
    'currentPrice',
    'totalRevenue',
    'enterpriseValue',
    'beta',
    'bookValue',
    'priceToBook',

    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _stockService: StockService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getFinanceData();
  }

  openAddEditFinanceForm() {
    const dialogRef = this._dialog.open(StockAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFinanceData();
        }
      },
    });
  }

  getFinanceData() {
    this._stockService.getFinanceDataList().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFinanceData(symbol: string) {
    this._stockService.deleteFinanceData(symbol).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Finance Data Deleted!', 'done');
        this.getFinanceData();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(StockAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFinanceData();
        }
      },
    });
  }
}
