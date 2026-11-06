CREATE TABLE users (
    id UUID PRIMARY KEY,
    "user" TEXT NOT NULL,
    email TEXT NOT NULL,
    passwd TEXT NOT NULL,
    CONSTRAINT users_email_not_blank CHECK (length(trim(email)) > 0),
    CONSTRAINT users_passwd_not_blank CHECK (length(passwd) > 0)
);

CREATE UNIQUE INDEX users_email_unique ON users (lower(email));
