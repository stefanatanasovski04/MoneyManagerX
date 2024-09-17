namespace MMX.Infrastructure
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Common;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Icon;
    using MMX.Infrastructure.Entity.Transaction;
    using System;

    public class MmxQueryDbContext : BaseQueryDbContext
    {
        private const string DboSchema = "dbo";

        private DbSet<Icon>? icons;
        private DbSet<Category>? categores;
        private DbSet<Transaction>? transactions;

        public MmxQueryDbContext(DbContextOptions<BaseQueryDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Icon> Icons => icons ??= Set<Icon>();
        public DbSet<Category> Categories => categores ??= Set<Category>();
        public DbSet<Transaction> Transactions => transactions ??= Set<Transaction>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new IconConfiguration(DboSchema));
            modelBuilder.ApplyConfiguration(new CategoryConfiguration(DboSchema));
            modelBuilder.ApplyConfiguration(new TransactionConfiguration(DboSchema));
        }
    }
}
