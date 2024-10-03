import { Time } from "@angular/common";

export interface RBookingService {
  bookingId:number;
  serviceId: number;
  profissionalId: number;
  serviceDate: Date;
  serviceTime: Time;
}