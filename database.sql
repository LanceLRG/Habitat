
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


--Test data--
INSERT INTO "user" ("username", "password")
VALUEs ('admin', 'admin'); -- register for this manually for password encryption

INSERT INTO "primary_task" ("date", "user_id")
VALUES ('2020-02-19', '1');

INSERT INTO "task" ("name", "style", "icon", "date_created", "user_id", "primary_id" )
VALUES ('Test', 'Single', 'NA', '2020-02-19', '1', '1');

INSERT INTO "task_specs" ("amount", "unit", "task_id" )
VALUES ('9001', 'internets', '3');