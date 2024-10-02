export interface IListResult<T> {
    list: T[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
}

export interface IEnvelope<T> {
    result: T;
    error: string;
}

export interface ITypeResult<T> {
    result: T;
}