namespace MMX.Infrastructure.Entity.Icon
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using MMX.Common.Domain;

    public class IconConfiguration : BaseIdConfiguration<Icon>
    {
        public IconConfiguration(string schema) 
            : base(schema)
        {
        }

        public override void Configure(EntityTypeBuilder<Icon> builder)
        {
            base.Configure(builder);
            builder.ToTable("tblIcon", Schema);

            // Base Properties
            builder.Property(x => x.Id).HasColumnName("ID").HasColumnType("int").IsRequired().ValueGeneratedOnAdd();
            builder.Property(x => x.CreatedOn).HasColumnName("CreatedOn").HasColumnType("smalldatetime").IsRequired();
            builder.Property(x => x.DeletedOn).HasColumnName("DeletedOn").HasColumnType("smalldatetime").IsRequired(false);

            // Entity Properties
            builder.Property(x => x.Name).HasColumnName("Name").HasColumnType("nvarchar(50)").IsRequired();
            builder.Property(x => x.Photo).HasColumnName("Photo").HasColumnType("image").IsRequired(false); // make this NOT NULL
        }
    }
}
