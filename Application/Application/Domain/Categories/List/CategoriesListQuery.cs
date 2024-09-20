namespace MMX.Application.Domain.Categories.List
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Common.ValueObjects.PagingValue;
    using MMX.Common.ValueObjects.SortingValue;
    using MMX.Domain.Enum;

    public class CategoriesListQuery : MmxQuery
    {
        public Paging Paging { get; private set; }

        public Sorting Sorting { get; private set; }

        public CategoryType Type { get; private set; }

        public CategoriesListQuery(CategoryType type, Paging paging, Sorting sorting)
        {
            Type = type;
            Paging = paging;
            Sorting = sorting;
        }
    }
}
