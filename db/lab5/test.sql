/*SELECT TSPTmp.id_tariff, TSPTmp.id_service, MAX(TSPTmp.create_date) 
                FROM TSPairs_tmp AS TSPTmp, Services AS S 
                WHERE TSPTmp.id_tariff = 1 AND TSPTmp.id_service=S.id_service AND create_date <= '17/02/2020'
                GROUP BY TSPTmp.id_tariff, TSPTmp.id_service
        
*/

SELECT id_contract, MAX(create_date) as create_date
    FROM Contracts_tmp 
    WHERE id_client = 2 AND create_date <= '22/03/2020'
    GROUP BY id_client, id_contract;