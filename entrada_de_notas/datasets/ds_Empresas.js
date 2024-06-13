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
        ['','AGENCIA DECIO','AGENCIA DECIO',''],
    ['','DECIO ARAPORA - PECAS E ACESSORIOS','DECIO ARAPORA - PECAS E ACESSORIOS',''],
    ['','DECIO ARAPORA - POSTO','DECIO ARAPORA - POSTO',''],
    ['','DECIO ARAPORA - CHURRASCARIA','DECIO ARAPORA - CHURRASCARIA',''],
    ['','BAZAR DA JU - UBERLANDIA','BAZAR DA JU - UBERLANDIA',''],
    ['','DÉCIO MANIA - RV','DÉCIO MANIA - RV',''],
    ['','DECIO ARAPORA - BR MANIA','DECIO ARAPORA - BR MANIA',''],
    ['','CONVENIENCIA - DECIO BURITI','CONVENIENCIA - DECIO BURITI',''],
    ['','BR MANIA OLHOS D´ AGUA','BR MANIA OLHOS D´ AGUA',''],
    ['','D MACEDO CONVENIENCIA - UBERLANDIA','D MACEDO CONVENIENCIA - UBERLANDIA',''],
    ['','DECIO UBERLANDIA - BR MANIA','DECIO UBERLANDIA - BR MANIA',''],
    ['','DECIO GURUPI - BR MANIA','DECIO GURUPI - BR MANIA',''],
    ['','BR MANIA - DECIO RIO VERDE','BR MANIA - DECIO RIO VERDE',''],
    ['','DECIO UBERLANDIA - BAZAR DA JU - ANTIGA','DECIO UBERLANDIA - BAZAR DA JU - ANTIGA',''],
    ['','DECIO BURITI - PECAS E ACESSORIOS','DECIO BURITI - PECAS E ACESSORIOS',''],
    ['','DECIO BURITI - POSTO','DECIO BURITI - POSTO',''],
    ['','DECIO BURITI - CHURRASCARIA','DECIO BURITI - CHURRASCARIA',''],
    ['','DECIO CAMPINA VERDE - PECAS E ACESSORIOS','DECIO CAMPINA VERDE - PECAS E ACESSORIOS',''],
    ['','DECIO CAMPINA VERDE - POSTO','DECIO CAMPINA VERDE - POSTO',''],
    ['','DECIO CAMPINA VERDE - CHURRASCARIA','DECIO CAMPINA VERDE - CHURRASCARIA',''],
    ['','DECIO ADMINISTRACAO','DECIO ADMINISTRACAO',''],
    ['','DECIO CENTRALINA - PECAS E ACESSORIOS','DECIO CENTRALINA - PECAS E ACESSORIOS',''],
    ['','DECIO CENTRALINA - POSTO','DECIO CENTRALINA - POSTO',''],
    ['','DECIO CENTRALINA - CHURRASCARIA','DECIO CENTRALINA - CHURRASCARIA',''],
    ['','CONVENIENCIA ARAPORA','CONVENIENCIA ARAPORA',''],
    ['','CONVENIENCIA BURITI','CONVENIENCIA BURITI',''],
    ['','CONVENIENCIA GURUPI','CONVENIENCIA GURUPI',''],
    ['','CONVENIENCIA ITUIUTABA','CONVENIENCIA ITUIUTABA',''],
    ['','CONVENIENCIA PARADA BONITA','CONVENIENCIA PARADA BONITA',''],
    ['','CONVENIENCIA RIO VERDE','CONVENIENCIA RIO VERDE',''],
    ['','CONVENIENCIA UBERLANDIA','CONVENIENCIA UBERLANDIA',''],
    ['','CONVENIENCIA POSTO BRISA','CONVENIENCIA POSTO BRISA',''],
    ['','CONVENIENCIA - DECIO L1','CONVENIENCIA - DECIO L1',''],
    ['','CONVENIENCIA - DECIO L13','CONVENIENCIA - DECIO L13',''],
    ['','CONVENIENCIA - DECIO L14','CONVENIENCIA - DECIO L14',''],
    ['','CONVENIENCIA - DECIO L2','CONVENIENCIA - DECIO L2',''],
    ['','CONVENIENCIA - DECIO L3','CONVENIENCIA - DECIO L3',''],
    ['','CONVENIENCIA - DECIO L4','CONVENIENCIA - DECIO L4',''],
    ['','CONVENIENCIA - DECIO L5','CONVENIENCIA - DECIO L5',''],
    ['','CONVENIENCIA - DECIO L6','CONVENIENCIA - DECIO L6',''],
    ['','CONVENIENCIA - DECIO L7','CONVENIENCIA - DECIO L7',''],
    ['','CONVENIENCIA POSTO 5','CONVENIENCIA POSTO 5',''],
    ['','CSC GRUPO DECIO','CSC GRUPO DECIO',''],
    ['','DECIO TRR - GURUPI','DECIO TRR - GURUPI',''],
    ['','DECIO RACING','DECIO RACING',''],
    ['','DECIO CONTABILIDADE','DECIO CONTABILIDADE',''],
    ['','DECIO LOCADORA ITUIUTABA - FILIAL 01','DECIO LOCADORA ITUIUTABA - FILIAL 01',''],
    ['','DECIO LOCADORA ARAPORA - FILIAL 02','DECIO LOCADORA ARAPORA - FILIAL 02',''],
    ['','DECIO LOCADORA ITUMBIARA- FILIAL 03','DECIO LOCADORA ITUMBIARA- FILIAL 03',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 04','DECIO LOCADORA RIO VERDE- FILIAL 04',''],
    ['','DECIO LOCADORA','DECIO LOCADORA',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 05','DECIO LOCADORA RIO VERDE- FILIAL 05',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 06','DECIO LOCADORA RIO VERDE- FILIAL 06',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 07','DECIO LOCADORA RIO VERDE- FILIAL 07',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 08','DECIO LOCADORA RIO VERDE- FILIAL 08',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 09','DECIO LOCADORA RIO VERDE- FILIAL 09',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 10','DECIO LOCADORA RIO VERDE- FILIAL 10',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 11','DECIO LOCADORA RIO VERDE- FILIAL 11',''],
    ['','DECIO LOCADORA RIO VERDE- FILIAL 12','DECIO LOCADORA RIO VERDE- FILIAL 12',''],
    ['','DECIO MANIA','DECIO MANIA',''],
    ['','BAZAR DA JU - DECIO RIO VERDE','BAZAR DA JU - DECIO RIO VERDE',''],
    ['','DECIO MANUTENCAO','DECIO MANUTENCAO',''],
    ['','DECIO MARCENARIA','DECIO MARCENARIA',''],
    ['','DECIO HOLDING','DECIO HOLDING',''],
    ['','DECIO TRR - ITUMBIARA','DECIO TRR - ITUMBIARA',''],
    ['','DECIO TRR - RIO VERDE','DECIO TRR - RIO VERDE',''],
    ['','DECIO TRR - UBERLANDIA','DECIO TRR - UBERLANDIA',''],
    ['','DECIO DROGARIA CAMPINA VERDE','DECIO DROGARIA CAMPINA VERDE',''],
    ['','DECIO DROGARIA CENTRALINA','DECIO DROGARIA CENTRALINA',''],
    ['','DECIO DROGARIA CENTRO','DECIO DROGARIA CENTRO',''],
    ['','DECIO DROGARIA L2','DECIO DROGARIA L2',''],
    ['','DROGARIA MATRIZ','DROGARIA MATRIZ',''],
    ['','DECIO DROGARIA RIO VERDE','DECIO DROGARIA RIO VERDE',''],
    ['','DECIO LOJA D VARIEDADES - CENTRALINA','DECIO LOJA D VARIEDADES - CENTRALINA',''],
    ['','CADEIRAS SÃO BENTO','CADEIRAS SÃO BENTO',''],
    ['','DECIO DROGARIA MONTE CARMELO','DECIO DROGARIA MONTE CARMELO',''],
    ['','DECIO GURUPI - PECAS E ACESSORIOS','DECIO GURUPI - PECAS E ACESSORIOS',''],
    ['','DECIO GURUPI - CHURRASCARIA','DECIO GURUPI - CHURRASCARIA',''],
    ['','DECIO GURUPI - POSTO','DECIO GURUPI - POSTO',''],
    ['','HOTEL BURITI','HOTEL BURITI',''],
    ['','DECIO IMOBILIARIA','DECIO IMOBILIARIA',''],
    ['','POSTO L2','POSTO L2',''],
    ['','POSTO L14','POSTO L14',''],
    ['','POSTO L4','POSTO L4',''],
    ['','BOMBOCADO - ANTIGA','BOMBOCADO - ANTIGA',''],
    ['','LIDERPETRO - SENADOR CANEDO','LIDERPETRO - SENADOR CANEDO',''],
    ['','LIDERPETRO - UBERLANDIA','LIDERPETRO - UBERLANDIA',''],
    ['','MACEDO E SOUZA - PECAS & ACESSORIOS','MACEDO E SOUZA - PECAS & ACESSORIOS',''],
    ['','MACEDO E SOUZA - POSTO','MACEDO E SOUZA - POSTO',''],
    ['','MACEDO E SOUZA - RESTAURANTE','MACEDO E SOUZA - RESTAURANTE',''],
    ['','MACEDO DISTRIBUIDORA - PECAS E ACESSORIOS','MACEDO DISTRIBUIDORA - PECAS E ACESSORIOS',''],
    ['','DECIO OLHOS D´AGUA - PECAS E ACESSORIOS','DECIO OLHOS D´AGUA - PECAS E ACESSORIOS',''],
    ['','DECIO OLHOS D´ AGUA - POSTO','DECIO OLHOS D´ AGUA - POSTO',''],
    ['','DECIO OLHOS D´ AGUA - RESTAURANTE','DECIO OLHOS D´ AGUA - RESTAURANTE',''],
    ['','PET DECIO - RIO VERDE','PET DECIO - RIO VERDE',''],
    ['','BOMBOCADO','BOMBOCADO',''],
    ['','DECIO PARADA BONITA - PECAS E ACESSORIOS','DECIO PARADA BONITA - PECAS E ACESSORIOS',''],
    ['','DECIO PARADA BONITA - POSTO','DECIO PARADA BONITA - POSTO',''],
    ['','DECIO PARADA BONITA - CHURRASCARIA','DECIO PARADA BONITA - CHURRASCARIA',''],
    ['','PET DECIO','PET DECIO',''],
    ['','POSTO 5','POSTO 5',''],
    ['','POSTO ALTO DA CIDADE LTDA','POSTO ALTO DA CIDADE LTDA',''],
    ['','POSTO BRISA','POSTO BRISA',''],
    ['','POSTO L1','POSTO L1',''],
    ['','POSTO L13','POSTO L13',''],
    ['','POSTO L3','POSTO L3',''],
    ['','POSTO L5','POSTO L5',''],
    ['','POSTO L6','POSTO L6',''],
    ['','POSTO L7','POSTO L7',''],
    ['','TRANSL TRANSPORTADORA','TRANSL TRANSPORTADORA',''],
    ['','DECIO RIO VERDE - PECAS E ACESSORIOS','DECIO RIO VERDE - PECAS E ACESSORIOS',''],
    ['','DECIO RIO VERDE - POSTO','DECIO RIO VERDE - POSTO',''],
    ['','DECIO RIO VERDE - CHURRASCARIA','DECIO RIO VERDE - CHURRASCARIA',''],
    ['','RODO DECIO - ITB','RODO DECIO - ITB',''],
    ['','DECIO TRR - ITUIUTABA','DECIO TRR - ITUIUTABA',''],
    ['','DECIO TRR - PARADA BONITA','DECIO TRR - PARADA BONITA',''],
    ['','DECIO UBERLANDIA - PECAS E ACESSORIOS','DECIO UBERLANDIA - PECAS E ACESSORIOS',''],
    ['','DECIO UBERLANDIA - POSTO','DECIO UBERLANDIA - POSTO',''],
    ['','DECIO UBERLANDIA - CHURRASCARIA','DECIO UBERLANDIA - CHURRASCARIA',''],
    ['','VARIEDADES CENTRALINA','VARIEDADES CENTRALINA',''],
    ['','VARIEDADES GURUPI','VARIEDADES GURUPI',''],
    ['','VARIEDADES UBERLANDIA','VARIEDADES UBERLANDIA',''],
    ['','DECIO MINEIROS - POSTO','DECIO MINEIROS - POSTO',''],
    ['','DECIO MINEIROS - RESTAURANTE','DECIO MINEIROS - RESTAURANTE',''],
    ['','DECIO MINEIROS - PEÇAS','DECIO MINEIROS - PEÇAS',''],
    ['','DECIO MINEIROS - CONVENIENCIA','DECIO MINEIROS - CONVENIENCIA','']
    ]    
}
