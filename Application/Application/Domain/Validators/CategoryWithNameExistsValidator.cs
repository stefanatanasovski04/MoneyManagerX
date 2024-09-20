namespace MMX.Application.Domain.Validators
{
    using Microsoft.EntityFrameworkCore;
    using MMX.Common.Decorators;
    using MMX.Common.Exceptions;
    using MMX.Infrastructure;
    using MMX.Infrastructure.Entity.Category;
    using System.Threading.Tasks;

    public class CategoryWithNameExistsValidator : Validator<CategoryWithNameExistsValidatorDto>
    {
        private readonly MmxQueryDbContext dbContext;

        public CategoryWithNameExistsValidator(MmxQueryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public override async Task Validate(CategoryWithNameExistsValidatorDto payload)
        {
            Category? cateogry = await dbContext.Categories.FirstOrDefaultAsync(x => x.Name == payload.Name);

            if (cateogry != null)
            {
                throw new MmxBadRequestException($"Category with Name '{payload.Name}' already exists.");
            }
        }
    }
}
