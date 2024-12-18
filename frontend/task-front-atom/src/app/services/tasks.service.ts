import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseURL = `${environment.apiUrl}/tasks`;

  constructor(
    private http: HttpClient,
  ) { }

  async getAllTasks() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.baseURL).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      });
    });
  }

  async createTask(task: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.baseURL, task).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      });
    });
  }

  async updateTask(taskId: string, task: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(`${this.baseURL}/${taskId}`, task).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      });
    });
  }

  async deleteTask(taskId: string) {
    return await new Promise((resolve, reject) => {
      this.http.delete(`${this.baseURL}/${taskId}`).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      });
    });
  }
}
