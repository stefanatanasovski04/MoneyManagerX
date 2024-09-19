namespace MMX.Application.Domain.Categories.CreateCategory
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Domain.Enum;

    public class CreateCategoryCommand : MmxCommand
    {
        public CreateCategoryCommand(string name, CategoryType type, int iconFk)
        {
            Name = name;
            Type = type;
            IconFk = iconFk;
        }

        public string Name { get; private set; } = string.Empty;

        public CategoryType Type {  get; private set; }

        public int IconFk { get; set; }
    }
}
