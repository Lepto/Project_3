-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

SET XACT_ABORT ON

BEGIN TRANSACTION QUICKDBD

CREATE TABLE [Business] (
    [Business_ID] sting  NOT NULL ,
    [Name] string  NOT NULL ,
    [Address] string  NOT NULL ,
    [City] string  NOT NULL ,
    [State] string  NOT NULL ,
    [Latitude] float  NOT NULL ,
    [Longitude] float  NOT NULL ,
    [Stars] float  NOT NULL ,
    [Review_count] int  NOT NULL ,
    [Is_open] int  NOT NULL ,
    [Category] string  NOT NULL ,
    [Attribute] string  NOT NULL ,
    CONSTRAINT [PK_Business] PRIMARY KEY CLUSTERED (
        [Business_ID] ASC
    )
)

CREATE TABLE [Tip] (
    [Tip_ID] int  NOT NULL ,
    [User_ID] string  NOT NULL ,
    [Business_ID] string  NOT NULL ,
    [Text] string  NOT NULL ,
    [Date] string  NOT NULL ,
    CONSTRAINT [PK_Tip] PRIMARY KEY CLUSTERED (
        [Tip_ID] ASC
    )
)

CREATE TABLE [Review] (
    [Review_ID] string  NOT NULL ,
    [User_ID] string  NOT NULL ,
    [Business_ID] string  NOT NULL ,
    [Stars] float  NOT NULL ,
    [Useful] int  NOT NULL ,
    [Funny] int  NOT NULL ,
    [Cool] int  NOT NULL ,
    [Text] string  NOT NULL ,
    [Date] string  NOT NULL ,
    CONSTRAINT [PK_Review] PRIMARY KEY CLUSTERED (
        [Review_ID] ASC
    )
)

CREATE TABLE [User] (
    [User_ID] string  NOT NULL ,
    [Name] string  NOT NULL ,
    [Review_count] int  NOT NULL ,
    [Yelping_since] string  NOT NULL ,
    [Elite] string  NOT NULL ,
    [Friends_count] int  NOT NULL ,
    [Average_stars] float  NOT NULL ,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED (
        [User_ID] ASC
    )
)

ALTER TABLE [Tip] WITH CHECK ADD CONSTRAINT [FK_Tip_User_ID] FOREIGN KEY([User_ID])
REFERENCES [User] ([User_ID])

ALTER TABLE [Tip] CHECK CONSTRAINT [FK_Tip_User_ID]

ALTER TABLE [Tip] WITH CHECK ADD CONSTRAINT [FK_Tip_Business_ID] FOREIGN KEY([Business_ID])
REFERENCES [Business] ([Business_ID])

ALTER TABLE [Tip] CHECK CONSTRAINT [FK_Tip_Business_ID]

ALTER TABLE [Review] WITH CHECK ADD CONSTRAINT [FK_Review_User_ID] FOREIGN KEY([User_ID])
REFERENCES [User] ([User_ID])

ALTER TABLE [Review] CHECK CONSTRAINT [FK_Review_User_ID]

ALTER TABLE [Review] WITH CHECK ADD CONSTRAINT [FK_Review_Business_ID] FOREIGN KEY([Business_ID])
REFERENCES [Business] ([Business_ID])

ALTER TABLE [Review] CHECK CONSTRAINT [FK_Review_Business_ID]

COMMIT TRANSACTION QUICKDBD