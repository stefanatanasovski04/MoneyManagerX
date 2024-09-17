namespace MMX.Common.Domain
{
    public abstract class BaseDeletedEntity : BaseIdEntity
    {
        public DateTime? DeletedOn { get; set; }
    }
}
