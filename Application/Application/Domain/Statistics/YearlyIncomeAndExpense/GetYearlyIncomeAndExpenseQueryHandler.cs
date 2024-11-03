namespace MMX.Application.Domain.Statistics.YearlyIncomeAndExpense
{
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;
    using MMX.Common.Contracts;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Application.Contracts.Responses.Dtos;
    using System.Threading.Tasks;
    using MMX.Infrastructure.Entity.Dtos;

    public class GetYearlyIncomeAndExpenseQueryHandler : QueryHandler<GetYearlyIncomeAndExpenseQuery, EnvelopeGeneric<List<MonthlyIncomeExpenseDto>>>
    {
        private readonly MmxQueryDbContext dbContext;
        const int FirstMonth = 1;
        const int LastMont = 12;
        private readonly List<string> months = new List<string> { "January", "February", "March", "April", "May", "June", 
                                                                  "July", "August", "September", "October", "November", "December" };

        public GetYearlyIncomeAndExpenseQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<List<MonthlyIncomeExpenseDto>>> Handle(GetYearlyIncomeAndExpenseQuery query)
        {
            List<MonthlyIncomeExpense> procedureResult =  await dbContext.MonthlyIncomesAndExpenses
                .FromSqlRaw("EXECUTE [dbo].[sp_GetMonthlyTotals] @Year", new SqlParameter("@Year", query.Year))
                .ToListAsync();
           
            return Envelope.CreateOk(MapToResponse(procedureResult));
        }

        public List<MonthlyIncomeExpenseDto> MapToResponse(List<MonthlyIncomeExpense> procedureResult)
        {
            List<MonthlyIncomeExpenseDto> responseList = new();
            for (int i = FirstMonth; i <= LastMont; i++)
            
            {
                MonthlyIncomeExpenseDto newDto = new MonthlyIncomeExpenseDto
                {
                    TransactionMonth = i,
                    Month = months[i - 1],
                };
                newDto.Expense = procedureResult.Where(x => x.TransactionMonth == i).FirstOrDefault()?.Expense ?? 0;
                newDto.Income = procedureResult.Where(x => x.TransactionMonth == i).FirstOrDefault()?.Income ?? 0;

                responseList.Add(newDto);
            }

            return responseList;
        }
    }
}
