import { Component, Inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userModel } from '../model/user';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  updateuser: userModel = { nome: '', email: '', endereco: '', senha: '', datacad: '', saldo: '', id: '' }
  constructor(
    private service: UserService,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public user: userModel) {
    this.service.getUserById(Number(this.user.id)).subscribe({
      next: (data: userModel) => {
        this.user = data;
      },
    });
  }

  onClose() {
    this.dialogRef.close(this.user);
  }

  updateField(updateuser: userModel) {
    if (this.user.nome !== '' && this.user.email !== '' && this.user.endereco !== '' &&
      this.user.saldo !== '' && Number(this.user.saldo) >= 0 && this.user.senha !== '' && this.user.senha !== null) {
        if (confirm('Deseja alterar usuário?')){
      updateuser.id = this.user.id;
      updateuser.datacad = this.user.datacad;
      this.service.updateUser(updateuser).subscribe({
        next: (data: userModel) => {
          this.user = data;
          alert("Usuário alterado");
        },
        error: (err) => { console.error(err); alert("Erro.") }
      });
      this.onClose();
    }}
    else{
      alert("Dados inválidos.");
    }
  }
}
