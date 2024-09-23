namespace MMX.Application.Domain.Transactions.GetTransaction
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Responses.Dtos;
    using MMX.Application.Contracts.Responses.Transactions;
    using MMX.Common.Contracts;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Transaction;
    using System;
    using System.Threading.Tasks;

    public class GetTransactionQueryHandler : QueryHandler<GetTransactionQuery, EnvelopeGeneric<TransactionResponse>>
    {
        private readonly MmxQueryDbContext dbContext;

        public GetTransactionQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<TransactionResponse>> Handle(GetTransactionQuery query)
        {
            Transaction transaction = await dbContext.Transactions
                .Where(x => x.Id == query.Id)
                .Include(x => x.Category)
                .ThenInclude(x => x!.Icon)
                .FirstOrDefaultAsync()
                ?? throw new MmxNotFoundException($"Transaction with Id = {query.Id} was not found.");

            return Envelope.CreateOk(MapToResponse(transaction));
        }

        private TransactionResponse MapToResponse(Transaction transaction)
        {
            return new TransactionResponse
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
                    Photo = transaction.Category.Icon!.Photo
                }
            };
        }
    }
}
