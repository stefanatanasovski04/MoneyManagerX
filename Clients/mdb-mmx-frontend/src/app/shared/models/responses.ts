import { Time } from "@angular/common";
import { CategoryType, TransactionType } from "./enums";
import { CategoryDto } from "./dtos";

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

export interface ITransaction{
    id: number,
    name: string,
    type: TransactionType,
    amount: number,
    transactionDate: Date,
    transactionTime: Time,
    category: CategoryDto
}

export interface ITotalByCategoryResponse{
    category: CategoryDto,
    total: number,
}

export interface IMonthlyIncomeExpenseDto{
    month: string,
    expense: number,
    income: number,
}