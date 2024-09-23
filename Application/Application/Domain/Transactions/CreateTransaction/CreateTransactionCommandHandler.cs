namespace MMX.Application.Domain.Transactions.CreateTransaction
{
    using MMX.Common.Dtos;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure.Entity.Category;
    using MMX.Infrastructure.Entity.Transaction;
    using MMX.Infrastructure.Repositories;
    using System.Threading.Tasks;

    public class CreateTransactionCommandHandler : CommandHandler<CreateTransactionCommand, VoidResult>
    {
        private readonly IMmxRepository repository;

        public CreateTransactionCommandHandler(IMmxRepository repository)
        {
            this.repository = repository;
        }

        public override async Task<VoidResult> Handle(CreateTransactionCommand command)
        {
            Category category = await repository.GetCategoryById(command.CategoryFk)
                ?? throw new MmxNotFoundException($"Category with Id = {command.CategoryFk} was not found.");

            Transaction transaction = new Transaction
            {
                Name = command.Name,
                CategoryFk = category.Id,
                Type = command.Type,
                Amount = command.Amount,
                TransactionDate = command.TransactionDate,
                TransactionTime = command.TransactionTime,
                CreatedOn = DateTime.Now
            };

            repository.CreateTransaction(transaction);
            await repository.SaveChangesAsync();    

            return new VoidResult();
        }
    }
}
