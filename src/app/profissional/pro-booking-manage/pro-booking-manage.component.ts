import { Component } from '@angular/core';
import autoTable from 'jspdf-autotable';
import { Booking } from '../../../models/booking.model';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { RBookingService } from '../../../models/rbookingService.model';
import { Service } from '../../../models/service.model';
import { Profissional } from '../../../models/profissional.model';
import { User } from '../../../models/user.model';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ServiceService } from '../../services/service.service';
import { CategoryService } from '../../services/category.service';
import { ProfissionalService } from '../../services/profissional.service';
import { BookingServicesService } from '../../services/booking-services.service';
import { ProfissionalScheduleService } from '../../services/profissional-schedule.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Schedule } from '../../../models/schedule.model';
import { jwtDecode } from 'jwt-decode';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pro-booking-manage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pro-booking-manage.component.html',
  styleUrl: './pro-booking-manage.component.css',
  providers: [DatePipe]
})
export class ProBookingManageComponent {

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
  public user!: Profissional;
  public category!:Category;
  total!: number;
  public availableTimes: string[][] = [];
  public users:User[]=[];
  public today!: string;

  

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
      userId: this.fb.control(''),
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
    this.loadUsers();
    
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
      this.profissionalApi.getProfissionalById(userId).subscribe((res) => {
        console.log(res);
        this.user=res;
        const categoryId=this.user.categoryId;
        console.log(categoryId);
        if(categoryId){
        this.categoryApi.getCategoryById(categoryId).subscribe(res=>{
        
        this.category=res;
        console.log(this.category);
      })
    }
      });
    }
  }

  
  laodBookingServices() {
    this.bookingServiceApi.getAll().subscribe((res) => {
      this.bookingServices = res;
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

  getProfissionalNameById(profissionalId: number) {
    this.profissionalApi
      .getProfissionalById(profissionalId)
      .subscribe((res) => {
        return res.name;
      });
  }

  loadService() {
    this.serviceApi.getAllServices().subscribe((res) => {
      this.services = res;
    });
  }

  loadUsers(){
    this.userApi.getUser().subscribe(res=>{
      this.users = res.filter(user => user.role == 'user');
      console.log(this.users);
    })
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
      console.log(this.registerBookingForm.value);
      const userId1 = this.registerBookingForm.value.userId;
      console.log(userId1);
      if (userId1) {
        const newBooking: Booking = {
          id: 0,
          totalPagar: 0,
          status: 'confirmado',
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
