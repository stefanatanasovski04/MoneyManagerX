USE [MMX_Database]

INSERT INTO [dbo].tblIcon ([CreatedOn], [Name]) VALUES
(GETDATE(), 'SportsIcon'),
(GETDATE(), 'MoneyIcon');

INSERT INTO [dbo].tblCategory([CreatedOn], [IconFk], [Name], [Type]) VALUES
(GETDATE(), 1, 'Sports', 0),
(GETDATE(), 2, 'Salary', 1);

INSERT INTO [dbo].tblTransaction([CreatedOn], [CategoryFk], [Name], [Type], [Amount], [TransactionDate], [TransactionTime]) VALUES
(GETDATE(), 1, 'Football', 0, 700, GETDATE(), GETDATE()),
(GETDATE(), 2, 'January Sallary', 1, 5000, GETDATE(), GETDATE());
