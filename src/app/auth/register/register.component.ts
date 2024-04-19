import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup | null = null;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+$/),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  registra() {
    if (this.registrationForm && this.passwordsMatch()) {
      try {
        this.authSrv.register(this.registrationForm.value).subscribe(
          (response) => {
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error(error);
            alert('Registrazione fallita. Riprova.');
          }
        );
      } catch (error: any) {
        alert(error);
        this.router.navigate(['/register']);
      }
    } else {
      alert('Compila correttamente il form.');
    }
  }

  passwordsMatch(): boolean {
    const password = this.registrationForm?.get('password')?.value;
    const confirmPassword =
      this.registrationForm?.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
