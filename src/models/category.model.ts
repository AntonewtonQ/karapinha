import { Service } from "./service.model";

export interface Category{

    id: number;
    description: string;
    services: Service[];
}