namespace MMX.Application.Domain.Categories.TransactionsByCategory
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Responses.Dtos;
    using MMX.Application.Contracts.Responses.Transactions;
    using MMX.Common.Contracts;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Transaction;
    using System.Threading.Tasks;

    public class GetTransactionsByCategoryQueryHandler : QueryHandler<GetTransactionsByCategoryQuery, EnvelopeGeneric<TransactionsByCategoryResponse>>
    {
        private readonly MmxQueryDbContext dbContext;

        public GetTransactionsByCategoryQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<TransactionsByCategoryResponse>> Handle(GetTransactionsByCategoryQuery query)
        {
            Category category = await dbContext.Categories.Where(x => x.Id == query.CategoryId).Include(x => x.Icon).Include(x => x.Transactions).FirstOrDefaultAsync()
                ?? throw new MmxNotFoundException($"Category with Id = {query.CategoryId} was not found.");

            List<Transaction> transactions = query.Yearly
                ? category.Transactions.Where(x => x.CategoryFk == category.Id && x.TransactionDate.Month == query.Month.Month).ToList()
                : category.Transactions.Where(x => x.CategoryFk == category.Id && x.TransactionDate.Year == query.Month.Year).ToList();

            return Envelope.CreateOk(MapToResponse(category, transactions));
        }

        private TransactionsByCategoryResponse MapToResponse(Category category, List<Transaction> transactions)
        {
            TransactionsByCategoryResponse response = new TransactionsByCategoryResponse();
            decimal totalExpensePerCateogory = 0.0M;

            response.Category = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type,
                PhotoUrl = category.Icon!.PhotoUrl
            };

            foreach (Transaction transaction in transactions)
            {
                response.Transactions.Add(new TransactionResponse
                {
                    Id = transaction.Id,
                    Name = transaction.Name ?? transaction.Category!.Name,
                    Type = transaction.Type,
                    Amount = transaction.Amount,
                    TransactionDate = transaction.TransactionDate,
                    TransactionTime = transaction.TransactionTime,
                });
                totalExpensePerCateogory += transaction.Amount;
            }

            response.Total = totalExpensePerCateogory;

            return response;
        }
    }
}
