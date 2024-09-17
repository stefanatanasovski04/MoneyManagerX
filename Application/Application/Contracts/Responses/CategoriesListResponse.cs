namespace MMX.Application.Contracts.Responses
{
    using MMX.Domain.Enum;

    public class CategoriesListResponse
    {
        public string Name {  get; set; } = string.Empty;

        public CategoryType Type { get; set; }
    }
}
