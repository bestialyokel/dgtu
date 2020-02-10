CREATE OR REPLACE PROCEDURE ROLLBACK_SERVICE(id integer, to_date timestamp) AS $$
    DECLARE
        _service_rec RECORD;
        updated_id integer;
    BEGIN
        SELECT INTO _service_rec * 
            FROM Services_tmp as STmp
            WHERE STmp.id_service = id AND STmp.create_date <= to_date
            ORDER BY create_date DESC
            LIMIT 1;
        -- not created yet?
        IF _service_rec IS NULL THEN 
            DELETE FROM Services WHERE id_service = id;
            RETURN;
        END IF;
        -- try update
        UPDATE Services SET 
            name = _service_rec.name, 
            description = _service_rec.description
        WHERE id_service = _service_rec.id_service RETURNING id_service;
        -- if wasnt updated -> insert???
        IF NOT FOUND THEN
            INSERT INTO Services(id_service, name, description) VALUES (_service_rec.id_service, _service_rec.name, _service_rec.description);
        END IF;
    END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE ROLLBACK_TARIFF(id integer, to_date timestamp) AS $$
    DECLARE
        _tariff_rec RECORD;
    BEGIN
        SELECT INTO _tariff_rec * 
            FROM Tariffs_tmp as TTmp
            WHERE TTmp.id_tariff = id AND TTmp.create_date <= to_date
            ORDER BY create_date DESC
            LIMIT 1;
        -- not created yet?
        IF _tariff_rec IS NULL THEN 
            DELETE FROM Tariffs WHERE id_tariff = id;
            RETURN;
        END IF;
        -- update & save updated_id
        UPDATE Tariffs SET 
            name = _tariff_rec.name, 
            payment = _tariff_rec.period,
            period = _tariff_rec.period
        WHERE id_tariff = _tariff_rec.id_tariff RETURNING id_tariff;

        -- if wasnt updated???
        IF NOT FOUND THEN
            INSERT INTO Tariffs(id_tariff, payment, patronymic) VALUES (_tariff_rec.id_tariff, _tariff_rec.payment, _tariff_rec.patronymic);
        END IF;
    END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ROLLBACK_CLIENT(id integer, to_date timestamp) AS $$
    DECLARE
        _client_rec RECORD;
    BEGIN
        SELECT INTO _client_rec * 
            FROM Clients_tmp as CLTmp
            WHERE CLTmp.id_client = id AND CLTmp.create_date <= to_date
            ORDER BY create_date DESC
            LIMIT 1;
        -- not created yet?
        IF _client_rec IS NULL THEN 
            DELETE FROM Clients WHERE id_client = id;
            RETURN;
        END IF;
        -- update & save updated_id
        UPDATE Clients SET 
            name = _client_rec.name, 
            surname = _client_rec.surname,
            patronymic = _client_rec.patronymic,
            phone_number = _client_rec.phone_number
        WHERE id_client = _client_rec.id_client RETURNING id_client;

        -- if wasnt updated???
        IF NOT FOUND THEN
            INSERT INTO Clients(id_client, name, surname, patronymic, phone_number) VALUES (_client_rec.id_client, _client_rec.name, _client_rec.surname, _client_rec.patronymic, _client_rec.phone_number);
        END IF;
    END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE ROLLBACK_CONTRACT(id integer, to_date timestamp) AS $$
    DECLARE
        _contract_rec RECORD;
    BEGIN
        SELECT INTO _contract_rec * 
            FROM Contracts_tmp as COTmp
            WHERE COTmp.id_contract = id AND COTmp.create_date <= to_date
            ORDER BY create_date DESC
            LIMIT 1;
        -- not created yet?
        IF _contract_rec IS NULL THEN 
            DELETE FROM Contracts WHERE id_contract = id;
            RETURN;
        END IF;
        -- client doesnt exist*
        IF (SELECT * FROM Clients WHERE id_client = _contract_rec.id_client) IS NULL THEN
            raise notice 'client:id_client=% hasnt restored yet', _contract_rec.id_client;
            RETURN;
        END IF;
        -- update & save updated_id
        UPDATE Contracts SET
            id_client = _contract_rec.id_client, 
            id_tariff = _contract_rec.id_tariff,
            address = _contract_rec.address,
            contract_type = _contract_rec.contract_type 
        WHERE id_contract = _contract_rec.id_contract RETURNING id_contract;
        -- if wasnt updated???
        IF NOT FOUND THEN
            INSERT INTO Contracts(id_contract, id_client, id_tariff, address, contract_type) 
                VALUES (_contract_rec.id_contract, _client_rec.name, _client_rec.surname, _client_rec.patronymic, _client_rec.phone_number)
                ON CONFLICT (id_tariff) DO UPDATE SET id_tariff = NULL;
                -- if tariff doesnt exist now SET NULL
        END IF;
    END;
$$ LANGUAGE plpgsql;