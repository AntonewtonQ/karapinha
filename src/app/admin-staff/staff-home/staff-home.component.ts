import { Component } from '@angular/core';
import { BookingSectionComponent } from '../../user/booking-section/booking-section.component';
import { UserFooterComponent } from '../../user/user-footer/user-footer.component';
import { Profissional } from '../../../models/profissional.model';
import { Service } from '../../../models/service.model';
import { User } from '../../../models/user.model';
import { ProfissionalService } from '../../services/profissional.service';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';
import { BookingService } from '../../services/booking.service';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [],
  templateUrl: './staff-home.component.html',
  styleUrl: './staff-home.component.css'
})
export class StaffHomeComponent {

  public profissionals:Profissional[]=[];
  public services:Service[]=[];
  public users:User[]=[];
  public clients:User[]=[];
  public faturadoHoje!:number;
  public faturadoOntem!:number;
  public faturadoMesPassado!:number;
  public faturadoNesteMes!:number;
  public serviceMais!:Service;
  public serviceMenos!:Service;
  public categories:Category[]=[]
  public user!:User;
  public needsPasswordChange: boolean = false;


  constructor(
    private profissionalApi:ProfissionalService,
    private serviceApi:ServiceService,
    private userApi:UserService,
    private bookingApi:BookingService,
    private categoryApi:CategoryService,
    private router:Router
    
  ){}

  ngOnInit(): void {
    this.loadProfissionals();
    this.loadUsers();
    this.loadServices();
    this.loadFaturadoHoje();
    this.loadFaturadoOntem();
    this.loadFaturadoNesteMes();
    this.loadFaturadoMesPassado();
    this.loadServiceMais();
    this.loadServiceMenos();
    this.loadCategories();
    this.getUserById();
  }

  loadProfissionals(){
    this.profissionalApi.getAllProfissional().subscribe(res=>{
      this.profissionals=res;
    })
  }

  loadServices(){
    this.serviceApi.getAllServices().subscribe(res=>{
      this.services=res;
    })
  }

  loadUsers(){
    this.userApi.getUser().subscribe(res=>{
      this.users=res;
      for(let i=0;i<res.length;i++){
        if(res[i].role==="user"){
          this.clients.push(res[i])
        }
      }
    })
  }

  loadFaturadoHoje(){
    this.bookingApi.getTodayRevenue().subscribe(res=>{
      this.faturadoHoje=res
    })
  }

  loadFaturadoOntem(){
    this.bookingApi.getYesterdayRevenue().subscribe(res=>{
      this.faturadoOntem=res;
    })
  }

  loadFaturadoNesteMes(){
    this.bookingApi.getCurrentMonthRevenue().subscribe(res=>{
      this.faturadoNesteMes=res;
    })
  }

  loadFaturadoMesPassado(){
    this.bookingApi.getLastMonthRevenue().subscribe(res=>{
      this.faturadoMesPassado=res;
    })
  }

  loadServiceMais(){
    this.bookingApi.getMostRequestedService().subscribe(res=>{
      this.serviceMais=res;
    })
  }

  loadServiceMenos(){
    this.bookingApi.getLeastRequestedService().subscribe(res=>{
      this.serviceMenos=res;
    })
  }

  loadCategories(){
    this.categoryApi.getAllCategories().subscribe(res=>{
      this.categories=res;
    })
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.description : 'N/A';
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
        this.user=res;
      });
    }
  }

  /*
    checkIfUserNeedsPasswordChange() {
    if (this.user && this.user.needsPasswordChange) { // Supondo que essa propriedade exista no usuário
      this.needsPasswordChange = true;
      this.router.navigate(['/change-password']); // Redireciona para a página de alteração de senha
    } else {
      this.loadData();
    }
  }

  loadData() {
    this.loadProfissionals();
    this.loadUsers();
    this.loadServices();
    this.loadFaturadoHoje();
    this.loadFaturadoOntem();
    this.loadFaturadoNesteMes();
    this.loadFaturadoMesPassado();
    this.loadServiceMais();
    this.loadServiceMenos();
    this.loadCategories();
  }


  */
}
