namespace MMX.Common.ValueObjects.PagingValue
{
    using System;
    using CSharpFunctionalExtensions;
    using MMX.Common.Exceptions;

    public abstract class Paging : ValueObject<Paging>
    {
        public static readonly RegularPaging Empty = RegularPaging.Create(default, default);

        public int Page { get; private set; }

        public int PageSize { get; private set; }

        public int Skip { get; private set; }

        public int Take { get; private set; }

        public int HumanReadablePage
        {
            get
            {
                return Page + 1;
            }
        }

        protected Paging(int page, int pageSize, int skip, int take)
        {
            Page = page;
            PageSize = pageSize;
            Skip = skip;
            Take = take;
        }

        protected Paging(int? page, int? pageSize, int maxPageSize)
        {
            if (page.HasValue && page.Value <= 0)
            {
                throw new MmxBadRequestException("Please insert a value greater or equal to 1.");
            }

            int pageValue;
            if (page.HasValue)
            {
                pageValue = page.Value - 1;
            }
            else
            {
                pageValue = 0;
            }

            int pageSizeValue = pageSize ?? maxPageSize;

            pageSizeValue = Math.Min(pageSizeValue, maxPageSize);

            Page = pageValue;
            PageSize = pageSizeValue;
            Skip = pageValue * pageSizeValue;
            Take = pageSizeValue;
        }

        protected override bool EqualsCore(Paging other)
        {
            if (other == null)
            {
                return false;
            }

            return this.Page == other.Page &&
                this.PageSize == other.PageSize &&
                this.Skip == other.Skip &&
                this.Take == other.Take;
        }

        protected override int GetHashCodeCore()
        {
            return (Page + PageSize + Skip + Take).GetHashCode();
        }
    }
}
