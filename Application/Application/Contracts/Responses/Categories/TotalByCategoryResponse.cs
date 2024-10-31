namespace MMX.Application.Contracts.Responses.Categories
{
    using MMX.Application.Contracts.Responses.Dtos;

    public class TotalByCategoryResponse
    {
        public CategoryDto Category { get; set; } = new CategoryDto();

        public decimal Total { get; set; }
    }
}
