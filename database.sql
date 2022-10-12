-- Database: fp1_hactiv8_k3

-- DROP DATABASE IF EXISTS fp1_hactiv8_k3;

CREATE DATABASE fp1_hactiv8_k3
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C.UTF-8'
    LC_CTYPE = 'C.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;



-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
    

-- Table: public.reflections

-- DROP TABLE IF EXISTS public.reflections;

CREATE TABLE IF NOT EXISTS public.reflections
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    success character varying(100) COLLATE pg_catalog."default",
    low_point character varying(100) COLLATE pg_catalog."default",
    take_away character varying(100) COLLATE pg_catalog."default",
    owner_id integer NOT NULL,
    created_date timestamp without time zone,
    modified_date timestamp without time zone,
    CONSTRAINT id_reflections PRIMARY KEY (id),
    CONSTRAINT id_user FOREIGN KEY (owner_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reflections
    OWNER to postgres;

