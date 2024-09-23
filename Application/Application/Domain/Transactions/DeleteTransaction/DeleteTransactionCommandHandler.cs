namespace MMX.Application.Domain.Transactions.DeleteTransaction
{
    using MMX.Common.Dtos;
    using MMX.Common.Exceptions;
    using MMX.Common.Mediator.Handlers;
    using MMX.Infrastructure.Entity.Transaction;
    using MMX.Infrastructure.Repositories;
    using System.Threading.Tasks;

    public class DeleteTransactionCommandHandler : CommandHandler<DeleteTransactionCommand, VoidResult>
    {
        private readonly IMmxRepository repository;

        public DeleteTransactionCommandHandler(IMmxRepository repository)
        {
            this.repository = repository;
        }

        public override async Task<VoidResult> Handle(DeleteTransactionCommand command)
        {
            Transaction transaction = await repository.GetTransactionById(command.Id)
                ?? throw new MmxNotFoundException($"Transaction with Id = {command.Id} was not found.");

            transaction.DeletedOn = DateTime.Now;

            await repository.SaveChangesAsync();

            return new VoidResult();
        }
    }
}
