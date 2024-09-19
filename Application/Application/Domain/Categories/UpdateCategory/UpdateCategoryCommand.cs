namespace MMX.Application.Domain.Categories.UpdateCategory
{
    using MMX.Common.Mediator.Contrats;
    using MMX.Domain.Enum;

    public class UpdateCategoryCommand : MmxCommand
    {
        public UpdateCategoryCommand(int id, string name, CategoryType type, int iconFk)
        {
            Id = id;
            Name = name;
            Type = type;
            IconFk = iconFk;
        }

        public int Id { get; private set; }

        public string Name { get; private set; }

        public CategoryType Type { get; private set; }

        public int IconFk { get; private set; }
    }
}
