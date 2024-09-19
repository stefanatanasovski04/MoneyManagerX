namespace MMX.Infrastructure.Repositories
{
    using MMX.Infrastructure.Entity.Category;

    public interface IMmxRepository
    {
        Task SaveChangesAsync();

        Task<Category?> GetCategoryById(int id);

        void CreateCategory(Category category);

    }
}
