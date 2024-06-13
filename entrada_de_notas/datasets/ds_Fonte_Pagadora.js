function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("ID");
    ds.addColumn("Nome");
    ds.addColumn("CCusto");
    ds.addColumn("Chave");

    var tempDataset = getDefaultValues(); // Consulta a fonte de dados do dataset
    var idBusca;
    var nome;
    var cCusto;
    var chave;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        for (var index = 0; index < constraints.length; index++) {
            idBusca = constraints[index].fieldName == "ID" ? constraints[0].initialValue : idBusca; // Se o ID for informado, é valor é atribuído a variável
            nome = constraints[index].fieldName == "Nome" ? constraints[0].initialValue : nome; // Se o nome for informado, é valor é atribuído a variável
            cCusto = constraints[index].fieldName == "CCusto" ? constraints[0].initialValue : cCusto; // Se o CCusto for informado, é valor é atribuído a variável
            chave = constraints[index].fieldName == "Chave" ? constraints[0].initialValue : chave; // Se o Chave for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (idBusca != undefined) { ds = getMatchValue(tempDataset, idBusca, 0); }
        else if (nome != undefined) { ds = getMatchValue(tempDataset, nome, 1); }
        else if (cCusto != undefined) { ds = getMatchValue(tempDataset, cCusto, 2) }
        else if (chave != undefined) { ds = getMatchValue(tempDataset, chave, 3); }
    } else { // se não tiver constraint adiciona todas as linhas do objeto no retorno
        for (var a = 0; a < tempDataset.length; a++) {
            ds.addRow(tempDataset[a]);
        }
    }
    return ds;
}

/**
 * Monta o novo dataset com base nos parâmetros definidos
 * @param {object} list espera um objeto ou array de objetos 
 * @param {string} filter espera o valor que foi passado via constraint do dataset 
 * @param {int} position a posição onde o valor alvo será validado
 * @returns retorna uma novo dataset com os valores que atendam a condição
 */
function getMatchValue(list, filter, position) {
    var ds = DatasetBuilder.newDataset();
    ds.addColumn("ID");
    ds.addColumn("Nome");
    ds.addColumn("CCusto");
    ds.addColumn("Chave");
    for (var a = 0; a < list.length; a++) {
        /**  Irá adicionar ao dataset somente as linhas que atenderem a condição
         * Por estarmos usando indexOf, vai função vai trabalhar como um '%like%' no banco de dados */
        if (String(list[a][position]).toLocaleUpperCase().indexOf(String(filter).toLocaleUpperCase()) >= 0) {
            ds.addRow(list[a]);
        }
    }
    return ds;
}

/**
 * Lista de objetos a ser retornada pelo dataset 
 * @returns lista
 */
