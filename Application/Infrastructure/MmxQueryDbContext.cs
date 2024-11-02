namespace MMX.Infrastructure
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Infrastructure.Entity.Dtos;
    using MMX.Common;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Icon;
    using MMX.Infrastructure.Entity.Transaction;

    public class MmxQueryDbContext : BaseQueryDbContext
    {
        private const string DboSchema = "dbo";

        private DbSet<Icon>? icons;
        private DbSet<Category>? categores;
        private DbSet<Transaction>? transactions;
        private DbSet<MonthlyIncomeExpense>? monthlyIncomeExpenses;

        public MmxQueryDbContext(DbContextOptions<BaseQueryDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Icon> Icons => icons ??= Set<Icon>();
        public DbSet<Category> Categories => categores ??= Set<Category>();
        public DbSet<Transaction> Transactions => transactions ??= Set<Transaction>();
        public DbSet<MonthlyIncomeExpense> MonthlyIncomesAndExpenses => monthlyIncomeExpenses ??= Set<MonthlyIncomeExpense>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new IconConfiguration(DboSchema));
            modelBuilder.ApplyConfiguration(new CategoryConfiguration(DboSchema));
            modelBuilder.ApplyConfiguration(new TransactionConfiguration(DboSchema));

            // Dtos for procedures
            modelBuilder.Entity<MonthlyIncomeExpense>()
                .HasNoKey();
        }
    }
}
