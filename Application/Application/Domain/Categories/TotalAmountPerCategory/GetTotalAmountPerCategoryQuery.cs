namespace MMX.Application.Domain.Categories.TotalAmountPerCategory
{
    using MMX.Common.Mediator.Contrats;

    public class GetTotalAmountPerCategoryQuery : MmxQuery
    {
        public GetTotalAmountPerCategoryQuery(DateOnly month, bool yearly)
        {
            Month = month;
            Yearly = yearly;
        }

        public DateOnly Month { get; private set; }

        public bool Yearly { get; private set; }
    }
}
