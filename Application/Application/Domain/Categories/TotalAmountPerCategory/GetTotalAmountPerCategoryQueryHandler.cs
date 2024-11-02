namespace MMX.Application.Domain.Categories.TotalAmountPerCategory
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Responses.Categories;
    using MMX.Application.Contracts.Responses.Dtos;
    using MMX.Application.Contracts.Responses.Transactions;
    using MMX.Common.Contracts;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Transaction;
    using System.Threading.Tasks;
    using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

    public class GetTotalAmountPerCategoryQueryHandler : QueryHandler<GetTotalAmountPerCategoryQuery, EnvelopeGeneric<List<TotalByCategoryResponse>>>
    {
        private readonly MmxQueryDbContext dbContext;

        public GetTotalAmountPerCategoryQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<List<TotalByCategoryResponse>>> Handle(GetTotalAmountPerCategoryQuery query)
        {
            IEnumerable<Category> categories = await dbContext.Categories
                .Include(x => x.Transactions.Where(query.Yearly
                            ? x => x.TransactionDate.Year == query.Month.Year
                            : x => x.TransactionDate.Month == query.Month.Month))
                .ToListAsync();

            return Envelope.CreateOk(MapToResponse(categories.Where(x => x.Type == MMX.Domain.Enum.CategoryType.Expense)));

        }

        private List<TotalByCategoryResponse> MapToResponse(IEnumerable<Category> categories)
        {
            List<TotalByCategoryResponse> responseList = new List<TotalByCategoryResponse>();
            foreach (Category category in categories)
            {
                decimal totalExpensePerCateogory = 0.0M;
                TotalByCategoryResponse totalByCategory = new TotalByCategoryResponse();

                totalByCategory.Category = new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Type = category.Type,
                };

                foreach (Transaction transaction in category.Transactions)
                {
                    totalExpensePerCateogory += transaction.Amount;
                }
                if (totalExpensePerCateogory > 0)
                {
                    totalByCategory.Total = totalExpensePerCateogory;
                    responseList.Add(totalByCategory);
                }
            }

            return responseList;
        }
    }
}
