namespace MMX.Infrastructure.Repositories
{
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Transaction;

    public interface IMmxRepository
    {
        Task SaveChangesAsync();

        Task<Category?> GetCategoryById(int id);

        void CreateCategory(Category category);

        Task<Transaction?> GetTransactionById(int id);

        void CreateTransaction(Transaction transaction);

        Task<List<Transaction>> GetTransactionsByCategoryId(int categoryId);

    }
}
