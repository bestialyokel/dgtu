--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: appeals; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.appeals (
    idappeal integer NOT NULL,
    idcontract integer,
    descr text
);


ALTER TABLE public.appeals OWNER TO ddbachur;

--
-- Name: appeals_idappeal_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.appeals_idappeal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appeals_idappeal_seq OWNER TO ddbachur;

--
-- Name: appeals_idappeal_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.appeals_idappeal_seq OWNED BY public.appeals.idappeal;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.clients (
    idclient integer NOT NULL,
    name text,
    surname text,
    patronymic text,
    phonenumber text
);


ALTER TABLE public.clients OWNER TO ddbachur;

--
-- Name: clients_idclient_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.clients_idclient_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_idclient_seq OWNER TO ddbachur;

--
-- Name: clients_idclient_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.clients_idclient_seq OWNED BY public.clients.idclient;


--
-- Name: contracts; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.contracts (
    idcontract integer NOT NULL,
    idclient integer,
    idtariff integer,
    address text,
    type character varying(1)
);


ALTER TABLE public.contracts OWNER TO ddbachur;

--
-- Name: contracts_idcontract_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.contracts_idcontract_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contracts_idcontract_seq OWNER TO ddbachur;

--
-- Name: contracts_idcontract_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.contracts_idcontract_seq OWNED BY public.contracts.idcontract;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.jobs (
    idjob integer NOT NULL,
    idappeal integer,
    descr text
);


ALTER TABLE public.jobs OWNER TO ddbachur;

--
-- Name: jobs_idjob_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.jobs_idjob_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_idjob_seq OWNER TO ddbachur;

--
-- Name: jobs_idjob_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.jobs_idjob_seq OWNED BY public.jobs.idjob;


--
-- Name: logins; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.logins (
    idlogin integer NOT NULL,
    iduser integer,
    key text NOT NULL,
    role character varying(1)
);


ALTER TABLE public.logins OWNER TO ddbachur;

--
-- Name: logins_idlogin_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.logins_idlogin_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logins_idlogin_seq OWNER TO ddbachur;

--
-- Name: logins_idlogin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.logins_idlogin_seq OWNED BY public.logins.idlogin;


--
-- Name: services; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.services (
    idservice integer NOT NULL,
    name text
);


ALTER TABLE public.services OWNER TO ddbachur;

--
-- Name: services_idservice_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.services_idservice_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_idservice_seq OWNER TO ddbachur;

--
-- Name: services_idservice_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.services_idservice_seq OWNED BY public.services.idservice;


--
-- Name: tariffs; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.tariffs (
    idtariff integer NOT NULL,
    name text,
    payment real,
    period integer
);


ALTER TABLE public.tariffs OWNER TO ddbachur;

--
-- Name: tariffs_idtariff_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.tariffs_idtariff_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tariffs_idtariff_seq OWNER TO ddbachur;

--
-- Name: tariffs_idtariff_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.tariffs_idtariff_seq OWNED BY public.tariffs.idtariff;


--
-- Name: tdeps; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.tdeps (
    idservice integer,
    idtariff integer
);


ALTER TABLE public.tdeps OWNER TO ddbachur;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.users (
    iduser integer NOT NULL,
    login text,
    password text,
    role character varying(1),
    CONSTRAINT users_login_check CHECK ((length(login) > 5)),
    CONSTRAINT users_login_check1 CHECK ((length(login) > 5))
);


ALTER TABLE public.users OWNER TO ddbachur;

--
-- Name: users_iduser_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.users_iduser_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_iduser_seq OWNER TO ddbachur;

--
-- Name: users_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.users_iduser_seq OWNED BY public.users.iduser;


--
-- Name: workers; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.workers (
    idworker integer NOT NULL,
    idjob integer,
    name text,
    surname text,
    patronymic text,
    qual text
);


ALTER TABLE public.workers OWNER TO ddbachur;

--
-- Name: workers_idworker_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.workers_idworker_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workers_idworker_seq OWNER TO ddbachur;

--
-- Name: workers_idworker_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.workers_idworker_seq OWNED BY public.workers.idworker;


--
-- Name: appeals idappeal; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.appeals ALTER COLUMN idappeal SET DEFAULT nextval('public.appeals_idappeal_seq'::regclass);


--
-- Name: clients idclient; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.clients ALTER COLUMN idclient SET DEFAULT nextval('public.clients_idclient_seq'::regclass);


--
-- Name: contracts idcontract; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.contracts ALTER COLUMN idcontract SET DEFAULT nextval('public.contracts_idcontract_seq'::regclass);


--
-- Name: jobs idjob; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.jobs ALTER COLUMN idjob SET DEFAULT nextval('public.jobs_idjob_seq'::regclass);


--
-- Name: logins idlogin; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.logins ALTER COLUMN idlogin SET DEFAULT nextval('public.logins_idlogin_seq'::regclass);


