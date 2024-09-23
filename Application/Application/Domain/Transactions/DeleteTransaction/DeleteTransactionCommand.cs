namespace MMX.Application.Domain.Transactions.DeleteTransaction
{
    using MMX.Common.Mediator.Contrats;

    public class DeleteTransactionCommand : MmxCommand
    {
        public DeleteTransactionCommand(int id)
        {
            Id = id;
        }

        public int Id { get; private set; }
    }
}
