namespace MMX.Application.Contracts.Requests.Transactions
{
    using MMX.Domain.Enum;

    public class UpsertTransactionRequest
    {
        public string? Name { get; set; }

        public int CategoryFk { get; set; }

        public TransactionType Type { get; set; }

        public decimal Amount { get; set; }

        public DateOnly TransactionDate { get; set; }

        public TimeOnly TransactionTime { get; set; }
    }
}
