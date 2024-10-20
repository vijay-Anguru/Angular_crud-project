import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedIn = localStorage.getItem('loggedInUser');
    
    if (loggedIn) {
      return true; // Allow navigation to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Block navigation
    }
  }
}
