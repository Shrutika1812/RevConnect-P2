import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { WelcomeComponent } from './components/welcome/welcome';
import { ProfileComponent } from './components/profile/profile';
import { FeedComponent } from './components/feed/feed';
import { CreatePostComponent } from './components/create-post/create-post';
import { MyPostsComponent } from './components/my-posts/my-posts';
import { NetworkComponent } from './components/network/network';
import { NotificationsComponent } from './components/notifications/notifications';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { SettingsComponent } from './components/settings/settings';
import { BusinessProfileComponent } from './components/business-profile/business-profile';
import { AnalyticsComponent } from './components/analytics/analytics';
import { ScheduledPostsComponent } from './components/scheduled-posts/scheduled-posts';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'user/:id', component: UserProfileComponent },
      { path: 'business-profile', component: BusinessProfileComponent },
      { path: 'create-post', component: CreatePostComponent },
      { path: 'my-posts', component: MyPostsComponent },
      { path: 'scheduled-posts', component: ScheduledPostsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'network', component: NetworkComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
