import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  step = 1; // 1: Email, 2: Security Question, 3: New Password
  
  email = '';
  securityQuestion = '';
  securityAnswer = '';
  newPassword = '';
  confirmPassword = '';
  showNewPassword = false;
  showConfirmPassword = false;
  
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  togglePasswordVisibility(field: string) {
    if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  submitEmail() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email';
      return;
    }
    
    // Call backend to get security question
    this.securityQuestion = 'What is your favorite color?'; // Dummy
    this.step = 2;
    this.errorMessage = '';
  }

  submitSecurityAnswer() {
    if (!this.securityAnswer) {
      this.errorMessage = 'Please answer the security question';
      return;
    }
    
    // Verify answer with backend
    this.step = 3;
    this.errorMessage = '';
  }

  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill all fields';
      return;
    }
    
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }
    
    // Call backend to reset password
    this.successMessage = 'Password reset successful! Redirecting to login...';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  goBack() {
    if (this.step > 1) {
      this.step--;
      this.errorMessage = '';
    }
  }
}
