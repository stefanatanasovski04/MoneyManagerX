namespace MMX.Application.Domain.Categories.List
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Common.Contracts;
    using MMX.Common.Dtos;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Category;
    using System.Threading.Tasks;
    using MMX.Common.ValueObjects.SortingValue;
    using MMX.Application.Contracts.Requests;
    using Contracts.Responses.Dtos;

    public class CategoriesListQueryHandler : QueryHandler<CategoriesListQuery, EnvelopeGeneric<ListResultDto<CategoryResponse>>>
    {
        private readonly MmxQueryDbContext dbContext;

        public CategoriesListQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<ListResultDto<CategoryResponse>>> Handle(CategoriesListQuery query)
        {
            IQueryable<Category> baseQuery = dbContext.Categories.Include(x => x.Icon).Where(x => x.Type == query.Type);
            IQueryable<Category> sortedCategories = baseQuery.ApplyOrder(query.Sorting, defaultSorting: category => category.Id);

            int totalCategories = await baseQuery.CountAsync();

            List<Category> dbResult = await sortedCategories.Skip(query.Paging.Skip).Take(query.Paging.Take).ToListAsync();

            List<CategoryResponse> responseList = MapToResponse(dbResult);

            return Envelope.CreateOk(
                new ListResultDto<CategoryResponse>
                {
                    List = responseList,
                    TotalCount = totalCategories,
                    CurrentPage = query.Paging.Page,
                    PageSize = query.Paging.PageSize
                });
        }

        private List<CategoryResponse> MapToResponse(List<Category> dbResult)
        {
            return dbResult.ConvertAll(category => new CategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type,
                Icon = new IconDto
                {
                    Id = category.IconFk,
                    Photo = category.Icon!.Photo
                }         
            });
        }
    }
}
