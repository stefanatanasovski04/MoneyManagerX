namespace MMX.Infrastructure.Entity.Category
{
    using MMX.Common.Domain;
    using MMX.Domain.Enum;
    using MMX.Infrastructure.Entity.Icon;
    using MMX.Infrastructure.Entity.Transaction;

    public class Category : BaseCreatedEntity
    {
        public string Name { get; set; } = string.Empty;

        public int IconFk { get; set; }

        public CategoryType Type { get; set; }

        public virtual Icon? Icon { get; set; }

        public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
