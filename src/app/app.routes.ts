import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { authGuard } from './guards/auth.guard';
import { ManageStaffComponent } from './admin/manage-staff/manage-staff.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { AdminStaffComponent } from './admin-staff/admin-staff.component';
import { StaffHomeComponent } from './admin-staff/staff-home/staff-home.component';
import { ManageProfissinalComponent } from './admin-staff/manage-profissinal/manage-profissinal.component';
import { ManageBookingComponent } from './admin-staff/manage-booking/manage-booking.component';
import { ManageServicesComponent } from './admin-staff/manage-services/manage-services.component';
import { ManageCategoryComponent } from './admin-staff/manage-category/manage-category.component';
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { BookingComponent } from './user/booking/booking.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfissionalComponent } from './profissional/profissional.component';
import { ProHomeComponent } from './profissional/pro-home/pro-home.component';
import { ProBookingManageComponent } from './profissional/pro-booking-manage/pro-booking-manage.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'header', component:AdminNavComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'aboutus',component:AboutUsComponent},

    {path:'admin',component:AdminComponent,
        canActivate:[authGuard], 
        children: [
            {path: '', redirectTo: 'homeAdmin', pathMatch: 'full'},
            {path: 'homeAdmin', component: AdminHomeComponent},
            {path: 'home', redirectTo: 'homeAdmin', pathMatch: 'full'},
            {path: 'staff',component: ManageStaffComponent},
            {path: 'manageUser',component: ManageUserComponent},
        ],
        
    },

    {path:'staff',component:AdminStaffComponent,
        canActivate:[authGuard],
        children:[
            {
                path: '', // Default redirect route for `admin`
                redirectTo: 'staffHome', // Redirect to `homeAdmin`
                pathMatch: 'full', // Full URL match required
            },
            {
                path: 'staffHome', // Child route path
                component: StaffHomeComponent, // Child route component
            },
            {
                path: 'home', // Redirect path
                redirectTo: 'staffHome', // Redirect to `homeAdmin`
                pathMatch: 'full', // Full URL match required
            },
            {
                path:'profissional',
                component:ManageProfissinalComponent,
            },
            {
                path:'booking',
                component:ManageBookingComponent,
            },
            {
                path:'services',
                component:ManageServicesComponent,
            },
            {
                path:'categories',
                component:ManageCategoryComponent,
            },
        ],
       
    },
    

    
    {path:'user', component:UserComponent,
        children:[
            {
                path: '', // Default redirect route for `admin`
                redirectTo: 'userHome', // Redirect to `homeAdmin`
                pathMatch: 'full', // Full URL match required
            },
            {
                path: 'userHome', // Child route path
                component: UserHomeComponent, // Child route component
            },
            {
                path: 'home', // Redirect path
                redirectTo: 'userHome', // Redirect to `homeAdmin`
                pathMatch: 'full', // Full URL match required
            },
            {
                path:'booking',
                component:BookingComponent,
            },
            {
                path:'profile',
                component:ProfileComponent,
            },
        ],
        canActivate:[authGuard],
    },

    {path:'pro', component:ProfissionalComponent,
        children:[
            {
                path: '', // Default redirect route for `admin`
                redirectTo: 'proHome', // Redirect to `homeAdmin`
                pathMatch: 'full', // Full URL match required
            },
            {
                path: 'proHome', // Child route path
                component: ProHomeComponent, // Child route component
            },
            {
                path: 'home', // Redirect path
                redirectTo: 'proHome', // Redirect to `homeAdmin`
                pathMatch: 'full', // Full URL match required
            },
            {
                path:'proBooking',
                component:ProBookingManageComponent,
            },
            
        ],
        canActivate:[authGuard],
    },

    {path:'', redirectTo:'/home',pathMatch:'full'},
];
