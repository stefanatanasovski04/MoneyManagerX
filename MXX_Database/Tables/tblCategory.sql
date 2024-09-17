CREATE TABLE [dbo].[tblCategory]
(
	[Id]                       INT IDENTITY (1, 1)                            NOT NULL,
    [CreatedOn]                SMALLDATETIME                                  NOT NULL,
    [DeletedOn]                SMALLDATETIME                                  NULL,
    [IconFk]                   INT                                            NOT NULL,
    [Name]                     VARCHAR(50)                                    NOT NULL,
    [Type]                     INT                                            NOT NULL,
    [SysStartTime]             DATETIME2 GENERATED ALWAYS AS ROW START        NOT NULL,
    [SysEndTime]               DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN   NOT NULL,
    PERIOD FOR SYSTEM_TIME ([SysStartTime],[SysEndTime]),
    CONSTRAINT [PK_tblCategory] PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_tblCategory_tblIcon] FOREIGN KEY ([IconFk]) REFERENCES [dbo].[tblIcon] ([Id]),
)
WITH
(
    SYSTEM_VERSIONING = ON (HISTORY_TABLE = [dbo].[tblCategoryHistory], DATA_CONSISTENCY_CHECK = ON)
)