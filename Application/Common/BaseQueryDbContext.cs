namespace MMX.Common
{
    using Microsoft.EntityFrameworkCore;

    public class BaseQueryDbContext : DbContext
    {
        public BaseQueryDbContext(DbContextOptions<BaseQueryDbContext> options)
            : base(options)
        {
        }
    }
}
