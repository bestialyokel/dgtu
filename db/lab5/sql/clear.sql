
DROP TYPE IF EXISTS Contract_Type CASCADE;
DROP TYPE IF EXISTS Processing_Status CASCADE;
DROP TYPE IF EXISTS User_Role CASCADE;

DROP TABLE IF EXISTS Clients   CASCADE;
DROP TABLE IF EXISTS Contracts CASCADE;
DROP TABLE IF EXISTS Appeals   CASCADE;
DROP TABLE IF EXISTS Jobs      CASCADE;
DROP TABLE IF EXISTS Workers   CASCADE;
DROP TABLE IF EXISTS Services  CASCADE;
DROP TABLE IF EXISTS Tariffs   CASCADE;
DROP TABLE IF EXISTS TSPairs   CASCADE;
DROP TABLE IF EXISTS Users     CASCADE;
DROP TABLE IF EXISTS Logins    CASCADE;


DROP TABLE IF EXISTS Clients_tmp   CASCADE;
DROP TABLE IF EXISTS Contracts_tmp CASCADE;
DROP TABLE IF EXISTS Appeals_tmp   CASCADE;
DROP TABLE IF EXISTS Jobs_tmp      CASCADE;
DROP TABLE IF EXISTS Workers_tmp   CASCADE;
DROP TABLE IF EXISTS Services_tmp  CASCADE;
DROP TABLE IF EXISTS Tariffs_tmp   CASCADE;
DROP TABLE IF EXISTS TSPairs_tmp   CASCADE; 

DROP FUNCTION IF EXISTS services_handler;
DROP FUNCTION IF EXISTS tariffs_handler;
DROP FUNCTION IF EXISTS tspairs_handler;
DROP FUNCTION IF EXISTS clients_handler;
DROP FUNCTION IF EXISTS contracts_handler;
DROP FUNCTION IF EXISTS appeals_handler;
DROP FUNCTION IF EXISTS jobs_handler;
DROP FUNCTION IF EXISTS workers_handler;
