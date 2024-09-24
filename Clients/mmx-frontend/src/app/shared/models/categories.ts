import { CategoryType } from "./enums";
import { IIcon } from "./icon";

export interface ICategories{
    id: number,
    name: string,
    type: CategoryType,
    icon: IIcon
}