namespace MMX.Application.Domain.Categories.List
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Domain.Enum;

    public class CategoriesListQuery : MmxQuery
    {
        public CategoryType Type { get; private set; }

        public CategoriesListQuery(CategoryType type)
        {
            Type = type;
        }
    }
}
