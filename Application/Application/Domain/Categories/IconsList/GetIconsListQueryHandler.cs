namespace MMX.Application.Domain.Categories.IconsList
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Application.Contracts.Responses.Categories;
    using MMX.Common.Contracts;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Icon;
    using System.Threading.Tasks;

    public class GetIconsListQueryHandler : QueryHandler<GetIconsListQuery, EnvelopeGeneric<List<IconResponse>>>
    {
        private readonly MmxQueryDbContext dbContext;

        public GetIconsListQueryHandler(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task<EnvelopeGeneric<List<IconResponse>>> Handle(GetIconsListQuery query)
        {
            List<Icon> icons = await dbContext.Icons.ToListAsync();

            List<IconResponse> iconResponses = new List<IconResponse>();

            icons.ForEach(x => iconResponses.Add(new IconResponse
            {
                Id = x.Id,
                PhotoUrl = x.PhotoUrl
            }));

            return Envelope.CreateOk(iconResponses);
        }
    }
}
