namespace MMX.Common.Domain
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public abstract class BaseIdConfiguration<T> : IEntityTypeConfiguration<T>
        where T : BaseIdEntity
    {
        protected string Schema { get; }

        public BaseIdConfiguration(string schema)
        {
            Schema = schema;
        }

        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
