USE [MMX_Database]

INSERT INTO [dbo].tblIcon ([CreatedOn], [Name]) VALUES
(GETDATE(), 'Swimming'),
(GETDATE(), 'Money');

INSERT INTO [dbo].tblCategory([CreatedOn], [IconFk], [Name], [Type]) VALUES
(GETDATE(), 1, 'Swimming', 0),
(GETDATE(), 2, 'Income', 1);

INSERT INTO [dbo].tblTransaction([CreatedOn], [CategoryFk], [Name], [Type], [Note], [Amount]) VALUES
(GETDATE(), 1, 'Transaction1', 0,'Swimming lesson', 700),
(GETDATE(), 2, 'Transaction2', 1, 'Salary', 5000);
