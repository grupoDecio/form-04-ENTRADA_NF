function defineStructure() {
    addColumn("CAMPO", DatasetFieldType.STRING);
    addColumn("CIDADE", DatasetFieldType.STRING);
    addColumn("UF", DatasetFieldType.STRING);
    setKey(["CAMPO"]);
    addIndex(["CAMPO"]);
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

    ds.addColumn("CAMPO");
    ds.addColumn("CIDADE");
    ds.addColumn("UF");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    var cCAMPO;
    var cCIDADE;
    var cUF;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.log("ds_Cidades")
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            console.log('ds_Cidades');
            cCAMPO = constraints[index].fieldName == "CAMPO" ? constraints[index].initialValue : cCAMPO; // Se o CAMPO for informado, é valor é atribuído a variável
            cCIDADE = constraints[index].fieldName == "CIDADE" ? constraints[index].initialValue : cCIDADE; // Se a cidade for informada, é valor é atribuído a variável
            cUF = constraints[index].fieldName == "UF" ? constraints[index].initialValue : cUF; // Se o ESTADO for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (cCAMPO != undefined) {
            ds = getMatchValue(tempDataset, cCAMPO, 0);
        }
        else if (cCIDADE != undefined) {
            ds = getMatchValue(tempDataset, cCIDADE, 1);
        }
        else if (cUF != undefined) {
            ds = getMatchValue(tempDataset, cUF, 2)
        }
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
    ds.addColumn("CAMPO");
    ds.addColumn("CIDADE");
    ds.addColumn("UF");
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
        ['17-RECRUTAMENTO-Cidade', 'ARAPORÃ', 'MG'],
        ['17-RECRUTAMENTO-Cidade', 'BARREIRAS', 'MG'],
        ['17-RECRUTAMENTO-Cidade', 'CAMPINA VERDE', 'MG'],
        ['17-RECRUTAMENTO-Cidade', 'CENTRALINA', 'MG'],
        ['17-RECRUTAMENTO-Cidade', 'GURUPI', 'TO'],
        ['17-RECRUTAMENTO-Cidade', 'ITUIUTABA', 'MG'],
        ['17-RECRUTAMENTO-Cidade', 'ITUMBIARA', 'GO'],
        ['17-RECRUTAMENTO-Cidade', 'MINEIROS', 'GO'],
        ['17-RECRUTAMENTO-Cidade', 'MONTE CARMELO', 'MG'],
        ['17-RECRUTAMENTO-Cidade', 'PRESIDENTE VENCESLAU', 'SP'],
        ['17-RECRUTAMENTO-Cidade', 'RIO VERDE', 'GO'],
        ['17-RECRUTAMENTO-Cidade', 'SENADOR CANEDO', 'GO'],
        ['17-RECRUTAMENTO-Cidade', 'UBERLANDIA', 'MG'],
        ['00-FLUIG-Cidade', 'RIBEIRÃO PRETO', 'SP'],
    ];
}