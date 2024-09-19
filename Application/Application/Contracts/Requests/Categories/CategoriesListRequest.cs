namespace MMX.Application.Contracts.Requests.Categories
{
    using MMX.Domain.Enum;

    public class CategoriesListRequest
    {
        public CategoryType Type { get; set; }
    }
}
