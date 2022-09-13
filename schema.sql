CREATE DATABASE request_box;

CREATE TABLE bins ( 
    id serial UNIQUE NOT NULL,
    path varchar(20) UNIQUE NOT NULL,
    date_created date,
    date_last_updated timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE requests (
    id serial,
    bin_id integer NOT NULL,
    request_id_mongo text,
    PRIMARY KEY (id),
    FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE CASCADE
);

-- CREATE TABLE requests (
--     id serial UNIQUE NOT NULL,
--     bin_id 
-- );

-- 1 path (fdkfeiruoh)
-- 2 path (euvdueoins)
-- 3 path (dfkhdjklji)

-- request-box.net/fdkfeiruoh
-- request-box.net/euvdueoins
-- request-box.net/dfkhdjklji

