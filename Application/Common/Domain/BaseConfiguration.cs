namespace MMX.Common.Domain
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public abstract class BaseConfiguration<T> : BaseIdConfiguration<T>
       where T : BaseDeletedEntity
    {
        protected BaseConfiguration(string schema)
            : base(schema)
        {
        }

        public override void Configure(EntityTypeBuilder<T> builder)
        {
            base.Configure(builder);

            builder.HasQueryFilter(x => x.DeletedOn == null);
        }
    }
}
