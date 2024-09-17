namespace MMX.Infrastructure.Entity.Category
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using MMX.Common.Domain;

    public class CategoryConfiguration : BaseConfiguration<Category>
    {
        public CategoryConfiguration(string schema) 
            : base(schema)
        {
        }

        public override void Configure(EntityTypeBuilder<Category> builder)
        {
            base.Configure(builder);
            builder.ToTable("tblCategory", Schema);

            // Base Properties
            builder.Property(x => x.Id).HasColumnName("ID").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.CreatedOn).HasColumnName("CreatedOn").HasColumnType("smalldatetime").IsRequired();
            builder.Property(x => x.DeletedOn).HasColumnName("DeletedOn").HasColumnType("smalldatetime").IsRequired(false);

            // Entity Properties
            builder.Property(x => x.Name).HasColumnName("Name").HasColumnType("nvarchar(50)").IsRequired();
            builder.Property(x => x.Type).HasColumnName("Type").HasColumnType("int").IsRequired();
            builder.Property(x => x.IconFk).HasColumnName("IconFk").HasColumnType("int").IsRequired();
        
            builder
                .HasOne(x => x.Icon)
                .WithMany()
                .HasForeignKey(x => x.IconFk)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
