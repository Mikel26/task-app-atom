import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [
    NgFor,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true
})

export class TasksComponent implements OnInit {
  tasks: any = [];
  taskForm: FormGroup;
  selectedTask: any = null;


  constructor(
    private taskServ: TasksService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      completed: [false]
    });
  }

  async ngOnInit() {
    await this.getTasks();
  }

  async getTasks() {
    await this.taskServ.getAllTasks().then((tasks: any) => {
      this.tasks = tasks.sort((a: any, b: any) => a.createdAt - b.createdAt);  // Ordenar por fecha
      this.tasks = tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt._seconds * 1000).toLocaleString('es-ES')
      }));
    });
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      if (this.selectedTask) {
        // Si hay una tarea seleccionada, se trata de una edición
        const updatedTask = { ...this.selectedTask, ...this.taskForm.value };
        await this.taskServ.updateTask(updatedTask.id, updatedTask).then(() => {
          this.getTasks();
          this.selectedTask = null;
        });
      } else {
        // Si no hay tarea seleccionada, se trata de una creación
        await this.taskServ.createTask(this.taskForm.value).then(() => {
          this.getTasks();
        });
      }
      this.taskForm.reset();
    }
  }

  async toggleTaskStatus(task: any) {
    await this.taskServ.updateTask(task.id, task);
    await this.getTasks();
  }

  async deleteTask(taskId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      await this.taskServ.deleteTask(taskId);
      await this.getTasks();
    }
  }

  editTask(task: any) {
    this.selectedTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  }

  cancelEdit() {
    this.selectedTask = null;
    this.taskForm.reset();
  }

  logout() {
    this.router.navigate(['/']);
  }

}
