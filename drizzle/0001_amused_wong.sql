CREATE TABLE IF NOT EXISTS "test2" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(30),
	"description" varchar(60),
	"creationdate" date,
	"ispending" boolean
);
