namespace MMX.Common.ValueObjects.SortingValue
{
    using System.Runtime.Serialization;

    public enum SortDirection : byte
    {
        [EnumMember(Value = "asc")]
        Asc = 0,
        [EnumMember(Value = "desc")]
        Desc = 1
    }
}
