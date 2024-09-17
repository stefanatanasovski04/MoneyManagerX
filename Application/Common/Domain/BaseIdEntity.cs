namespace MMX.Common.Domain
{
    using System.ComponentModel.DataAnnotations.Schema;

    public abstract class BaseIdEntity
    {
        [Column("ID")]
        public int Id { get; set; }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            return GetType() == obj.GetType() && Id.Equals((obj as BaseIdEntity).Id);
        }

        public static bool operator true(BaseIdEntity baseEntity)
        {
            return baseEntity == null;
        }

        public static bool operator false(BaseIdEntity baseEntity)
        {
            return baseEntity != null;
        }
    }
}
