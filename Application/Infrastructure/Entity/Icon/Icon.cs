namespace MMX.Infrastructure.Entity.Icon
{
    using MMX.Common.Domain;

    public class Icon : BaseCreatedEntity
    {
        public string Name { get; set; } = string.Empty;

        public byte[] Photo { get; set; } = Array.Empty<byte>();
    }
}
