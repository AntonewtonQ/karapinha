import { RBookingService } from "./rbookingService.model";

export interface Booking{
    id: number;
    totalPagar: number;
    status: string;
    userId: number;
    dateTime: Date;
    services: RBookingService[];
}