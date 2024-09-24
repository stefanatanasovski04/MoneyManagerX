namespace MMX.Application.Contracts.Responses.Transactions
{
    using MMX.Application.Contracts.Responses.Dtos;

    public class TransactionsByCategoryResponse
    {
        public CategoryDto Category { get; set; } = new CategoryDto();

        public decimal Total { get; set; }

        public List<TransactionResponse> Transactions { get; set; } = new List<TransactionResponse>();
    }
}
