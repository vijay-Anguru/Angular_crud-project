import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin(data) {
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find the user with the entered email and password
    const user = users.find((user: { email: string, password: string }) =>
      user.email === data.email && user.password === data.password
    );

    if (user) {
      alert('Login successful!');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.router.navigate(['/events'])
    } else {
      alert('Invalid email or password.');
    }
  }


  onRegister(data) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the email already exists
    const userExists = users.find((user: { email: string }) => user.email === data.email);
    if (userExists) {
      alert('User with this email already exists!');
      return;
    }

    // Add the new user to the array
    users.push({ email: data.email, password: data.password });

    // Store the updated users array back in localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify({email:data.email,password:data.password}));
    alert('Registration successful!');
    this.router.navigate(['/events'])

  }

  
}
