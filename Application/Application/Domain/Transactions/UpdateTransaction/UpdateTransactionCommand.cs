namespace MMX.Application.Domain.Transactions.UpdateTransaction
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Domain.Enum;

    public class UpdateTransactionCommand : MmxCommand
    {
        public UpdateTransactionCommand(int id, string? name, int categoryFk, TransactionType type, decimal amount, DateOnly transactionDate, TimeOnly transactionTime)
        {
            Id = id;
            Name = name;
            CategoryFk = categoryFk;
            Type = type;
            Amount = amount;
            TransactionDate = transactionDate;
            TransactionTime = transactionTime;
        }

        public int Id { get; private set; }

        public string? Name { get; private set; }

        public int CategoryFk { get; private set; }

        public TransactionType Type { get; private set; }

        public decimal Amount { get; private set; }

        public DateOnly TransactionDate { get; private set; }

        public TimeOnly TransactionTime { get; private set; }
    }
}
