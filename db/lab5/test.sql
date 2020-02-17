SELECT TSPTmp.id_tariff, TSPTmp.id_service, MAX(TSPTmp.create_date) 
                FROM TSPairs_tmp AS TSPTmp, Services AS S 
                WHERE TSPTmp.id_tariff = 1 AND TSPTmp.id_service=S.id_service AND create_date <= '17/02/2020'
                GROUP BY TSPTmp.id_tariff, TSPTmp.id_service