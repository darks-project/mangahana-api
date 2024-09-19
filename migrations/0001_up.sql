CREATE SCHEMA users;

CREATE TABLE users.users (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(20) NOT NULL,
  phone       VARCHAR(10) UNIQUE NOT NULL,
  password    VARCHAR(1024) NOT NULL,
  description TEXT,
  photo       TEXT,
  role_id     INT DEFAULT 1,
  is_banned   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE users.confirmation_codes (
  code        VARCHAR(12) UNIQUE NOT NULL,
  phone       VARCHAR(10) NOT NULL,
  created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users.sessions (
  user_id    SERIAL NOT NULL,
  token      VARCHAR(128) NOT NULL UNIQUE,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users.roles (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  permissions INTEGER[] NOT NULL DEFAULT '{}'
);
INSERT INTO users.roles (name) VALUES ('Қолданушы');

CREATE TABLE users.permissions (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO users.permissions (name) VALUES ('approve_team');




-- teams
CREATE SCHEMA teams;

CREATE TABLE teams.teams (
  id          SERIAL PRIMARY KEY,
  owner_id    SERIAL NOT NULL,
  type_id     SERIAL NOT NULL,
  name        VARCHAR(64) NOT NULL,
  description TEXT,
  photo       TEXT,
  approved    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams.types (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO teams.types (name) VALUES ('Аударма'), ('Баспа'), ('Автор');

CREATE TABLE teams.members (
  team_id SERIAL NOT NULL,
  user_id SERIAL NOT NULL
);



CREATE SCHEMA books;

CREATE TABLE books.books (
  id            SERIAL PRIMARY KEY,
  link          VARCHAR(50) NOT NULL UNIQUE,
  name          VARCHAR(100) NOT NULL,
  original_name VARCHAR(100) NOT NULL,
  poster        VARCHAR(128),
  description   TEXT NOT NULL,
  type_id       INTEGER NOT NULL,
  author_id     INTEGER NOT NULL,
  artist_id     INTEGER NOT NULL,
  genres        INTEGER[] NOT NULL DEFAULT '{}',
  public_date   DATE NOT NULL,
  created_at    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books.chapters (
  id      VARCHAR(32) UNIQUE NOT NULL,
  book_id INTEGER NOT NULL,
  name    VARCHAR(100) NOT NULL,
  chapter_order   VARCHAR(50) NOT NULL
);

CREATE TABLE books.pages (
  chapter_id INTEGER NOT NULL,
  page_order      SERIAL NOT NULL,
  path       TEXT NOT NULL
);

CREATE TABLE books.types (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE books.genres (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE books.persons (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(50) NOT NULL,
  photo VARCHAR(128)
);