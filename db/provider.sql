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
    idcontract integer NOT NULL,
    status text NOT NULL,
    appealdate date NOT NULL,
    description text,
    CONSTRAINT appeals_description_check CHECK ((length(description) > 20))
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
    surname text NOT NULL,
    name text NOT NULL,
    patronymic text NOT NULL,
    phonenumber text NOT NULL
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
    idclient integer NOT NULL,
    idtariff integer,
    address text NOT NULL,
    type text NOT NULL,
    conclusiondate date NOT NULL
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
    idappeal integer NOT NULL,
    starttime date NOT NULL,
    complexity text NOT NULL,
    status text NOT NULL
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
-- Name: providers; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.providers (
    idprovider integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.providers OWNER TO ddbachur;

--
-- Name: providers_idprovider_seq; Type: SEQUENCE; Schema: public; Owner: ddbachur
--

CREATE SEQUENCE public.providers_idprovider_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.providers_idprovider_seq OWNER TO ddbachur;

--
-- Name: providers_idprovider_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ddbachur
--

ALTER SEQUENCE public.providers_idprovider_seq OWNED BY public.providers.idprovider;


--
-- Name: services; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.services (
    idservice integer NOT NULL,
    idprovider integer NOT NULL,
    name text NOT NULL
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
    idprovider integer NOT NULL,
    name text NOT NULL,
    payment real,
    period integer,
    CONSTRAINT tariffs_payment_check CHECK ((payment >= (0)::double precision)),
    CONSTRAINT tariffs_period_check CHECK ((period >= 0))
);


ALTER TABLE public.tariffs OWNER TO ddbachur;

--
-- Name: tariffs_dependencies; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.tariffs_dependencies (
    idtariff integer NOT NULL,
    idservice integer NOT NULL
);


ALTER TABLE public.tariffs_dependencies OWNER TO ddbachur;

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
-- Name: workers; Type: TABLE; Schema: public; Owner: ddbachur
--

CREATE TABLE public.workers (
    idworker integer NOT NULL,
    idprovider integer NOT NULL,
    idjob integer,
    surname text NOT NULL,
    name text NOT NULL,
    patronymic text NOT NULL,
    qualification text,
    CONSTRAINT workers_qualification_check CHECK ((length(qualification) > 15))
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
-- Name: providers idprovider; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.providers ALTER COLUMN idprovider SET DEFAULT nextval('public.providers_idprovider_seq'::regclass);


--
-- Name: services idservice; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.services ALTER COLUMN idservice SET DEFAULT nextval('public.services_idservice_seq'::regclass);


--
-- Name: tariffs idtariff; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tariffs ALTER COLUMN idtariff SET DEFAULT nextval('public.tariffs_idtariff_seq'::regclass);


--
-- Name: workers idworker; Type: DEFAULT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.workers ALTER COLUMN idworker SET DEFAULT nextval('public.workers_idworker_seq'::regclass);


--
-- Data for Name: appeals; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.appeals (idappeal, idcontract, status, appealdate, description) FROM stdin;
2	2	c	2019-11-23	net interneta 20 simvolov .....
1	1	c	2019-11-23	net interneta 20 simvolov .....
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.clients (idclient, surname, name, patronymic, phonenumber) FROM stdin;
1	Bachurin	Danila	Dmitrievich	89613308969
2	Tezt	Abcd	val	89003005050
\.


--
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.contracts (idcontract, idclient, idtariff, address, type, conclusiondate) FROM stdin;
1	1	1	rostov, pl. gagarina 1	f	2019-11-23
2	2	1	rostov, pl. gagarina 2	f	2019-11-23
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.jobs (idjob, idappeal, starttime, complexity, status) FROM stdin;
1	1	2019-11-23	ochen slojno	c
2	2	2019-11-23	lehko	c
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.providers (idprovider, name) FROM stdin;
1	rostelecom
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.services (idservice, idprovider, name) FROM stdin;
1	1	internet
2	1	svyaz
3	1	tv
\.


--
-- Data for Name: tariffs; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.tariffs (idtariff, idprovider, name, payment, period) FROM stdin;
1	1	bazovi	499.98999	2592000
\.


--
-- Data for Name: tariffs_dependencies; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.tariffs_dependencies (idtariff, idservice) FROM stdin;
1	1
1	2
1	3
\.


--
-- Data for Name: workers; Type: TABLE DATA; Schema: public; Owner: ddbachur
--

COPY public.workers (idworker, idprovider, idjob, surname, name, patronymic, qualification) FROM stdin;
2	1	\N	Ivanovich	Ivan	Ivanov	montajnik horosho rabotaet 15 simvolov
\.


--
-- Name: appeals_idappeal_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.appeals_idappeal_seq', 2, true);


--
-- Name: clients_idclient_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.clients_idclient_seq', 2, true);


--
-- Name: contracts_idcontract_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.contracts_idcontract_seq', 2, true);


--
-- Name: jobs_idjob_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.jobs_idjob_seq', 2, true);


--
-- Name: providers_idprovider_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.providers_idprovider_seq', 1, true);


--
-- Name: services_idservice_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.services_idservice_seq', 3, true);


--
-- Name: tariffs_idtariff_seq; Type: SEQUENCE SET; Schema: public; Owner: ddbachur
--

SELECT pg_catalog.setval('public.tariffs_idtariff_seq', 1, true);


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
-- Name: clients clients_phonenumber_key; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_phonenumber_key UNIQUE (phonenumber);


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
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (idprovider);


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
-- Name: workers workers_pkey; Type: CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_pkey PRIMARY KEY (idworker);


--
-- Name: appeals appeals_idcontract_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.appeals
    ADD CONSTRAINT appeals_idcontract_fkey FOREIGN KEY (idcontract) REFERENCES public.contracts(idcontract);


--
-- Name: contracts contracts_idclient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_idclient_fkey FOREIGN KEY (idclient) REFERENCES public.clients(idclient);


--
-- Name: contracts contracts_idtariff_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_idtariff_fkey FOREIGN KEY (idtariff) REFERENCES public.tariffs(idtariff);


--
-- Name: jobs jobs_idappeal_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_idappeal_fkey FOREIGN KEY (idappeal) REFERENCES public.appeals(idappeal);


--
-- Name: services services_idprovider_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_idprovider_fkey FOREIGN KEY (idprovider) REFERENCES public.providers(idprovider);


--
-- Name: tariffs_dependencies tariffs_dependencies_idservice_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tariffs_dependencies
    ADD CONSTRAINT tariffs_dependencies_idservice_fkey FOREIGN KEY (idservice) REFERENCES public.services(idservice);


--
-- Name: tariffs_dependencies tariffs_dependencies_idtariff_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tariffs_dependencies
    ADD CONSTRAINT tariffs_dependencies_idtariff_fkey FOREIGN KEY (idtariff) REFERENCES public.tariffs(idtariff);


--
-- Name: tariffs tariffs_idprovider_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.tariffs
    ADD CONSTRAINT tariffs_idprovider_fkey FOREIGN KEY (idprovider) REFERENCES public.providers(idprovider);


--
-- Name: workers workers_idjob_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_idjob_fkey FOREIGN KEY (idjob) REFERENCES public.jobs(idjob);


--
-- Name: workers workers_idprovider_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ddbachur
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_idprovider_fkey FOREIGN KEY (idprovider) REFERENCES public.providers(idprovider);


--
-- PostgreSQL database dump complete
--

