namespace MMX.Infrastructure.Entity.Category
{
    using MMX.Common.Domain;
    using MMX.Infrastructure.Entity.Icon;
    using MMX.Infrastructure.Enum;

    public class Category : BaseCreatedEntity
    {
        public string Name { get; set; } = string.Empty;

        public int IconFk { get; set; }

        public CategoryType Type { get; set; }

        public virtual Icon? Icon { get; set; }
    }
}
