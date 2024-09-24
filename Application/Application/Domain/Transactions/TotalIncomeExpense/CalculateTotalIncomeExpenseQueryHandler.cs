namespace MMX.Application.Domain.Transactions.TotalIncomeExpense
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Transaction;
    using System.Threading.Tasks;

    public class CalculateTotalIncomeExpenseQueryHandler : QueryHandler<CalculateTotalIncomeExpenseQuery, EnvelopeGeneric<TypeResult<decimal>>>
    {
        private readonly MmxQueryDbContext dbContext;

        public CalculateTotalIncomeExpenseQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<TypeResult<decimal>>> Handle(CalculateTotalIncomeExpenseQuery query)
        {
            List<Transaction> transactions = query.Yearly
                ? await dbContext.Transactions.Where(x => x.Type == query.Type && x.TransactionDate.Year == query.Month.Year).ToListAsync()
                : await dbContext.Transactions.Where(x => x.Type == query.Type && x.TransactionDate.Month == query.Month.Month).ToListAsync();

            decimal total = 0.0M;

            foreach (Transaction transaction in transactions)
            {
                total += transaction.Amount;
            }

            return Envelope.CreateOk(new TypeResult<decimal> { Result = total }); 
        }
    }
}
