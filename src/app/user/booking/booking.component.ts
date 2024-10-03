import { Component } from '@angular/core';
import { Category } from '../../../models/category.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { jwtDecode } from 'jwt-decode';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ServiceService } from '../../services/service.service';
import { Service } from '../../../models/service.model';
import { ProfissionalService } from '../../services/profissional.service';
import { RBookingService } from '../../../models/rbookingService.model';
import { Profissional } from '../../../models/profissional.model';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/user.model';
import { BookingServicesService } from '../../services/booking-services.service';
import { Schedule } from '../../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';
import { ProfissionalSchedule } from '../../../models/profissionalSchedule.model';
import { ProfissionalScheduleService } from '../../services/profissional-schedule.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  providers: [DatePipe]
})
export class BookingComponent {
  public categories: Category[] = [];
  public bookings: Booking[] = [];
  public bookingServices: RBookingService[] = [];
  public services: Service[] = [];
  public profissionals: Profissional[] = [];
  public filteredProfissionals: Profissional[][] = [];
  

  public filteredServices: Service[][] = [];
  public registerBookingForm: FormGroup;
  public isEditMode: boolean = false;
  public editingBookingId: number | null = null;
  public user!: User;
  total!: number;
  public availableTimes: string[][] = [];
  public today!: string;
  public myBookingServices: RBookingService[] = [];

  

  constructor(
    private fb: FormBuilder,
    private bookingApi: BookingService,
    private categoryApi: CategoryService,
    private router: Router,
    private toast: NgToastService,
    private serviceApi: ServiceService,
    private profissionalApi: ProfissionalService,
    private userApi: UserService,
    private bookingServiceApi: BookingServicesService,
    private profissionalScheduleApi: ProfissionalScheduleService,
    private datePipe:DatePipe
  ) {
    this.registerBookingForm = this.fb.group({
      services: this.fb.array([]),
    });

    // Defina a data mínima para o campo de data como a data atual
    const currentDate = new Date();
    this.today = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBookings();
    this.loadService();
    this.loadProfissionals();
    this.getUserById();
    this.laodBookingServices();
  }

  get servicesArray(): FormArray {
    return this.registerBookingForm.get('services') as FormArray;
  }

  createServiceGroup(): FormGroup {
    return this.fb.group({
      categoryId: ['', Validators.required],
      serviceId: ['', Validators.required],
      profissionalId: ['', Validators.required],
      serviceDate: ['', Validators.required],
      serviceTime: ['', Validators.required],
    });
  }

  addService() {
    this.servicesArray.push(this.createServiceGroup());
    this.filteredServices.push();
    this.filteredProfissionals.push();
    this.availableTimes.push();
  }

  removeService(index: number) {
    this.servicesArray.removeAt(index);
    this.filteredServices.splice(index, 1);
    this.filteredProfissionals.splice(index, 1);
    this.availableTimes.splice(index, 1);
  }

  filterServicesByCategory(categoryId: number, index: number): void {
    this.filteredServices[index] = this.services.filter(
      (service) => service.categoryId == categoryId
    );
    this.filteredProfissionals[index] = this.profissionals.filter(
      (p) => p.categoryId == categoryId
    );

    const serviceGroup = this.servicesArray.at(index);
    serviceGroup.get('serviceId')?.setValue('');
    serviceGroup.get('profissionalId')?.setValue('');
    serviceGroup.get('serviceDate')?.setValue('');
    serviceGroup.get('serviceTime')?.setValue('');
  }


