﻿namespace MMX.Infrastructure.Entity.Transaction
{
    using MMX.Common.Domain;
    using MMX.Domain.Enum;
    using MMX.Infrastructure.Entity.Category;

    public class Transaction : BaseCreatedEntity
    {
        public string? Name { get; set; }

        public int CategoryFk { get; set; }

        public TransactionType Type { get; set; }

        public decimal Amount { get; set; }

        public DateOnly TransactionDate { get; set; }

        public TimeOnly TransactionTime { get; set; }

        public virtual Category? Category { get; set; }
    }
}
