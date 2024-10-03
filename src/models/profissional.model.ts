import { Category } from "./category.model";
import { ProfissionalSchedule } from "./profissionalSchedule.model";

export interface Profissional{

    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    photo: string;
    identityNumber: string;
    categoryId: number;
    category?: Category;
    scheduleIds?: ProfissionalSchedule[];
    password:string;
    profissionalName:string;
    token:string;
    role:string;
}