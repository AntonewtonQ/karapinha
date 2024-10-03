import { Component } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { RBookingService } from '../../../models/rbookingService.model';
import { Profissional } from '../../../models/profissional.model';
import { ServiceService } from '../../services/service.service';
import { ProfissionalService } from '../../services/profissional.service';
import { BookingService } from '../../services/booking.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../../services/user.service';
import { BookingServicesService } from '../../services/booking-services.service';

@Component({
  selector: 'app-manage-booking',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-booking.component.html',
  styleUrl: './manage-booking.component.css',
  providers: [DatePipe]
})
export class ManageBookingComponent {
  public bookings: Booking[] = [];
  public bookingServices:RBookingService[]=[];
  public profissionals:Profissional[]=[];
  public users:User[]=[];
  
  rescheduleBookingForm:FormGroup;
  selectedBooking: Booking | null = null;
  

  constructor(
    private bookingApi:BookingService,
    private bookingServiceApi:BookingServicesService,
    private profissionalApi:ProfissionalService,
    private toast:NgToastService,
    private datePipe:DatePipe,
    private userApi:UserService,
  ){
    this.rescheduleBookingForm = new FormGroup({
      serviceDateTime:new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadBookings();
    this.loadProfissionals();
    this.loadUsers();
    this.loadBookingServices();
  }



  loadBookings() {
    this.bookingApi.getAll().subscribe(res => {
      this.bookings = res;
    });
  }
  loadProfissionals(){
    this.profissionalApi.getAllProfissional().subscribe(res=>{
      this.profissionals=res;
      
    })
  }

  loadUsers(){
    this.userApi.getUser().subscribe(res=>{
      this.users=res.filter(u=>u.role=='user');
      console.log(this.users);
    })
  }

  loadBookingServices(){
    this.bookingServiceApi.getAll().subscribe(res=>{
      console.log(res);
    })
  }

  prepareRescheduleBooking(booking: Booking) {
    this.selectedBooking = booking;
    this.rescheduleBookingForm.patchValue({
      serviceDateTime: new Date(booking.dateTime).toISOString().slice(0, 16) // Formata a data para datetime-local
    });
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'Invalid date';
  }

  getUserNameById(id:number): string{
    const user=this.users.find(u=> u.id==id );
    return user ? user.name : 'N/A';
  }
  

  rescheduleBooking(){
    if(this.selectedBooking){
      const newDateTime= this.rescheduleBookingForm.value.serviceDateTime;
      console.log(newDateTime);
      this.bookingApi.rescheduleBooking(this.selectedBooking.id, newDateTime).subscribe(
        res => {
          this.toast.success("Remarcada com sucesso", "SUCESSO", 5000);
          this.loadBookings();
        },
        error => {
          this.toast.danger("Erro ao remarcar", "Erro", 5000);
        }
      );
    }
  }

  confirmBooking(id: number) {
    this.bookingApi.confirmBooking(id).subscribe(
      res => {
        this.toast.success("Marcação Confirmada", "CONFIRMADA", 5000 );
        this.loadBookings();
      },
      error => {
        this.toast.danger("ALGO CORREU MAL" ,"Erro", 5000 );
      }
    );
  }
  
}
