namespace MMX.Common.Mediator.Handlers
{
    using MassTransit;
    using MMX.Common.Mediator.Contrats;

    public abstract class CommandHandler<TCommand, TResult> : IConsumer<TCommand>
        where TCommand : MmxCommand
        where TResult : class
    {
        public async Task Consume(ConsumeContext<TCommand> context)
        {
            TResult result = await Handle(context.Message);

            await context.RespondAsync(result);
        }

        public abstract Task<TResult> Handle(TCommand command);
    }
}
