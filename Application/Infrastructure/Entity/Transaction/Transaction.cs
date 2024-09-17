namespace MMX.Infrastructure.Entity.Transaction
{
    using MMX.Common.Domain;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Enum;

    public class Transaction : BaseCreatedEntity
    {
        public string Name { get; set; } = string.Empty;

        public int CategoryFk { get; set; }

        public TransactionType Type { get; set; }

        public string? Note { get; set; }

        public double Amount { get; set; }

        public virtual Category? Category { get; set; }
    }
}
