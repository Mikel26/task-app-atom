import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userServ: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;

      try {
        const user = await this.userServ.getUser(email);

        if (user) {
          this.router.navigate(['/tasks']);
        }
      } catch (error: any) {
        if (error.status === 404) {
          if (confirm('Usuario no encontrado. ¿Desea crearlo?')) {
            await this.userServ.createUser({ email });
            this.router.navigate(['/tasks']);
          }
        } else {
          console.error('Error al obtener el usuario:', error);
        }
      }
    }
  }
}
