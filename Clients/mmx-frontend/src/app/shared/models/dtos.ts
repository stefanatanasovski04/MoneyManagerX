import { CategoryType } from "./enums";

export interface CategoryDto{
    id: number,
    name: string,
    type: CategoryType,
    photoUrl: string
}