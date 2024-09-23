namespace MMX.Application.Domain.Transactions.CreateTransaction
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Domain.Enum;

    public class CreateTransactionCommand : MmxCommand
    {
        public CreateTransactionCommand(string? name, int categoryFk, TransactionType type, decimal amount, DateOnly transactionDate, TimeOnly transactionTime)
        {
            Name = name;
            CategoryFk = categoryFk;
            Type = type;
            Amount = amount;
            TransactionDate = transactionDate;
            TransactionTime = transactionTime;
        }

        public string? Name { get; private set; }

        public int CategoryFk { get; private set; }

        public TransactionType Type { get; private set; }

        public decimal Amount { get; private set; }

        public DateOnly TransactionDate { get; private set; }

        public TimeOnly TransactionTime { get; private set; }
    }
}
