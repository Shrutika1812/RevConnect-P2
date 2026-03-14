import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessProfileService } from '../../services/business-profile';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-profile.html',
  styleUrls: ['./business-profile.css']
})
export class BusinessProfileComponent implements OnInit {
  activeTab = 'basic';
  currentUser: any = null;
  
  businessProfile = {
    businessName: '',
    category: '',
    industry: '',
    bio: '',
    businessAddress: '',
    phone: '',
    businessEmail: '',
    website: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: ''
    },
    businessHours: [
      { day: 'Monday', open: '09:00', close: '17:00', closed: false },
      { day: 'Tuesday', open: '09:00', close: '17:00', closed: false },
      { day: 'Wednesday', open: '09:00', close: '17:00', closed: false },
      { day: 'Thursday', open: '09:00', close: '17:00', closed: false },
      { day: 'Friday', open: '09:00', close: '17:00', closed: false },
      { day: 'Saturday', open: '10:00', close: '14:00', closed: false },
      { day: 'Sunday', open: '', close: '', closed: true }
    ],
    externalLinks: [] as any[],
    products: [] as any[]
  };
  
  categories = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'Retail',
    'Food & Beverage', 'Entertainment', 'Real Estate', 'Manufacturing',
    'Consulting', 'Marketing', 'Other'
  ];
  
  newLink = { title: '', url: '' };
  newProduct = { name: '', description: '', price: '' };
  
  successMessage = '';
  errorMessage = '';

  constructor(private businessProfileService: BusinessProfileService) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
    this.loadBusinessProfile();
  }

  loadBusinessProfile() {
    if (this.currentUser) {
      this.businessProfileService.getProfile(this.currentUser.id).subscribe({
        next: (profile) => {
          if (profile) {
            this.businessProfile.businessName = profile.businessName || '';
            this.businessProfile.category = profile.category || '';
            this.businessProfile.industry = profile.industry || '';
            this.businessProfile.bio = profile.bio || '';
            this.businessProfile.businessAddress = profile.businessAddress || '';
            this.businessProfile.phone = profile.phone || '';
            this.businessProfile.businessEmail = profile.businessEmail || '';
            this.businessProfile.website = profile.website || '';
            this.businessProfile.socialLinks = {
              linkedin: profile.linkedin || '',
              twitter: profile.twitter || '',
              instagram: profile.instagram || '',
              facebook: profile.facebook || ''
            };
          }
        },
        error: (err) => console.error('Error loading business profile:', err)
      });
    }
  }

  changeTab(tab: string) {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveBasicInfo() {
    const data = {
      businessName: this.businessProfile.businessName,
      category: this.businessProfile.category,
      industry: this.businessProfile.industry,
      bio: this.businessProfile.bio
    };

    this.businessProfileService.updateBasicInfo(this.currentUser.id, data).subscribe({
      next: () => {
        this.successMessage = 'Basic information saved!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to save basic information';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  saveContactInfo() {
    const data = {
      businessAddress: this.businessProfile.businessAddress,
      phone: this.businessProfile.phone,
      businessEmail: this.businessProfile.businessEmail,
      website: this.businessProfile.website,
      linkedin: this.businessProfile.socialLinks.linkedin,
      twitter: this.businessProfile.socialLinks.twitter,
      instagram: this.businessProfile.socialLinks.instagram,
      facebook: this.businessProfile.socialLinks.facebook
    };

    this.businessProfileService.updateContactInfo(this.currentUser.id, data).subscribe({
      next: () => {
        this.successMessage = 'Contact information saved!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to save contact information';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  saveBusinessHours() {
    this.successMessage = 'Business hours saved!';
    setTimeout(() => this.successMessage = '', 3000);
  }

  addExternalLink() {
    if (this.newLink.title && this.newLink.url) {
      this.businessProfile.externalLinks.push({...this.newLink});
      this.newLink = { title: '', url: '' };
      this.successMessage = 'Link added!';
      setTimeout(() => this.successMessage = '', 3000);
    }
  }

  removeLink(index: number) {
    this.businessProfile.externalLinks.splice(index, 1);
  }

  addProduct() {
    if (this.newProduct.name) {
      this.businessProfile.products.push({...this.newProduct});
      this.newProduct = { name: '', description: '', price: '' };
      this.successMessage = 'Product/Service added!';
      setTimeout(() => this.successMessage = '', 3000);
    }
  }

  removeProduct(index: number) {
    this.businessProfile.products.splice(index, 1);
  }
}