--
-- Name: services idservice; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.services ALTER COLUMN idservice SET DEFAULT nextval('public.services_idservice_seq'::regclass);


--
-- Name: tariffs idtariff; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tariffs ALTER COLUMN idtariff SET DEFAULT nextval('public.tariffs_idtariff_seq'::regclass);


--
-- Name: users iduser; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.users ALTER COLUMN iduser SET DEFAULT nextval('public.users_iduser_seq'::regclass);


--
-- Name: workers idworker; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.workers ALTER COLUMN idworker SET DEFAULT nextval('public.workers_idworker_seq'::regclass);


--
-- Data for Name: appeals; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.appeals (idappeal, idcontract, descr) FROM stdin;
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.clients (idclient, name, surname, patronymic, phonenumber) FROM stdin;
\.


--
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.contracts (idcontract, idclient, idtariff, address, type) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.jobs (idjob, idappeal, descr) FROM stdin;
\.


--
-- Data for Name: logins; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.logins (idlogin, iduser, key, role) FROM stdin;
27	3	31a8ce514ba63f657b1605104118ca77	t
28	4	bc19f0f6796aed1d2c95ae61051c0f8e	d
29	5	fd7622bf94e10d0a237ede30fcd7accd	a
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.services (idservice, name) FROM stdin;
\.


--
-- Data for Name: tariffs; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.tariffs (idtariff, name, payment, period) FROM stdin;
\.


--
-- Data for Name: tdeps; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.tdeps (idservice, idtariff) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.users (iduser, login, password, role) FROM stdin;
3	tech123	tech123	t
4	dev123	dev123	d
5	acc123	acc123	a
\.


--
-- Data for Name: workers; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.workers (idworker, idjob, name, surname, patronymic, qual) FROM stdin;
1	\N	work	wer	mont	\N
2	\N	work1	wer1	mont1	\N
\.


--
-- Name: appeals_idappeal_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.appeals_idappeal_seq', 7, true);


--
-- Name: clients_idclient_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.clients_idclient_seq', 3, true);


--
-- Name: contracts_idcontract_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.contracts_idcontract_seq', 4, true);


--
-- Name: jobs_idjob_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.jobs_idjob_seq', 5, true);


--
-- Name: logins_idlogin_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.logins_idlogin_seq', 29, true);


--
-- Name: services_idservice_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.services_idservice_seq', 1, false);


--
-- Name: tariffs_idtariff_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.tariffs_idtariff_seq', 1, false);


--
-- Name: users_iduser_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.users_iduser_seq', 5, true);


--
-- Name: workers_idworker_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.workers_idworker_seq', 2, true);


--
-- Name: appeals appeals_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.appeals
    ADD CONSTRAINT appeals_pkey PRIMARY KEY (idappeal);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (idclient);


--
-- Name: contracts contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY (idcontract);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (idjob);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (idservice);


--
-- Name: tariffs tariffs_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tariffs
    ADD CONSTRAINT tariffs_pkey PRIMARY KEY (idtariff);


--
-- Name: tdeps tdeps_idtariff_idservice_key; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tdeps
    ADD CONSTRAINT tdeps_idtariff_idservice_key UNIQUE (idtariff, idservice);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (iduser);


--
-- Name: workers workers_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_pkey PRIMARY KEY (idworker);


--
-- Name: appeals appeals_idcontract_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.appeals
    ADD CONSTRAINT appeals_idcontract_fkey FOREIGN KEY (idcontract) REFERENCES public.contracts(idcontract) ON DELETE CASCADE;


--
-- Name: contracts contracts_idclient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_idclient_fkey FOREIGN KEY (idclient) REFERENCES public.clients(idclient) ON DELETE CASCADE;


--
-- Name: contracts contracts_idtariff_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_idtariff_fkey FOREIGN KEY (idtariff) REFERENCES public.tariffs(idtariff) ON DELETE SET NULL;


--
-- Name: jobs jobs_idappeal_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_idappeal_fkey FOREIGN KEY (idappeal) REFERENCES public.appeals(idappeal) ON DELETE SET NULL;


--
-- Name: logins logins_iduser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.logins
    ADD CONSTRAINT logins_iduser_fkey FOREIGN KEY (iduser) REFERENCES public.users(iduser);


--
-- Name: tdeps tdeps_idservice_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tdeps
    ADD CONSTRAINT tdeps_idservice_fkey FOREIGN KEY (idservice) REFERENCES public.services(idservice) ON DELETE CASCADE;


--
-- Name: tdeps tdeps_idtariff_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tdeps
    ADD CONSTRAINT tdeps_idtariff_fkey FOREIGN KEY (idtariff) REFERENCES public.tariffs(idtariff) ON DELETE CASCADE;


--
-- Name: workers workers_idjob_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_idjob_fkey FOREIGN KEY (idjob) REFERENCES public.jobs(idjob) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

