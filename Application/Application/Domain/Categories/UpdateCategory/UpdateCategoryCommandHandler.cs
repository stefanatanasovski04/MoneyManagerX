namespace MMX.Application.Domain.Categories.UpdateCategory
{
    using MMX.Common.Dtos;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Repositories;
    using System.Threading.Tasks;

    public class UpdateCategoryCommandHandler : CommandHandler<UpdateCategoryCommand, VoidResult>
    {
        private readonly IMmxRepository repository;

        public UpdateCategoryCommandHandler(IMmxRepository repository)
        {
            this.repository = repository;
        }

        public override async Task<VoidResult> Handle(UpdateCategoryCommand command)
        {
            Category category = await repository.GetCategoryById(command.Id)
                ?? throw new MmxNotFoundException($"Category with Id = {command.Id} was not found.");

            category.Name = command.Name;
            category.Type = command.Type;
            category.IconFk = command.IconFk;

            await repository.SaveChangesAsync();

            return new VoidResult();
        }
    }
}
