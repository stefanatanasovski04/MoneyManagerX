using Microsoft.EntityFrameworkCore;
using MMX.Infrastructure.Entity.Category;

namespace MMX.Infrastructure.Repositories
{
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
    }
}
