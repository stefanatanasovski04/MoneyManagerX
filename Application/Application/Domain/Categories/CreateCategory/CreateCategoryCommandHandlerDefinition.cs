namespace MMX.Application.Domain.Categories.CreateCategory
{
    using MassTransit;
    using MassTransit.ConsumeConfigurators;
    using MMX.Application.Domain.Validators;
    using MMX.Common.Decorators;

    public class CreateCategoryCommandHandlerDefinition : MmxConsumerDefinition<CreateCategoryCommand, CreateCategoryCommandHandler>
    {
        public CreateCategoryCommandHandlerDefinition(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        protected override void ConfigureConsumer(IReceiveEndpointConfigurator endpointConfigurator, IConsumerConfigurator<CreateCategoryCommandHandler> consumerConfigurator)
        {
            base.ConfigureConsumer(endpointConfigurator, consumerConfigurator);

            AddValidator<CategoryWithNameExistsValidator, CategoryWithNameExistsValidatorDto>(command => new CategoryWithNameExistsValidatorDto
            {
                Name = command.Name
            });
        }
    }
}
