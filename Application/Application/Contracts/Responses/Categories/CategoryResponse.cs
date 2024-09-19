namespace MMX.Application.Contracts.Requests
{
    using MMX.Application.Contracts.Responses.Dtos;
    using MMX.Domain.Enum;

    public class CategoryResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public CategoryType Type { get; set; }

        public IconDto? Icon { get; set; }
    }
}
