CREATE TABLE [dbo].[tblTransaction]
(
    [Id]                       INT IDENTITY (1, 1)                            NOT NULL,
    [CreatedOn]                SMALLDATETIME                                  NOT NULL,
    [DeletedOn]                SMALLDATETIME                                  NULL,
    [CategoryFk]               INT                                            NOT NULL,
    [Name]                     VARCHAR(50)                                    NULL,
    [Type]                     INT                                            NOT NULL,
    [Amount]                   MONEY                                          NOT NULL,
    [TransactionDate]          DATE                                           NOT NULL,
    [TransactionTime]          TIME                                           NOT NULL,
    [SysStartTime]             DATETIME2 GENERATED ALWAYS AS ROW START        NOT NULL,
    [SysEndTime]               DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN   NOT NULL,
    PERIOD FOR SYSTEM_TIME ([SysStartTime],[SysEndTime]),
    CONSTRAINT [PK_tblTransaction] PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_tblTransaction_tblCategory] FOREIGN KEY ([CategoryFk]) REFERENCES [dbo].[tblCategory] ([Id]),

)
WITH
(
    SYSTEM_VERSIONING = ON (HISTORY_TABLE = [dbo].[tblTransactionHistory], DATA_CONSISTENCY_CHECK = ON)
)