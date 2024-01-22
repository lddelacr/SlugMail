--
-- All SQL statements must be on a single line and end in a semicolon.
--

-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
-- DROP TABLE IF EXISTS mail;

-- CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), mailbox VARCHAR(32), mail jsonb);

DROP TABLE IF EXISTS person cascade;

CREATE TABLE person(fullname VARCHAR(70), email VARCHAR(32) UNIQUE PRIMARY KEY, pass VARCHAR(100));

DROP TABLE IF EXISTS boxer cascade;

CREATE TABLE boxer(email VARCHAR(32), mailbox VARCHAR(32), mailboxId VARCHAR(100) PRIMARY KEY, FOREIGN KEY (email) REFERENCES person(email));

DROP TABLE IF EXISTS mail;

CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), mailbox VARCHAR(32), mail jsonb);