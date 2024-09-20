namespace MMX.Application.Domain.Categories.List
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Responses.Categories;
    using MMX.Common.Contracts;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Category;
    using System;
    using System.Threading.Tasks;

    public class CategoriesListQueryHandler : QueryHandler<CategoriesListQuery, EnvelopeGeneric<List<CategoriesListResponse>>>
    {
        private readonly MmxQueryDbContext dbContext;

        public CategoriesListQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<List<CategoriesListResponse>>> Handle(CategoriesListQuery query)
        {
            return Envelope.CreateOk(MapToResponse(await dbContext.Categories.Where(x => x.Type == query.Type).ToListAsync()));
        }

        private List<CategoriesListResponse> MapToResponse(List<Category> persons)
        {
            List<CategoriesListResponse> personsListResponse = new List<CategoriesListResponse>();

            persons.ForEach(x => personsListResponse.Add(new CategoriesListResponse
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type
            }));

            return personsListResponse;
        }
    }
}
