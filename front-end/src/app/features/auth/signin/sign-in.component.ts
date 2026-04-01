import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  private readonly loginUser: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  public loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  login() {
    if (this.loginform.invalid) {
      this.loginform.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginform.value;

    this.loginUser.login(email!, password!).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        const userData = response.user;
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userId', userData.id + '');

        alert(`Login Successful 🎉`);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err: any) => {
        console.error('Login error:', err);
        const errorMessage = err.error?.message || 'Server error ❗ Please try again later.';
        alert(errorMessage);
      }
    });
  }
}
