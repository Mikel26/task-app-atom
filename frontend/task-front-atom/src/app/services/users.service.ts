import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
  ) { }

  async getUser(email: string) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseURL}/${email}`).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      });
    });
  }

  async createUser(user: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.baseURL, user).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      });
    });
  }
}
