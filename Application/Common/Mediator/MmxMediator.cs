namespace MMX.Common.Mediator
{
    using MassTransit;
    using MassTransit.Mediator;
    using MMX.Common.Mediator.Contrats;

    public class MmxMediator
    {
        private readonly IMediator massTransitMediator;

        public MmxMediator(IMediator massTransitMediator)
        {
            this.massTransitMediator = massTransitMediator;
        }

        public async Task Publish(object @event, Type eventType)
        {
            await massTransitMediator.Publish(@event, eventType);
        }

        public async Task Send<TMessage>(TMessage command)
            where TMessage : MmxMessage
        {
            await massTransitMediator.Send(command);
        }

        public async Task<TResult> Send<TMessage, TResult>(TMessage command)
            where TMessage : MmxMessage
            where TResult : class
        {
            IRequestClient<TMessage> requestClient = massTransitMediator.CreateRequestClient<TMessage>();

            Response<TResult> response = await requestClient.GetResponse<TResult>(command);
            return response.Message;
        }
    }
}
