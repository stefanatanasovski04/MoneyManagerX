import { Time } from "@angular/common";
import { CategoryType, TransactionType } from "./enums";

export interface IAddCategoryRequest{
    name: string,
    type: CategoryType,
    iconFk: number
}

export interface IAddTransactionRequest{
    name: string | null,
    categoryFk: number,
    type: TransactionType,
    amount: number,
    transactionDate: Date,
    transactionTime: Time,
}