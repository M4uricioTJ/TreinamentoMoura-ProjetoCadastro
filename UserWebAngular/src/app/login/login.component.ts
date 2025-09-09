import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { userModel } from '../model/user';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: userModel = this.limpar();

  constructor(private service:UserService, private router:Router){}

  login(){
    if (this.user.email !== '' && this.user.senha !== ''){
      this.service.loginUser(this.user).subscribe({
        next: (isValid) =>{
          if(isValid == true){
            alert("Login bem sucedido.");
            localStorage.setItem('usuario', JSON.stringify(this.user.email));
            this.user = this.limpar();
            this.router.navigate(['/home']);
          }
          else{
            alert("Email ou Senha incorretos");
          }
        },
        error: (err) => { alert("Erro."); console.log(err);}
      })
    }
    else{
      alert("Dados inválidos.");
    }
  }

  limpar() : userModel{
    return {
      id: null,
      nome: null,
      email: '',
      endereco: null,
      datacad: null,
      senha: '',
      saldo: null
    }
  }
}
