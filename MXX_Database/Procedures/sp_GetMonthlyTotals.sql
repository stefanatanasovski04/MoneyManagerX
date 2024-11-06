CREATE PROCEDURE [dbo].[sp_GetMonthlyTotals]
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        MONTH(TransactionDate) AS TransactionMonth,
        SUM(CASE WHEN Type = 0 THEN Amount ELSE 0 END) AS Expense,
        SUM(CASE WHEN Type = 1 THEN Amount ELSE 0 END) AS Income
    FROM [dbo].[tblTransaction]
    WHERE YEAR(TransactionDate) = @Year
      AND Type IN (0, 1)
      AND DeletedOn IS NULL
    GROUP BY 
        MONTH(TransactionDate)
    ORDER BY 
        TransactionMonth;
END;