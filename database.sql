
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- CREATE clubs TABLE
CREATE TABLE "clubs" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80),
    "date" date DEFAULT now(),
    "book_title" VARCHAR (255),
    "author" VARCHAR (255),
    "image_url" VARCHAR (255),
    "description" VARCHAR (800)
);

-- CREATE discussion TABLE
CREATE TABLE "discussion" (
    "id" SERIAL PRIMARY KEY,
    "content" VARCHAR (1000),
    "clubs_id" INT REFERENCES clubs(id) ON DELETE CASCADE,
    "user_id" INT REFERENCES user(id),
    "date" date DEFAULT now()
);

-- CREATE JUNCTION user_clubs
CREATE TABLE "user_clubs" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES user(id),
    "clubs_id" INT REFERENCES clubs(id),
    "invite_accepted" boolean DEFAULT false,
    "admin_status" boolean DEFAULT false
);


