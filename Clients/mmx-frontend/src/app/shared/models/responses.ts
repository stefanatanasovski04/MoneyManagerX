import { CategoryType } from "./enums";

export interface ICategory{
    id: number,
    name: string,
    type: CategoryType,
    icon: IIcon
}

export interface IIcon{
    id: number,
    photoUrl: any
}