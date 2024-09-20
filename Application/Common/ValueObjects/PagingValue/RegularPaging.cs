namespace MMX.Common.ValueObjects.PagingValue
{
    public class RegularPaging : Paging
    {
        private const int MaxPageCount = 100;

        private RegularPaging(int page, int pageSize, int skip, int take)
            : base(page, pageSize, skip, take)
        {
        }

        private RegularPaging(int? page, int? pageSize, int maxPageSize)
            : base(page, pageSize, maxPageSize)
        {
        }

        public static RegularPaging Create(int? page, int? pageSize)
        {
            return new RegularPaging(page, pageSize, MaxPageCount);
        }

        public static RegularPaging CreateExportPagination()
        {
            return new RegularPaging(0, 100000, 0, 100000);
        }
    }
}
