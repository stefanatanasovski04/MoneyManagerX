namespace MMX.Application.Domain.Categories.DeleteCateogry
{
    using MMX.Common.Dtos;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Transaction;
    using MMX.Infrastructure.Repositories;
    using System.Threading.Tasks;

    public class DeleteCategoryCommandHandler : CommandHandler<DeleteCategoryCommand, VoidResult>
    {
        private readonly IMmxRepository repository;

        public DeleteCategoryCommandHandler(IMmxRepository repository)
        {
            this.repository = repository;
        }

        public override async Task<VoidResult> Handle(DeleteCategoryCommand command)
        {
            Category category = await repository.GetCategoryById(command.Id)
                ?? throw new MmxNotFoundException($"Category with Id = {command.Id} was not found.");

            List<Transaction> transactions = await repository.GetTransactionsByCategoryId(category.Id);

            transactions.ForEach(x => x.DeletedOn = DateTime.Now);  

            category.DeletedOn = DateTime.Now;

            await repository.SaveChangesAsync();

            return new VoidResult();
        }
    }
}
