CREATE TABLE bins ( 
    id serial UNIQUE NOT NULL,
    path varchar(20) UNIQUE NOT NULL,
    date_created date DEFAULT CURRENT_DATE NOT NULL,
    date_last_updated timestamp,
    PRIMARY KEY (id)
);

-- CREATE TABLE requests (
--     id serial,
--     bin_id integer NOT NULL,
--     request_id_mongo text,
--     PRIMARY KEY (id),
--     FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE CASCADE
-- );