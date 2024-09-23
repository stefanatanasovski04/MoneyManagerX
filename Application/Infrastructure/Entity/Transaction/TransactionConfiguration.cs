namespace MMX.Infrastructure.Entity.Transaction
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using MMX.Common.Domain;

    public class TransactionConfiguration : BaseConfiguration<Transaction>
    {
        public TransactionConfiguration(string schema) 
            : base(schema)
        {
        }

        public override void Configure(EntityTypeBuilder<Transaction> builder)
        {
            base.Configure(builder);
            builder.ToTable("tblTransaction", Schema);

            // Base Properties
            builder.Property(x => x.Id).HasColumnName("ID").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.CreatedOn).HasColumnName("CreatedOn").HasColumnType("smalldatetime").IsRequired();
            builder.Property(x => x.DeletedOn).HasColumnName("DeletedOn").HasColumnType("smalldatetime").IsRequired(false);

            // Entity Properties
            builder.Property(x => x.Name).HasColumnName("Name").HasColumnType("nvarchar(50)").IsRequired(false);
            builder.Property(x => x.Type).HasColumnName("Type").HasColumnType("int").IsRequired();
            builder.Property(x => x.Amount).HasColumnName("Amount").HasColumnType("money").IsRequired();
            builder.Property(x => x.TransactionDate).HasColumnName("TransactionDate").HasColumnType("date").IsRequired();
            builder.Property(x => x.TransactionTime).HasColumnName("TransactionTime").HasColumnType("time").IsRequired();
            builder.Property(x => x.CategoryFk).HasColumnName("CategoryFk").HasColumnType("int").IsRequired();

            builder
                .HasOne(x => x.Category)
                .WithMany()
                .HasForeignKey(x => x.CategoryFk)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
