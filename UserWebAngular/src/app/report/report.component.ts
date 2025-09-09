import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { userModel } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { UserContentComponent } from '../user-content/user-content.component';
import { UserService } from '../service/user.service';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [MenuComponent, MatButtonModule, CurrencyPipe, DatePipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  user: userModel = { id: '', nome: '', email: '', datacad: '', saldo: '', senha: '', endereco: '' };
  readonly nome: string = '';

  constructor(public dialog: MatDialog, private service: UserService) { }
  openUserDetail(user: userModel) {
    const dialogRef = this.dialog.open(UserContentComponent, { width: '300px', data: user });
    dialogRef.afterClosed().subscribe(result => { });
  }
  openAll() {
    const dialogRef = this.dialog.open(UserContentComponent, { width: '700px', data: {} });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
        console.log(result);
      }
    });
  }
  deleteUser() {
    if (confirm("Deseja excluir usuário?")) {
      this.service.deleteUser(Number(this.user.id)).subscribe({
        next: () => {
          alert("Usuário excluído.");
          window.location.reload();
        },
        error: (err) => { alert("Erro."); console.log(err); }
      });
    }
  }
  updateUser() {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '700px', data:
      {
        nome: this.user.nome, 
        saldo: this.user.saldo, 
        email: this.user.email, 
        senha: this.user.senha, 
        endereco: this.user.endereco, 
        id: this.user.id, 
        datacad : this.user.datacad
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    })
  }
}
