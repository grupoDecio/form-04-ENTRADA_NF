function createDataset(fields, constraints, sortFields) 
{
	var ds = DatasetBuilder.newDataset();

	ds.addColumn("CODIGO");
	ds.addColumn("NOME");
	ds.addColumn("CPF");
	ds.addColumn("CATEGORIA");

	var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
	var cCODIGO;
	var cNOME;
	var cCPF;
	var cCATEGORIA

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        for (var index = 0; index < constraints.length; index++) {
            cCODIGO = constraints[index].fieldName == "CODIGO" ? constraints[0].initialValue : cCODIGO; // Se o CODIGO for informado, é valor é atribuído a variável
            cNOME = constraints[index].fieldName == "NOME" ? constraints[0].initialValue : cNOME; // Se o nome for informado, é valor é atribuído a variável
            cCPF = constraints[index].fieldName == "CPF" ? constraints[0].initialValue : cCPF; // Se o CPF for informado, é valor é atribuído a variável
            cCATEGORIA = constraints[index].fieldName == "CATEGORIA" ? constraints[0].initialValue : cCATEGORIA; // Se o CATEGORIA for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (cCODIGO != undefined) { ds = getMatchValue(tempDataset, cCODIGO, 0); }
        else if (cNOME != undefined) { ds = getMatchValue(tempDataset, cNOME, 1); }
        else if (cCPF != undefined) { ds = getMatchValue(tempDataset, cCPF, 2); }
        else if (cCATEGORIA != undefined) { ds = getMatchValue(tempDataset, cCATEGORIA, 3) }
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
    ds.addColumn("CODIGO");
    ds.addColumn("NOME");
    ds.addColumn("CPF");
    ds.addColumn("CATEGORIA");
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
	    ['000001'  ,'André Gustavo Coimbra'          ,'071.465.098-69'	,'ADMINISTRADOR'],
        ['000002','Ana Carolina Vasconcelos Reis'   ,'S/N','SUPORTE PROTHEUS N1'],
        ['000003','Mario Antonio de Medeiros'       ,'S/N','SUPORTE PROTHEUS N1'],
        
	];
}