namespace MMX.Common.ValueObjects.SortingValue
{
    using System.Linq.Expressions;
    using System.Reflection;

    public static class Ordering
    {
        public static IQueryable<TSource> ApplyOrder<TSource>(this IQueryable<TSource> source, Sorting sorting, Expression<Func<TSource, object>> defaultSorting)
        {
            Type sourceType = typeof(TSource);
            ParameterExpression parameter = Expression.Parameter(sourceType, "p");

            CallInfo callInfo = GetExpressionDeep(parameter, sourceType, sorting.ColumnName.Split('.'));
            if (callInfo.IsError)
            {
                return source.OrderByDescending(defaultSorting);
            }

            LambdaExpression orderByExp = Expression.Lambda(callInfo.MemberAccess, parameter);
            MethodCallExpression resultExp;

            if (sorting.SortDirection == SortDirection.Asc)
            {
                resultExp = Expression.Call(typeof(Queryable), "OrderBy", new Type[] { sourceType, callInfo.MemberType }, source.Expression, Expression.Quote(orderByExp));
            }
            else
            {
                resultExp = Expression.Call(typeof(Queryable), "OrderByDescending", new Type[] { sourceType, callInfo.MemberType }, source.Expression, Expression.Quote(orderByExp));
            }

            return source.Provider.CreateQuery<TSource>(resultExp);
        }

        private static CallInfo GetExpressionDeep(Expression runningAccess, Type type, string[] args)
        {
            PropertyInfo currentProperty = type.GetProperty(args[0]);
            if (currentProperty == null)
            {
                return CallInfo.Error;
            }

            if (args.Length == 1)
            {
                return new CallInfo
                {
                    MemberAccess = Expression.MakeMemberAccess(runningAccess, currentProperty),
                    MemberType = currentProperty.PropertyType,
                    IsError = false
                };
            }

            return GetExpressionDeep(Expression.MakeMemberAccess(runningAccess, currentProperty), currentProperty.PropertyType, args.Skip(1).ToArray());
        }

        private class CallInfo
        {
            public MemberExpression MemberAccess { get; set; }

            public Type MemberType { get; set; }

            public bool IsError { get; set; }

            public static readonly CallInfo Error = new CallInfo { IsError = true };
        }
    }
}
