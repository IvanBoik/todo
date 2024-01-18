create database todo_list;

CREATE TABLE IF NOT EXISTS users
(
    id bigserial,
    email character varying(255),
    name character varying(255),
    password character varying(255),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tasks
(
    deadline_date date,
    deadline_time time(6) without time zone,
    is_done boolean NOT NULL,
    priority integer,
    date_added timestamp(6) without time zone,
    id bigserial,
    id_user bigint NOT NULL,
    description character varying(255),
    title character varying(255),
    CONSTRAINT tasks_pkey PRIMARY KEY (id),
    CONSTRAINT fkl78vfuynuac03yavfpfru3sb9 FOREIGN KEY (id_user)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);