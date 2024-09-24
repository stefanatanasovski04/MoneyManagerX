namespace MMX.Infrastructure.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Transaction;

    public class MmxRepository : IMmxRepository
    {
        private readonly MmxCommandDbContext dbContext;

        public MmxRepository(MmxCommandDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task SaveChangesAsync()
        {
            await dbContext.SaveChangesAsync();
        }

        public async Task<Category?> GetCategoryById(int id)
        {
            return await dbContext.Categories.FindAsync(id);
        }

        public void CreateCategory(Category category)
        {
            dbContext.Categories.Add(category);
        }

        public async Task<Transaction?> GetTransactionById(int id)
        {
            return await dbContext.Transactions.FindAsync(id);
        }

        public void CreateTransaction(Transaction transaction)
        {
            dbContext.Transactions.Add(transaction);
        }

        public async Task<List<Transaction>> GetTransactionsByCategoryId(int categoryId)
        {
            return await dbContext.Transactions.Where(x => x.CategoryFk == categoryId).ToListAsync(); 
        }
    }
}
