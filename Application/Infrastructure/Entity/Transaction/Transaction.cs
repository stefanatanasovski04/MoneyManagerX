namespace MMX.Infrastructure.Entity.Transaction
{
    using MMX.Common.Domain;
    using MMX.Domain.Enum;
    using MMX.Infrastructure.Entity.Category;

    public class Transaction : BaseCreatedEntity
    {
        public string Name { get; set; } = string.Empty;

        public int CategoryFk { get; set; }

        public TransactionType Type { get; set; }

        public string? Note { get; set; }

        public decimal Amount { get; set; }

        public virtual Category? Category { get; set; }
    }
}
