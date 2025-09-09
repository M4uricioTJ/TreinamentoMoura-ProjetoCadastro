import { Injectable } from '@angular/core';
import { userModel } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apirul:string = 'http://localhost:5032/User';
  constructor(private http:HttpClient) { }

  getUsers(): Observable<userModel[]> {
    return this.http.get<userModel[]>(`${this.apirul}/obter-todos`);
  }
  loginUser(user:userModel): Observable<boolean> {
    return this.http.post<boolean>(`${this.apirul}/login`, user)
  }
  postUser(user: userModel): Observable<userModel> {
    return this.http.post<userModel>(`${this.apirul}/gravar-user`, user)
  }
  deleteUser(id:number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.apirul}/apagar/${id}`);
  }
  updateUser(user:userModel): Observable<userModel>{
    return this.http.put<userModel>(`${this.apirul}/editar/${user.id}`, user)
  }
  getUserById(id:number): Observable<userModel>{
    return this.http.get<userModel>(`${this.apirul}/user/${id}`);
  }
}
