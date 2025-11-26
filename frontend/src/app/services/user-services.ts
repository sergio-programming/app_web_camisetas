import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  _id: string;
  email: string;
  nombre: string;
  password: string;
  role: string;
  activo: boolean;
}

export interface UserCreate {
  email: string;
  nombre: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  
  private apiUrl = 'http://localhost:3000/api/users';
  
  constructor (private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(_id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${_id}`);
  }

  createUser(user: UserCreate): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
  }

  deleteUser(_id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${_id}`);
  }

}
