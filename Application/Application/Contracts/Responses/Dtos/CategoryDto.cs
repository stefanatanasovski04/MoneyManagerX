namespace MMX.Application.Contracts.Responses.Dtos
{
    using MMX.Domain.Enum;

    public class CategoryDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public CategoryType Type { get; set; }

        public byte[] Photo { get; set; } = Array.Empty<byte>();
    }
}
