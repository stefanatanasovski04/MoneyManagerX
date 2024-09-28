USE [MMX_Database]

INSERT INTO [dbo].tblIcon ([CreatedOn], [PhotoUrl]) VALUES
(GETDATE(), '/assets/images/icons8-bill-96.png'),
(GETDATE(), '/assets/images/icons8-bread-96.png'),
(GETDATE(), '/assets/images/icons8-candy-96.png'),
(GETDATE(), '/assets/images/icons8-cutlery-96.png'),
(GETDATE(), '/assets/images/icons8-garage-96.png'),
(GETDATE(), '/assets/images/icons8-grapes-96.png'),
(GETDATE(), '/assets/images/icons8-office-chair-96.png'),
(GETDATE(), '/assets/images/icons8-office-phone-96.png'),
(GETDATE(), '/assets/images/icons8-soccer-ball-96.png'),
(GETDATE(), '/assets/images/icons8-swimming-96.png'),
(GETDATE(), '/assets/images/icons8-hamburger-96.png');

INSERT INTO [dbo].tblCategory([CreatedOn], [IconFk], [Name], [Type]) VALUES
(GETDATE(), 1, 'Sports', 0),
(GETDATE(), 2, 'Salary', 1);

INSERT INTO [dbo].tblTransaction([CreatedOn], [CategoryFk], [Name], [Type], [Amount], [TransactionDate], [TransactionTime]) VALUES
(GETDATE(), 1, 'Football', 0, 700, GETDATE(), GETDATE()),
(GETDATE(), 2, 'January Sallary', 1, 5000, GETDATE(), GETDATE());
