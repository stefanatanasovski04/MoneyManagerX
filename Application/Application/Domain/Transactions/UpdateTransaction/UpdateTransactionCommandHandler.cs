namespace MMX.Application.Domain.Transactions.UpdateTransaction
{
    using MMX.Common.Dtos;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Transaction;
    using MMX.Infrastructure.Repositories;
    using System.Threading.Tasks;

    public class UpdateTransactionCommandHandler : CommandHandler<UpdateTransactionCommand, VoidResult>
    {
        private readonly IMmxRepository repository;

        public UpdateTransactionCommandHandler(IMmxRepository repository)
        {
            this.repository = repository;
        }

        public override async Task<VoidResult> Handle(UpdateTransactionCommand command)
        {
            Category category = await repository.GetCategoryById(command.CategoryFk)
                ?? throw new MmxNotFoundException($"Category with Id = {command.CategoryFk} was not found.");

            Transaction transaction = await repository.GetTransactionById(command.Id)
                ?? throw new MmxNotFoundException($"Transaction with Id = {command.Id} was not found.");

            transaction.Name = command.Name;
            transaction.CategoryFk = category.Id;
            transaction.Type = command.Type;
            transaction.Amount = command.Amount;
            transaction.TransactionDate = command.TransactionDate;
            transaction.TransactionTime = command.TransactionTime;

            await repository.SaveChangesAsync();

            return new VoidResult();
        }
    }
}
