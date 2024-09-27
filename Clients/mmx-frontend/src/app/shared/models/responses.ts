import { CategoryType } from "./enums";

export interface ICategory{
    id: number,
    name: string,
    type: CategoryType,
    icon: IIcon
}

export interface IIcon{
    id: 1,
    photo: any
}