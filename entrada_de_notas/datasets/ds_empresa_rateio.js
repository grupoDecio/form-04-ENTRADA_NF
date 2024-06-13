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
        ['19046218003635','ITUIUTABA - CONVENIENCIA-19046218003635','BEIRARIO','0'],
        ['19046218000105','ITUIUTABA - POSTO-19046218000105','BEIRARIO','9'], 
        
        ['19046218001187','ARAPORÃ - POSTO-19046218001187','BEIRARIO','16'],
        ['19046218000881','ARAPORÃ - CHURRASCARIA-19046218000881','BEIRARIO','17'],
        ['19046218001349','ARAPORÃ - PEÇAS-19046218001349','BEIRARIO','18'],
        ['19046218003201','ARAPORÃ - CONVENIENCIA-19046218003201','BEIRARIO','18'],
        
        ['19046218001004','BURITI - POSTO-19046218001004','BEIRARIO','19'],
        ['19046218000610','BURITI - CHURRASCARIA-19046218000610','BEIRARIO','20'],
        ['19046218000539','BURITI - PEÇAS -19046218000539','BEIRARIO','21'],
        ['19046218003040','BURITI - CONVENIENCIA -19046218003040','BEIRARIO','0'],
        ['19046218003805','BURITI - HOTEL -19046218003805','BEIRARIO','0'],
        
        ['19046218000962','PARADA BONITA - POSTO-19046218000962','BEIRARIO','22'],
        ['19046218000709','PARADA BONITA - CHURRASCARIA-19046218000709','BEIRARIO','23'],
        ['19046218000458','PARADA BONITA - PEÇAS-19046218000458','BEIRARIO','24'],
        ['19046218003392','PARADA BONITA - CONVENIENCIA-19046218003392','BEIRARIO','0'],
        
        ['19046218001772','UBERLÂNDIA - POSTO-19046218001772','BEIRARIO','25'],
        ['19046218001500','UBERLÂNDIA - CHURRASCARIA-19046218001500','BEIRARIO','26'],
        ['19046218001691','UBERLÂNDIA - PEÇAS-19046218001691','BEIRARIO','27'],
        ['19046218002906','UBERLÂNDIA - CONVENIENCIA-19046218002906','BEIRARIO','0'],
        ['19046218003988','UBERLÂNDIA - VARIEDADES-19046218003988','BEIRARIO','0'],
        
        ['19046218002159','RIO VERDE - POSTO-19046218002159','BEIRARIO','28'],
        ['19046218002078','RIO VERDE - CHURRASCARIA-19046218002078','BEIRARIO','29'],
        ['19046218001934','RIO VERDE - PEÇAS-19046218001934','BEIRARIO','30'],
        ['19046218003473','RIO VERDE - CONVENIENCIA-19046218003473','BEIRARIO','0'],
        
        ['19046218001268','CAMPINA VERDE - POSTO-19046218001268','BEIRARIO','31'],
        ['19046218001420','CAMPINA VERDE - CHURRASCARIA-19046218001420','BEIRARIO','32'],
        ['19046218001853','CAMPINA VERDE - PEÇAS-19046218001853','BEIRARIO','33'],
        ['19046218003120','CAMPINA VERDE - CONVENIENCIA-19046218003120','BEIRARIO','0'],
      
        ['19046218002310','CENTRALINA - POSTO-19046218002310','BEIRARIO','37'],
        ['19046218002400','CENTRALINA - CHURRASCARIA-19046218002400','BEIRARIO','38'],
        ['19046218002230','CENTRALINA - PEÇAS-19046218002230','BEIRARIO','39'],
        ['19046218003554','CENTRALINA - CONVENIENCIA-19046218003554','BEIRARIO','0'],
        ['19046218003716','CENTRALINA - VARIEDADES-19046218003716','BEIRARIO','0'],
        
        ['19046218002582','OLHOS D`AGUA - POSTO-19046218002582','BEIRARIO','40'],
        ['19046218002663','OLHOS D`AGUA - CHURRASCARIA-19046218002663','BEIRARIO','41'],
        ['19046218002744','OLHOS D`AGUA - PEÇAS-19046218002744','BEIRARIO','42'],
        ['19046218002825','OLHOS D`AGUA - CONVENIENCIA-19046218002825','BEIRARIO','0'],
        
        ['06698533000175','GURUPI POSTO-6698533000175','BEIRARIO','46'],
        ['06698533000256','GURUPI CHURRASCARIA-6698533000256','BEIRARIO','47'],
        ['08304361000133','GURUPI PEÇAS-8304361000133','BEIRARIO','48'],
        ['06698533000418','GURUPI CONVENIENCIA-06698533000418','BEIRARIO','0'],
        
        ['32544414000178','DECIO DISTRIBUIDORA UDI-32544414000178','BEIRARIO','49'],
    
        ['23626692000183','TRANSL TRANSPORTADORA-23626692000183','BEIRARIO','51'],
    
    
        ['64429400000361','DECIO TRR - RIO VERDE-64429400000361','DECIOMANIA','10'],
        ['01083568000348','LDP - SENADOR CANEDO-1083568000348','DECIOMANIA','12'],
  
        ['26195088000138','DECIO TRR - GURUPI-26195088000138','DECIOMANIA','20'],
        ['64429400000442','DECIO TRR - ITUMBIARA II-64429400000442','DECIOMANIA','23'],
        ['64429400000523','DECIO TRR - ITUIUTABA-64429400000523','DECIOMANIA','24'],
   
        ['01083568000186','LDP - UBERLANDIA-1083568000186','DECIOMANIA','7'],
        ['64429400000108','DECIO TRR - UBERLÂNDIA-64429400000108','DECIOMANIA','8'],
   
        ['10390278000176','RODO DECIO - MATRIZ - ITB-10390278000176','RADAR','0'],
        ['10390278000257','RODO DECIO - FILIAL - UDI-10390278000257','RADAR','0'],
     
        ['18749263000163','DECIO IMOBILIARIA-18749263000163','RADAR','0'],
    
   
        ['39848608000106','DECIO HOLDING-39848608000106','RADAR','0'],
  
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
    
        ['02211749000618','POSTO DECIO L2-2211749000618','URBANOS','9'],
    
        ['29997682000130','BOMBOCADO - ITUIUTABA-29997682000130','VARIEDADES','13'],
    
   
        ['19046218004011','Posto - Mineiros-19046218004011','BEIRARIO','0'],
        ['19046218004364','Restaurante - Mineiros-19046218004364','BEIRARIO','0'],
        ['19046218004283','Acessórios - Mineiros-19046218004283','BEIRARIO','0'],
        ['19046218004100','Conveniência - Mineiros-19046218004100','BEIRARIO','0'],
        
        ['19046218004526','Posto - Barreiras-19046218004526','BEIRARIO','0'],
        ['19046218004607','Restaurante - Barreiras-19046218004607','BEIRARIO','0'],
        ['19046218004445','Acessórios - Barreiras-19046218004445','BEIRARIO','0'],
        
        ['19046218005093','Posto - Presidente Venceslau-19046218005093','BEIRARIO','0'],
        ['19046218004950','Restaurante - Presidente Venceslau-1904621800950','BEIRARIO','0'],
        ['19046218004879','Acessórios - Presidente Venceslau-19046218004879','BEIRARIO','0'],
        ['19046218004798','Conveniência - Presidente Venceslau-19046218004798','BEIRARIO','0']
        
        
    ]    
}
