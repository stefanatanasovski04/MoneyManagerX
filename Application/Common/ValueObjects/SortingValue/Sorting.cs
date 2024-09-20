namespace MMX.Common.ValueObjects.SortingValue
{
    using CSharpFunctionalExtensions;

    public class Sorting : ValueObject<Sorting>
    {
        protected Sorting(string columnName, SortDirection sortDirection)
        {
            ColumnName = columnName;
            SortDirection = sortDirection;
        }

        public string ColumnName { get; private set; }

        public SortDirection SortDirection { get; private set; }

        public static Sorting Create(string? columnName, string? sortDirection)
        {
            if (string.IsNullOrWhiteSpace(columnName))
            {
                columnName = string.Empty;
            }

            if (SortDirection.TryParse(sortDirection, ignoreCase: true, out SortDirection sortDirectionEnum))
            {
                return new Sorting(columnName, sortDirectionEnum);
            }
            else
            {
                return new Sorting(columnName, SortDirection.Desc);
            }
        }

        protected override bool EqualsCore(Sorting other)
        {
            if (other == null)
            {
                return false;
            }

            return ColumnName == other.ColumnName && this.SortDirection == other.SortDirection;
        }

        protected override int GetHashCodeCore()
        {
            return (ColumnName + SortDirection).GetHashCode();
        }
    }
}
