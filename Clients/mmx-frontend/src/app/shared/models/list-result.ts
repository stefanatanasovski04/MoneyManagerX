export interface IListResultDto<T>{
    list: T[],
    totalCount: number,
    curentPage: number,
    pageSize: number,
}