namespace MMX.Application.Domain.Categories.CreateCategory
{
    using MMX.Common.Dtos;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Repositories;
    using System.Threading.Tasks;

    public class CreateCategoryCommandHandler : CommandHandler<CreateCategoryCommand, VoidResult>
    {
        private readonly IMmxRepository repository;

        public CreateCategoryCommandHandler(IMmxRepository repository)
        {
            this.repository = repository;
        }

        public override async Task<VoidResult> Handle(CreateCategoryCommand command)
        {
            Category category = new Category
            {
                Name = command.Name,
                Type = command.Type,
                IconFk = command.IconFk,
                CreatedOn = DateTime.Now
            };

            repository.CreateCategory(category);
            await repository.SaveChangesAsync();

            return new VoidResult();
        }
    }
}
