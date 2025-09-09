import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userModel } from '../model/user';
import { UserService } from '../service/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon"
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-user-content',
  standalone: true,
  imports: [ MatTableModule, MatIconModule, CurrencyPipe, DatePipe, MatPaginatorModule],
  templateUrl: './user-content.component.html',
  styleUrl: './user-content.component.css'
})
export class UserContentComponent {
  userlist: userModel[] = [];

  constructor(
    private service: UserService,
    public dialogRef: MatDialogRef<UserContentComponent>,
    @Inject(MAT_DIALOG_DATA) public user: userModel) {
    this.service.getUsers().subscribe({
      next: (data: userModel[]) => {
        this.userlist = data;
      },
      error: (err) => { console.error(err); alert("Erro.") }
    });
  }

  onClose() {
    this.dialogRef.close(this.user);
  }

  select(user: userModel) {
    this.user = user;
    this.onClose();
  }
}
