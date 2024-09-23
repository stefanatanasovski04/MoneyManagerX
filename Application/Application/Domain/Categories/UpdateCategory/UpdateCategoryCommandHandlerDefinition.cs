namespace MMX.Application.Domain.Categories.UpdateCategory
{
    using MassTransit.ConsumeConfigurators;
    using MassTransit;
    using MMX.Application.Domain.Categories.CreateCategory;
    using MMX.Application.Domain.Validators;
    using MMX.Common.Decorators;

    public class UpdateCategoryCommandHandlerDefinition : MmxConsumerDefinition<UpdateCategoryCommand, UpdateCategoryCommandHandler>
    {
        public UpdateCategoryCommandHandlerDefinition(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        protected override void ConfigureConsumer(IReceiveEndpointConfigurator endpointConfigurator, IConsumerConfigurator<UpdateCategoryCommandHandler> consumerConfigurator)
        {
            base.ConfigureConsumer(endpointConfigurator, consumerConfigurator);

            AddValidator<CategoryWithNameExistsValidator, CategoryWithNameExistsValidatorDto>(command => new CategoryWithNameExistsValidatorDto
            {
                Name = command.Name
            });
        }

    }
}
