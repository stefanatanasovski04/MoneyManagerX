namespace MMX.Application.Domain.Categories.GetCategory
{
    using MMX.Common.Mediator.Contrats;

    public class GetCategoryQuery : MmxQuery
    {
        public int Id { get; private set; }

        public GetCategoryQuery(int id)
        {
            Id = id;
        }
    }
}
