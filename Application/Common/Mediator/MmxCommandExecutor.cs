namespace MMX.Common.Mediator
{
    using MMX.Common.Mediator.Contrats;

    public class MmxCommandExecutor : IMmxCommandExecutor
    {
        private readonly MmxMediator mediator;

        public MmxCommandExecutor(MmxMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Execute<TCommand>(TCommand command) where TCommand : MmxCommand
        {
            await mediator.Send(command);
        }

        public async Task<TResult> Execute<TCommand, TResult>(TCommand command)
            where TCommand : MmxCommand
            where TResult : class
        {
            return await mediator.Send<TCommand, TResult>(command);
        }
    }
}
