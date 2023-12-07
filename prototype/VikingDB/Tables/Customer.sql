﻿CREATE TABLE [dbo].[Customer]
(
	[CustomerID] INT NOT NULL PRIMARY KEY IDENTITY(1001, 1), 
    [CustomerName] NVARCHAR(50) NOT NULL, 
    [CustomerNbr] NVARCHAR(20) NULL, 
    [PaymentTerms] NVARCHAR(20) NULL, 
    [GLLink] NVARCHAR(20) NULL,
    [Created] DATETIME NOT NULL DEFAULT getutcdate(), 
    [CreatedBy] INT NOT NULL, 
    [Modified] DATETIME NOT NULL DEFAULT getutcdate(), 
    [ModifiedBy] INT NOT NULL, 
)
