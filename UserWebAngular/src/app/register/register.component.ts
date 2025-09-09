import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { userModel } from '../model/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MenuComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  user: userModel = this.limpar();

  constructor(private service : UserService){}
  register() {
    if (this.user.nome !== '' && this.user.email !== '' && this.user.endereco !== '' &&
      this.user.saldo !== '' && Number(this.user.saldo)>= 0 && this.user.senha !== '') {
        this.service.postUser(this.user).subscribe({
          next: () => {
            alert("Usuário cadastrado");
            this.limpar();
            window.location.reload();
          },
          error: (err) => { alert("Erro."); console.log(err);}
        })
    }
    else{
      alert("Dados inválidos.");
    }
  }

  limpar(): userModel {
    return {
      nome: '',
      email: '',
      endereco: '',
      datacad: null,
      id: null,
      senha: '',
      saldo: ''
    }
  }
}
