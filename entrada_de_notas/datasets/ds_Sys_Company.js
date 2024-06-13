function defineStructure() {
    addColumn("M0_CODIGO", DatasetFieldType.STRING);
    addColumn("M0_CODFIL", DatasetFieldType.STRING);
    addColumn("M0_CGC", DatasetFieldType.STRING);
    addColumn("M0_FILIAL", DatasetFieldType.STRING);
    setKey(["M0_CODIGO", "M0_FILIAL"]);
    addIndex(["M0_CODIGO"]);
}

function onSync(lastSyncDate) {
    var ds = DatasetBuilder.newDataset();
    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    for (var a = 0; a < tempDataset.length; a++) {
        ds.addRow(tempDataset[a]);
    }
    return ds;
}

function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();

    ds.addColumn("M0_CODIGO");
    ds.addColumn("M0_CODFIL");
    ds.addColumn("M0_CGC");
    ds.addColumn("M0_FILIAL");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    var cM0_CODIGO;
    var cM0_CODFIL;
    var cM0_CGC;
    var cM0_FILIAL;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            cM0_CODIGO = constraints[index].fieldName == "M0_CODIGO" ? constraints[index].initialValue : cM0_CODIGO; // Se o ID for informado, é valor é atribuído a variável
            cM0_CODFIL = constraints[index].fieldName == "M0_CODFIL" ? constraints[index].initialValue : cM0_CODFIL; // Se o nome for informado, é valor é atribuído a variável
            cM0_CGC = constraints[index].fieldName == "M0_CGC" ? constraints[index].initialValue : cM0_CGC; // Se o CNPJ for informado, é valor é atribuído a variável
            cM0_FILIAL = constraints[index].fieldName == "M0_FILIAL" ? constraints[index].initialValue : cM0_FILIAL; // Se o nOME for informado, é valor é atribuído a variável
            
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (cM0_CODIGO != undefined) {
            console.log('da_Centro_Custo_032');
            ds = getMatchValue(tempDataset, cM0_CODIGO, 0);
        }
        else if (cM0_CODFIL != undefined) {
            console.log('da_Centro_Custo_037');
            ds = getMatchValue(tempDataset, cM0_CODFIL, 1);
        }
        else if (cM0_CGC != undefined) {
            console.log('da_Centro_Custo_042');
            ds = getMatchValue(tempDataset, cM0_CGC, 2)
        }
        else if (cM0_FILIAL != undefined) {
            console.log('da_Centro_Custo_042');
            ds = getMatchValue(tempDataset, cM0_FILIAL, 3)
        }

    } else { // se não tiver constraint adiciona todas as linhas do objeto no retorno
        for (var a = 0; a < tempDataset.length; a++) {
            console.log('da_Centro_Custo_048');
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
    ds.addColumn("M0_CODIGO");
    ds.addColumn("M0_CODFIL");
    ds.addColumn("M0_CGC");
    ds.addColumn("M0_FILIAL");
    for (var a = 0; a < list.length; a++) {
        /**  Irá adicionar ao dataset somente as linhas que atenderem a condição
         * Por estarmos usando indexOf, vai função vai trabalhar como um '%like%' no banco de dados */
        if (String(list[a][position]).toLocaleUpperCase().indexOf(String(filter).toLocaleUpperCase()) >= 0) {
            ds.addRow(list[a]);
        }
    }
    return ds;
}

function getDefaultValues() {
    return [
            ['01','0101001','19046218000105','0101001-POSTO ITUIUTABA'],
            ['02','0101001','64429400000108','0101001-TRR UBERLANDIA'],
            ['03','0101001','1083568000186','0101001-LIDERPETRO UBERLANDIA'],
            ['01','0101002','19046218000962','0101002-POSTO PARADA BONITA'],
            ['02','0101002','64429400000280','0101002-TRR ITUMBIARA'],
            ['03','0101002','1083568000348','0101002-LIDERPETRO SENADOR CANEDO'],
            ['01','0101003','19046218001004','0101003-POSTO BURITI'],
            ['02','0101003','64429400000361','0101003-TRR RIO VERDE'],
            ['01','0101004','19046218001187','0101004-POSTO ARAPORA'],
            ['02','0101004','64429400000442','0101004-TRR ITUMBIARA 2'],
            ['01','0101005','19046218001268','0101005-POSTO CAMPINA VERDE'],
            ['02','0101005','64429400000523','0101005-TRR ITUIUTABA'],
            ['01','0101006','19046218001772','0101006-POSTO UBERLANDIA'],
            ['02','0101006','64429400000604','0101006-TRR PARADA BONITA'],
            ['01','0101007','19046218002159','0101007-POSTO RIO VERDE'],
            ['01','0101008','19046218002310','0101008-POSTO CENTRALINA'],
            ['01','0101009','19046218002582','0101009-POSTO OLHOS DA AGUA'],
            ['01','0102001','19046218000296','0102001-RESTAURANTE ITUIUTABA'],
            ['01','0102002','19046218000709','0102002-RESTAURANTE PARADA BONITA'],
            ['01','0102003','19046218000610','0102003-RESTAURANTE BURITI'],
            ['01','0102004','19046218000881','0102004-RESTAURANTE ARAPORA'],
            ['01','0102005','19046218001420','0102005-RESTAURANTE CAMPINA VERDE'],
            ['01','0102006','19046218001500','0102006-RESTAURANTE UBERLANDIA'],
            ['01','0102007','19046218002078','0102007-RESTAURANTE RIO VERDE'],
            ['01','0102008','19046218002400','0102008-RESTAURANTE CENTRALINA'],
            ['01','0102009','19046218002663','0102009-RESTAURANTE OLHOS DA AGUA'],
            ['01','0103001','19046218000377','0103001-AUTO PECAS ITUIUTABA'],
            ['01','0103002','19046218000458','0103002-AUTO PECAS PARADA BONITA'],
            ['01','0103003','19046218000539','0103003-AUTO PECAS BURITI'],
            ['01','0103004','19046218001349','0103004-AUTO PECAS ARAPORA'],
            ['01','0103005','19046218001853','0103005-AUTO PECAS CAMPINA VERDE'],
            ['01','0103006','19046218001691','0103006-AUTO PECAS UBERLANDIA'],
            ['01','0103007','19046218001934','0103007-AUTO PECAS RIO VERDE'],
            ['01','0103008','19046218002230','0103008-AUTO PECAS CENTRALINA'],
            ['01','0103009','19046218002744','0103009-AUTO PECAS OLHOS DA AGUA'],
            ['01','0104001','19046218003635','0104001-CONVENIENCIA ITUIUTABA'],
            ['01','0104002','19046218003392','0104002-CONVENIENCIA PARADA BONITA'],
            ['01','0104003','19046218003040','0104003-CONVENIENCIA BURITI'],
            ['01','0104004','19046218003201','0104004-CONVENIENCIA ARAPORA'],
            ['01','0104005','19046218003120','0104005-CONVENIENCIA CAMPINA VERDE'],
            ['01','0104006','19046218002906','0104006-CONVENIENCIA UBERLANDIA'],
            ['01','0104007','19046218003473','0104007-CONVENIENCIA RIO VERDE'],
            ['01','0104008','19046218003554','0104008-CONVENIENCIA CENTRALINA'],
            ['01','0104009','19046218002825','0104009-CONVENIENCIA OLHOS DA AGUA'],
            ['01','0105001','19046218003716','0105001-VARIEDADES CENTRALINA'],
            ['01','0105002','19046218003988','0105002-VARIEDADES UBERLANDIA'],
            ['01','0106001','19046218003805','0106001-HOTEL BURITI'],
            ['01','0201001','16812480000125','0201001-BAZAR DA JU'],
            ['02','0201001','26195088000138','0201001-TRR GURUPI'],
            ['01','0301001','6698533000175','0301001-POSTO GURUPI'],
            ['01','0302001','111','0302001-RESTAURANTE GURUPI'],
            ['01','0401001','111','0401001-VARIEDADES DMS CONVENIENCIA'],
   ];
}