  filterTimesByProfissional(profissionalId: number, index: number) {
    const serviceGroup = this.servicesArray.at(index);

    if (profissionalId) {
      this.profissionalScheduleApi.getSchedulesByProfissionalId(profissionalId).subscribe((res) => {
        this.availableTimes[index] = res.map((schedule: Schedule) => schedule.time);
        serviceGroup.get('serviceTime')?.setValue('');
      });
    }
  }

  

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.nameid; // Ajuste o campo conforme necessário
    }
    return null;
  }

  getUserById() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.userApi.getUserById(userId).subscribe((res) => {
        console.log(res);
      });
    }
  }

  selectBooking(id:number){
    this.bookingServiceApi.getByBooking(id).subscribe(res=>{
      this.myBookingServices=res;
      console.log(this.myBookingServices);
    })
  }

  getCategoryDescriptionById(id:number):string{
    const category =this.categories.find(cat =>cat.id==id);
    return category ? category.description : 'N/A';
  }

  getServiceDescriptionById(id:number):string{
    const services =this.services.find(cat =>cat.id==id);
    return services ? services.description : 'N/A';
  }

  laodBookingServices() {
    this.bookingServiceApi.getAll().subscribe((res) => {
      this.bookingServices = res;
      console.log(res);
    });
  }

  loadBookings() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.bookingApi.getBookingsByUser(userId).subscribe((res) => {
        this.bookings = res;
      });
    } else {
      this.toast.danger('Usuário não autenticado', 'Erro', 5000);
    }
  }

  loadProfissionals() {
    this.profissionalApi.getAllProfissional().subscribe((res) => {
      this.profissionals = res;
    });
  }

  getProfissionalNameById(profissionalId: number):string {
    const profissional =this.profissionals.find(p =>p.id==profissionalId);
    return profissional ? profissional.name : 'N/A';
  }

  loadService() {
    this.serviceApi.getAllServices().subscribe((res) => {
      this.services = res;
    });
  }

  loadCategories(): void {
    this.categoryApi.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => {
        this.toast.danger('ALGO CORREU MAL', 'Erro', 5000);
      }
    );
  }

  CreateBooking() {
    if (this.registerBookingForm.valid) {
      //console.log(this.registerBookingForm.value);
      const userId1 = this.getUserIdFromToken();
      //console.log(userId1);
      if (userId1) {
        const newBooking: Booking = {
          id: 0,
          totalPagar: 0,
          status: 'pendente',
          userId: userId1,
          dateTime: new Date(),
          services: this.registerBookingForm.value.services,
        };

        // Calcular total a pagar
        this.registerBookingForm.value.services.forEach(
          (service: { serviceId: number }) => {
            const serviceDetails = this.services.find(
              (s) => s.id == service.serviceId
            );
            if (serviceDetails) {
              newBooking.totalPagar += serviceDetails.price;
            }
          }
        );

        this.total = newBooking.totalPagar;

        this.bookingApi.create(newBooking).subscribe(
          (res) => {
            this.toast.success(
              'Marcação adicionada com sucesso',
              'Sucesso',
              5000
            );
            this.loadBookings();
            console.log(res);
            this.generatePDF(res);
          },
          (error) => {
            console.log(error);
            this.toast.danger('Erro ao adicionar marcação', 'Erro', 5000);
          }
        );
      }
    } else {
      this.toast.danger('Erro maluco', 'Erro', 5000);
    }
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'Invalid date';
  }

  deleteBooking(bookingId: number) {
    this.bookingApi.delete(bookingId).subscribe(
      () => {
        this.toast.success('Marcação deletada com sucesso', 'Sucesso', 5000);
        this.loadBookings();
      },
      (error) => {
        console.error('Erro ao deletar a marcação:', error);
        this.toast.danger('Erro ao deletar a marcação', 'Erro', 5000);
      }
    );
  }

  generatePDF(booking: Booking) {
    if (!booking.services) {
      console.error('A marcação não possui serviços definidos.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Detalhes da Marcação', 10, 10);

    const tableBody = booking.services.map((service) => {
      const category =
        this.categories.find((c) => c.id == service.serviceId)?.description ||
        '';
      const serviceDescription =
        this.services.find((s) => s.id == service.serviceId)?.description || '';
      const profissional =
        this.profissionals.find((p) => p.id == service.profissionalId)?.name ||
        '';
      const serviceDate = new Date(
        service.serviceDate
      ).toLocaleString();
      const serviceTime = (service.serviceTime).toString();
      

      return [category, serviceDescription, profissional, serviceDate,serviceTime];
    });

    autoTable(doc, {
      head: [['Categoria', 'Serviço', 'Profissional', 'Data','Hora']],
      body: tableBody,
    });

    doc.text(`Total a Pagar: ${this.total}`, 10, doc.getLineHeight() + 100);
    doc.save('detalhes_marcacao.pdf');
  }

  
}
