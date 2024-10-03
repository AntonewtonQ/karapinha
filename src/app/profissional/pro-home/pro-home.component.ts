import { Component } from '@angular/core';
import { RBookingService } from '../../../models/rbookingService.model';
import { BookingServicesService } from '../../services/booking-services.service';
import { Profissional } from '../../../models/profissional.model';
import { ProfissionalService } from '../../services/profissional.service';
import { jwtDecode } from 'jwt-decode';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../../models/booking.model';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pro-home',
  standalone: true,
  imports: [],
  templateUrl: './pro-home.component.html',
  styleUrl: './pro-home.component.css',
  providers: [DatePipe]
})
export class ProHomeComponent {

  bookingServices:RBookingService[]=[];
  profissional!:Profissional;
  bookings:Booking[]=[]
  bookingId!:number;
  users:User[]=[];
  date!:string;


  constructor(
    private bookingServiceApi:BookingServicesService,
    private profissionalApi:ProfissionalService,
    private bookingApi:BookingService,
    private userApi:UserService,
    private datePipe:DatePipe
  ){}

  ngOnInit(): void {
    this.getUserById();
    this.loadBookingServices();
    this.loadUsers();
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.nameid; // Ajuste o campo conforme necessário
    }
    return null;
  }

  getUserById(){
    const userId=this.getUserIdFromToken();
    if(userId){
      this.profissionalApi.getProfissionalById(userId).subscribe(res=>{
        this.profissional=res;
      })
    }
  }

  loadBookingServices(){
    const userId=this.getUserIdFromToken();
    if(userId){
      this.bookingServiceApi.getByProfissional(userId).subscribe(res=>{
        this.bookingServices=res;
        
        for (let i = 0; i < this.bookingServices.length; i++) {
       
          if(this.bookingServices[i].profissionalId==userId){
            this.bookingApi.getById(this.bookingServices[i].bookingId).subscribe(res=>{
              this.bookings.push(res);
              console.log(this.bookings);
            })
          } 
        }
      })
    }
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'Invalid date';
  }

  loadUsers(){
    this.userApi.getUser().subscribe(res=>{
      this.users=res;
    })
  }

  getUserName(id:number):string{
    const user= this.users.find(u=>u.id===id);
    return user ? user.name : 'N/A';
  }

}
