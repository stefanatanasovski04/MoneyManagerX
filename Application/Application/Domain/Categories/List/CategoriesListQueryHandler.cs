namespace MMX.Application.Domain.Categories.List
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Responses.Categories;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Category;
    using System.Threading.Tasks;
    using MMX.Common.ValueObjects.SortingValue;

    public class CategoriesListQueryHandler : QueryHandler<CategoriesListQuery, EnvelopeGeneric<ListResultDto<CategoriesListResponse>>>
    {
        private readonly MmxQueryDbContext dbContext;

        public CategoriesListQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<ListResultDto<CategoriesListResponse>>> Handle(CategoriesListQuery query)
        {
            IQueryable<Category> baseQuery = dbContext.Categories.Where(x => x.Type == query.Type);
            IQueryable<Category> sortedCategories = baseQuery.ApplyOrder(query.Sorting, defaultSorting: category => category.Id);

            int totalCategories = await baseQuery.CountAsync();

            List<Category> dbResult = await sortedCategories.Skip(query.Paging.Skip).Take(query.Paging.Take).ToListAsync();

            List<CategoriesListResponse> responseList = MapToResponse(dbResult);

            return Envelope.CreateOk(
                new ListResultDto<CategoriesListResponse>
                {
                    List = responseList,
                    TotalCount = totalCategories,
                    CurrentPage = query.Paging.Page,
                    PageSize = query.Paging.PageSize
                });
        }

        private List<CategoriesListResponse> MapToResponse(List<Category> dbResult)
        {
            return dbResult.ConvertAll(category => new CategoriesListResponse
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type
            });
        }
    }
}
