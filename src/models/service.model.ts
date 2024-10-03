import { Category } from "./category.model";

export interface Service{
    
    id: number;
    description: string;
    price: number;
    categoryId: number;
    category?: Category;
}