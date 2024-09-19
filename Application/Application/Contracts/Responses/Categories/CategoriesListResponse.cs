namespace MMX.Application.Contracts.Responses.Categories
{
    using MMX.Domain.Enum;

    public class CategoriesListResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public CategoryType Type { get; set; }
    }
}
