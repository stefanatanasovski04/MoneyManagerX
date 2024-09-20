namespace MMX.Application.Domain.Categories.GetCategory
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Requests;
    using MMX.Common.Contracts;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Application.Contracts.Responses.Dtos;
    using System.Threading.Tasks;

    public class GetCategoryQueryHandler : QueryHandler<GetCategoryQuery, EnvelopeGeneric<CategoryResponse>>
    {
        private readonly MmxQueryDbContext dbContext;

        public GetCategoryQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async override Task<EnvelopeGeneric<CategoryResponse>> Handle(GetCategoryQuery query)
        {
            Category category =  await dbContext.Categories
                .Where(x => x.Id == query.Id)
                .Include(x => x.Icon)
                .FirstOrDefaultAsync()
                ?? throw new MmxNotFoundException($"Category with Id = {query.Id} was not found.");

            return Envelope.CreateOk(MapToCategoryReposne(category));
        }

        private CategoryResponse MapToCategoryReposne(Category category)
        {
            return new CategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type,
                Icon = new IconDto
                {
                    Id = category.Icon!.Id,
                    Photo = category.Icon.Photo
                }
            };
        }
    }
}
