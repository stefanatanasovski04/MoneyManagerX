namespace MMX.Application.Contracts.Responses.Transactions
{
    using MMX.Application.Contracts.Responses.Dtos;
    using MMX.Domain.Enum;

    public class TransactionResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public TransactionType Type { get; set; }

        public decimal Amount { get; set; }

        public DateOnly TransactionDate { get; set; }

        public TimeOnly TransactionTime { get; set; }

        public CategoryDto Category { get; set; } = new CategoryDto();  
    }
}
