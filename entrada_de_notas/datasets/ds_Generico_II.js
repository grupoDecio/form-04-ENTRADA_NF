function defineStructure() {
    addColumn("CAMPO", DatasetFieldType.STRING);
    addColumn("OPCAO", DatasetFieldType.STRING);
    addColumn("EXTRA", DatasetFieldType.STRING);
    setKey(["CAMPO"]);
    addIndex(["CAMPO"]);
}

function onSync(lastSyncDate) {
    var ds = DatasetBuilder.newDataset();
    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    for (var a = 0; a < tempDataset.length; a++) {
        ds.addRow(tempDataset[a]);
    }
    console.log("onSync return:" + ds);
    return ds;
}

function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();

    ds.addColumn("CAMPO");
    ds.addColumn("OPCAO");
    ds.addColumn("EXTRA");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    console.log("getDefaultValues():" + tempDataset);
    var cCAMPO;
    var cOPCAO;
    var cEXTRA;

    if (constraints !== null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.log("ds_Generico_II")
        console.log("constraints: " + constraints);
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            console.log('ds_Generico_II');
            cCAMPO = constraints[index].fieldName == "CAMPO" ? constraints[index].initialValue : cCAMPO; // Se o CAMPO for informado, é valor é atribuído a variável
            cOPCAO = constraints[index].fieldName == "OPCAO" ? constraints[index].initialValue : cOPCAO; // Se a OPCAO for informada, é valor é atribuído a variável
            cEXTRA = constraints[index].fieldName == "EXTRA" ? constraints[index].initialValue : cEXTRA; // Se o EXTRA for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (cCAMPO !== undefined) {
            ds = getMatchValue(tempDataset, cCAMPO, 0);
        }
        else if (cOPCAO !== undefined) {
            ds = getMatchValue(tempDataset, cOPCAO, 1);
        }
        else if (cEXTRA !== undefined) {
            ds = getMatchValue(tempDataset, cEXTRA, 2)
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
    ds.addColumn("OPCAO");
    ds.addColumn("EXTRA");
    console.log("List do getMatchValue: " + list);
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
        ['03-CADASTRO-zBase', 'RODOVIARIO', ''],
        ['03-CADASTRO-zBase', 'TRR', ''],
        ['03-CADASTRO-zBase', 'LIDERPETRO', ''],
        ['03-CADASTRO-zBase', 'LOCADORA', ''],
        ['03-CADASTRO-zBase', 'MANUTENÇÃO E INSTALAÇÃO', ''],
        ['03-CADASTRO-zBase', 'COMUNICAÇÃO E MARKETING', ''],
        ['03-CADASTRO-zBase', 'PARTICIPAÇÃO E NEGÓCIOS', ''],
        ['03-CADASTRO-zBase', 'IMOBILIÁRIO', ''],
        ['03-CADASTRO-zBase', 'DISTRIBUIDORA PEÇAS', ''],
        ['03-CADASTRO-zBase', 'URBANO', ''],
        ['04-CADEISTRO-zTop', 'TESTE', '']
    ];
}
