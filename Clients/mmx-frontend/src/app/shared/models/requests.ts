import { CategoryType } from "./enums";

export interface IAddCategoryRequest{
    name: string,
    type: CategoryType,
    iconFk: number
}