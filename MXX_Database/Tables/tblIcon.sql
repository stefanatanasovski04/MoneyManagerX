CREATE TABLE [dbo].[tblIcon]
(
	[Id]                       INT IDENTITY (1, 1)                            NOT NULL,
    [CreatedOn]                SMALLDATETIME                                  NOT NULL,
    [DeletedOn]                SMALLDATETIME                                  NULL,
    [PhotoUrl]                 VARCHAR(100)                                   NOT NULL,
    [SysStartTime]             DATETIME2 GENERATED ALWAYS AS ROW START        NOT NULL,
    [SysEndTime]               DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN   NOT NULL,
    PERIOD FOR SYSTEM_TIME ([SysStartTime],[SysEndTime]),
    CONSTRAINT [PK_tblIcon] PRIMARY KEY CLUSTERED ([Id] ASC)
)
WITH
(
    SYSTEM_VERSIONING = ON (HISTORY_TABLE = [dbo].[tblIconHistory], DATA_CONSISTENCY_CHECK = ON)
)