function getDefaultValues() {
    return [
            ['32544414000259','DECIO DISTRIBUIDORA RVD-32544414000259','BEIRARIO','0'],
            ['19046218000296','ITUIUTABA - CHURRASCARIA-19046218000296','BEIRARIO','10'],
            ['19046218000377','ITUIUTABA - PEÇAS-19046218000377','BEIRARIO','15'],
            ['19046218001187','ARAPORÃ - POSTO-19046218001187','BEIRARIO','16'],
            ['19046218000881','ARAPORÃ - CHURRASCARIA-19046218000881','BEIRARIO','17'],
            ['19046218001349','ARAPORÃ - PEÇAS-19046218001349','BEIRARIO','18'],
            ['19046218001004','BURITI - POSTO-19046218001004','BEIRARIO','19'],
            ['19046218000610','BURITI - CHURRASCARIA-19046218000610','BEIRARIO','20'],
            ['19046218000539','BURITI - PEÇAS -19046218000539','BEIRARIO','21'],
            ['19046218000962','PARADA BONITA - POSTO-19046218000962','BEIRARIO','22'],
            ['19046218000709','PARADA BONITA - CHURRASCARIA-19046218000709','BEIRARIO','23'],
            ['19046218000458','PARADA BONITA - PEÇAS-19046218000458','BEIRARIO','24'],
            ['19046218001772','UBERLÂNDIA - POSTO-19046218001772','BEIRARIO','25'],
            ['19046218001500','UBERLÂNDIA - CHURRASCARIA-19046218001500','BEIRARIO','26'],
            ['19046218001691','UBERLÂNDIA - PEÇAS-19046218001691','BEIRARIO','27'],
            ['19046218002159','RIO VERDE - POSTO-19046218002159','BEIRARIO','28'],
            ['19046218002078','RIO VERDE - CHURRASCARIA-19046218002078','BEIRARIO','29'],
            ['19046218001934','RIO VERDE - PEÇAS-19046218001934','BEIRARIO','30'],
            ['19046218001268','CAMPINA VERDE - POSTO-19046218001268','BEIRARIO','31'],
            ['19046218001420','CAMPINA VERDE - CHURRASCARIA-19046218001420','BEIRARIO','32'],
            ['19046218001853','CAMPINA VERDE - PEÇAS-19046218001853','BEIRARIO','33'],
            ['24088673000103','DÉCIO ADMINISTRAÇÃO-24088673000103','BEIRARIO','34'],
            ['19046218002310','CENTRALINA - POSTO-19046218002310','BEIRARIO','37'],
            ['19046218002400','CENTRALINA - CHURRASCARIA-19046218002400','BEIRARIO','38'],
            ['19046218002230','CENTRALINA - PEÇAS-19046218002230','BEIRARIO','39'],
            ['19046218002582','OLHOS D`AGUA - POSTO-19046218002582','BEIRARIO','40'],
            ['19046218002663','OLHOS D`AGUA - CHURRASCARIA-19046218002663','BEIRARIO','41'],
            ['19046218002744','OLHOS D`AGUA - PEÇAS-19046218002744','BEIRARIO','42'],
            ['06698533000175','GURUPI POSTO-6698533000175','BEIRARIO','46'],
            ['06698533000256','GURUPI CHURRASCARIA-6698533000256','BEIRARIO','47'],
            ['08304361000133','GURUPI PEÇAS-8304361000133','BEIRARIO','48'],
            ['32544414000178','DÉCIO DISTRIBUIDORA UDI-32544414000178','BEIRARIO','49'],
            ['32734509000154','DECIO LOCADORA UBERLÂNDIA-32734509000154','BEIRARIO','50'],
            ['23626692000183','TRANSL TRANSPORTADORA-23626692000183','BEIRARIO','51'],
            ['32734509000235','DECIO LOCADORA ITUIUTABA-32734509000235','BEIRARIO','52'],
            ['32734509000316','DECIO LOCADORA ARAPORA-32734509000316','BEIRARIO','53'],
            ['32734509000405','DECIO LOCADORA ITUMBIARA-32734509000405','BEIRARIO','54'],
            ['32734509000588','DECIO LOCADORA RIO VERDE-32734509000588','BEIRARIO','55'],
            ['19046218002825','OLHOS D`AGUA - BR MANIA-19046218002825','BEIRARIO','56'],
            ['42401790000167','PET D - UDI-42401790000167','BEIRARIO','57'],
            ['42401790000248','PET D - RVD-42401790000248','BEIRARIO','58'],
            ['19046218000105','ITUIUTABA - POSTO-19046218000105','BEIRARIO','9'],
            ['64429400000361','DÉCIO TRR - RIO VERDE-64429400000361','DECIOMANIA','10'],
            ['01083568000348','LDP - SENADOR CANEDO-1083568000348','DECIOMANIA','12'],
            ['11652697000100','DECIO MANUTENÇÃO-11652697000100','DECIOMANIA','15'],
            ['26195088000138','DÉCIO TRR - GURUPI-26195088000138','DECIOMANIA','20'],
            ['64429400000442','DÉCIO TRR - ITUMBIARA II-64429400000442','DECIOMANIA','23'],
            ['64429400000523','DÉCIO TRR - ITUIUTABA-64429400000523','DECIOMANIA','24'],
            ['10564081000106','DECIO COMUNICAÇÃO-10564081000106','DECIOMANIA','4'],
            ['01083568000186','LDP - UBERLANDIA-1083568000186','DECIOMANIA','7'],
            ['64429400000108','DÉCIO TRR - UBERLÂNDIA-64429400000108','DECIOMANIA','8'],
            ['64429400000280','DÉCIO TRR - ITUMBIARA I-64429400000280','DECIOMANIA','9'],
            ['08043170000165','DECIO CHURRASCARIA-8043170000165','RADAR','0'],
            ['08043170000246','DECIO CHURRASCARIA-8043170000246','RADAR','0'],
            ['10390278000176','RODO DECIO - MATRIZ - ITB-10390278000176','RADAR','0'],
            ['10390278000257','RODO DECIO - FILIAL - UDI-10390278000257','RADAR','0'],
            ['13815059000937','DROGARIA 050-13815059000937','RADAR','0'],
            ['14058826000116','POSTO L8-14058826000116','RADAR','0'],
            ['14058826000205','POSTO L9-14058826000205','RADAR','0'],
            ['14058826000388','POSTO L11-14058826000388','RADAR','0'],
            ['14058826000469','POSTO L10-14058826000469','RADAR','0'],
            ['14058826000540','POSTO L12-14058826000540','RADAR','0'],
            ['18749263000163','DECIO IMOBILIARIA-18749263000163','RADAR','0'],
            ['19687497000196','BULK FIT 4 - PAMPULHA-19687497000196','RADAR','0'],
            ['21609734000142','DROGARIA AMERICANA ITB L4-21609734000142','RADAR','0'],
            ['21609734000223','DECIO DROGARIA CAMPINA VERDE-21609734000223','RADAR','0'],
            ['21609734000304','DROGARIA AMERICANA CENTRALINA-21609734000304','RADAR','0'],
            ['21609734000495','DROGARIA AMERICANA ITB L2-21609734000495','RADAR','0'],
            ['21609734000576','DROGARIA AMERICANA ITB CENTRO-21609734000576','RADAR','0'],
            ['21609734000657','DROGARIA - MONTE CARMELO-21609734000657','RADAR','0'],
            ['21609734000738','DROGARIA - RIO VERDE-21609734000738','RADAR','0'],
            ['24634488000177','BULK FIT 3 - SARAIVA-24634488000177','RADAR','0'],
            ['25450619000129','DECIO MARCENARIA-25450619000129','RADAR','0'],
            ['30651469000151','BULK FIT 1 - UNIVERSITARIO-30651469000151','RADAR','0'],
            ['30651986000120','DROGARIA GURUPI-30651986000120','RADAR','0'],
            ['32598770000174','BULK FIT 2 - SETOR SUL-32598770000174','RADAR','0'],
            ['32873296000141','TELMA MACEDO ADMINISTRAÇÃO-32873296000141','RADAR','0'],
            ['34217045000134','REDE OHANA PARTICIPAÇÕES E NEGÓCIOS-34217045000134','RADAR','0'],
            ['34217052000136','SANTA MARIA PARTICIPAÇÕES E NEGÓCIOS-34217052000136','RADAR','0'],
            ['34217076000195','NOSSA SENHORA DAS GRAÇAS PARTICIPAÇÕES-34217076000195','RADAR','0'],
            ['34234779000121','NEW CEDDRUS PARTICIPAÇÕES-34234779000121','RADAR','0'],
            ['35579315000110','BULK FIT 5 - NOVO MUNDO-35579315000110','RADAR','0'],
            ['37925170000197','JACARANDA AGROPECUARIA LTDA-37925170000197','RADAR','0'],
            ['39848608000106','DECIO HOLDING-39848608000106','RADAR','0'],
            ['40737998000126','DECIO AVIATION-40737998000126','RADAR','0'],
            ['41102561000189','BASTOS NEGÓCIOS AGROPECUÁRIOS-41102561000189','RADAR','0'],
            ['26339598000131','POSTO ALTO DA CIDADE-26339598000131','URBANOS','1'],
            ['13815059000260','BOMBOCADO - DECIO L2-13815059000260','URBANOS','10'],
            ['02211749001428','POSTO DECIO L3-2211749001428','URBANOS','11'],
            ['13815059000422','BOMBOCADO - DECIO L3-13815059000422','URBANOS','12'],
            ['02211749001690','POSTO DECIO L4-2211749001690','URBANOS','13'],
            ['13815059001070','BOMBOCADO - DECIO L4-13815059001070','URBANOS','14'],
            ['02211749000880','POSTO DECIO L5-2211749000880','URBANOS','17'],
            ['13815059000503','BOMBOCADO - DECIO L5 - RVD-13815059000503','URBANOS','18'],
            ['02211749000707','POSTO DECIO L6-2211749000707','URBANOS','19'],
            ['13815059000694','BOMBOCADO - DECIO L6 - RVD-13815059000694','URBANOS','20'],
            ['02211749000960','POSTO DECIO L7-2211749000960','URBANOS','21'],
            ['13815059000775','BOMBOCADO - DECIO L7 - RVD-13815059000775','URBANOS','22'],
            ['03194071000160','POSTO DÉCIO L13-3194071000160','URBANOS','23'],
            ['13815059001232','BOMBOCADO - DECIO L13 - RVD-13815059001232','URBANOS','24'],
            ['02211749001509','POSTO DECIO L14-2211749001509','URBANOS','25'],
            ['13815059001151','BOMBOCADO - DECIO L14 - RVD-13815059001151','URBANOS','26'],
            ['02211749000103','POSTO DECIO 5-2211749000103','URBANOS','3'],
            ['13815059000180','BOMBOCADO - DECIO 5-13815059000180','URBANOS','4'],
            ['02315777000170','POSTO BRISA - SANTA VITÓRIA-2315777000170','URBANOS','5'],
            ['13815059000856','BOMBOCADO - BRISA - SANTA VIT-13815059000856','URBANOS','6'],
            ['02211749000375','POSTO DECIO L1-2211749000375','URBANOS','7'],
            ['13815059000341','BOMBOCADO - DECIO L1-13815059000341','URBANOS','8'],
            ['02211749000618','POSTO DECIO L2-2211749000618','URBANOS','9'],
            ['26649482000107','BR MANIA UBERLÂNDIA-26649482000107','VARIEDADES','10'],
            ['26809803000185','BR MANIA BURITI-26809803000185','VARIEDADES','11'],
            ['26809803000266','BAZAR DA JÚ UBERLÂNDIA-26809803000266','VARIEDADES','12'],
            ['29997682000130','BOMBOCADO - ITUIUTABA-29997682000130','VARIEDADES','13'],
            ['07868850000155','BR MANIA GURUPI-7868850000155','VARIEDADES','14'],
            ['08612381000171','BR MANIA - ARAPORÃ-8612381000171','VARIEDADES','2'],
            ['16812480000125','BAZAR DA JU - RVD-16812480000125','VARIEDADES','5'],
            ['16812480000206','BR MANIA - RVD-16812480000206','VARIEDADES','6'],
            ['66198664000115','LÍDER PANIFICAÇÃO-66198664000115','VARIEDADES','7'],
            ['08612381000252','VARIEDADES - CENTRALINA-8612381000252','VARIEDADES','9'],
            ['18286168000170','VILA 13 COMERCIO - ITUIUTABA-18286168000170','VILATREZE','1'],
            ['18286168000251','VILA 13 COMERCIO  - DOCEIRA UDI-18286168000251','VILATREZE','3'],
            ['27861062000144','VILA 13 DOCEIRA - ITUIUTABA-27861062000144','VILATREZE','4'],
            ['29563529000103','VILA 13 DOCEIRA - UBERLÂNDIA-29563529000103','VILATREZE','5'],
            ['29626601000196','VILA 13 DOCEIRA - RAPA DO TACHO-29626601000196','VILATREZE','6']
    ]    
}
