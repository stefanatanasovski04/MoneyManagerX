namespace MMX.Common
{
    using Microsoft.EntityFrameworkCore;

    public class BaseCommandDbContext : DbContext
    {
        public BaseCommandDbContext(DbContextOptions<BaseCommandDbContext> options) 
            : base(options)
        {
        }
    }
}
