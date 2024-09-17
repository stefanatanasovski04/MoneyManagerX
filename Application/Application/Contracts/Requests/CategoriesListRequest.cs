namespace MMX.Application.Contracts.Requests
{
    using MMX.Domain.Enum;

    public class CategoriesListRequest
    {
        public CategoryType Type { get; set; }
    }
}
