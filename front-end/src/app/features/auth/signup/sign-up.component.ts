import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';
import { valueEquals } from '../../../shared/validators/valueEquals.validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  private readonly  registerNewUser: AuthService=inject(AuthService);
  private readonly router: Router=inject(Router);

  public signupform: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'),Validators.minLength(6)]),
    confirmPassword: new FormControl('', [valueEquals('password', 'confirmPassword')])
   
  });

  constructor() {
  }

  register() {
    if (this.signupform.invalid) {
      this.signupform.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signupform.value;
    console.log(name, email, password);

    this.registerNewUser.register(name, email, password).subscribe({
      next: () => {
        alert('Registered Successfully 🎉');
        this.router.navigateByUrl('app-sign-in');
      },
      error: (err: any) => {
        console.error('Signup error:', err);
        const errorMessage = err.error?.message || 'Something went wrong ❗ Please try again later.';
        alert(errorMessage);
      }
    });
  }
  
}