namespace MMX.Common.Mediator
{
    using MMX.Common.Mediator.Contrats;

    public interface IMmxCommandExecutor
    {
        Task Execute<TCommand>(TCommand command)
            where TCommand : MmxCommand;

        Task<TResult> Execute<TCommand, TResult>(TCommand command)
            where TCommand : MmxCommand
            where TResult : class;
    }
}
