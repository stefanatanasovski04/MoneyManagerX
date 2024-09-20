namespace MMX.Common.Dtos
{
    using System.Collections.Generic;

    public class ListResultDto<T>
    {
        public IEnumerable<T> List { get; set; }

        public int TotalCount { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }
    }
}
