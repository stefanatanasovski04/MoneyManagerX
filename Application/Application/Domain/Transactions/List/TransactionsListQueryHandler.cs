﻿namespace MMX.Application.Domain.Transactions.List
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Responses.Transactions;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Transaction;
    using System.Threading.Tasks;
    using Contracts.Responses.Dtos;

    public class TransactionsListQueryHandler : QueryHandler<TransactionsListQuery, EnvelopeGeneric<ListResultDto<TransactionResponse>>>
    {
        private readonly MmxQueryDbContext dbContext;

        public TransactionsListQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<ListResultDto<TransactionResponse>>> Handle(TransactionsListQuery query)
        {
            IQueryable<Transaction> baseQuery = query.Yearly
                ? dbContext.Transactions
                    .Where(x => x.TransactionDate.Year == query.Month.Year)
                    .Include(x => x.Category)
                        .ThenInclude(x => x!.Icon)
                    .OrderByDescending(x => x.TransactionDate)
                        .ThenByDescending(x => x.TransactionTime)
                : dbContext.Transactions
                    .Where(x => x.TransactionDate.Year == query.Month.Year && x.TransactionDate.Month == query.Month.Month)
                    .Include(x => x.Category)
                        .ThenInclude(x => x!.Icon)
                    .OrderByDescending(x => x.TransactionDate)
                        .ThenByDescending(x => x.TransactionTime);

            int totalTransactions = await baseQuery.CountAsync();

            List<Transaction> dbResult = await baseQuery.Skip(query.Paging.Skip).Take(query.Paging.Take).ToListAsync();

            List<TransactionResponse> responseList = MapToResponse(dbResult);

            return Envelope.CreateOk(
                new ListResultDto<TransactionResponse>
                {
                    List = responseList,
                    TotalCount = totalTransactions,
                    CurrentPage = query.Paging.Page,
                    PageSize = query.Paging.PageSize
                });
        }

        private List<TransactionResponse> MapToResponse(List<Transaction> dbResult)
        {
            return dbResult.ConvertAll(transaction => new TransactionResponse
            {
                Id = transaction.Id,
                Name = transaction.Name ?? transaction.Category!.Name,
                Type = transaction.Type,
                Amount = transaction.Amount,
                TransactionDate = transaction.TransactionDate,
                TransactionTime = transaction.TransactionTime,
                Category = new CategoryDto
                {
                    Id = transaction.CategoryFk,
                    Name = transaction.Category!.Name,
                    Type = transaction.Category.Type,
                    PhotoUrl = transaction.Category!.Icon!.PhotoUrl
                }
            });
        }
    }
}
