namespace MMX.Application.Domain.Categories.DeleteCateogry
{
    using MMX.Common.Mediator.Contrats;
    
    public class DeleteCategoryCommand : MmxCommand
    {
        public int Id { get; private set; }

        public DeleteCategoryCommand(int id)
        {
            Id = id;
        }
    }
}
