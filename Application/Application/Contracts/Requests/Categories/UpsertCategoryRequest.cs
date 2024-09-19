namespace MMX.Application.Contracts.Requests.Categories
{
    using MMX.Domain.Enum;

    public class UpsertCategoryRequest
    {
        public string Name { get; set; } = string.Empty;

        public CategoryType Type { get; set; }

        public int IconFk { get; set; }
    }
}
