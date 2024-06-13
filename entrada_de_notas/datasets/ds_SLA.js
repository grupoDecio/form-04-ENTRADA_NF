function createDataset(fields, constraints, sortFields) 
{
	console.log("ds_SLA_003")
	var ds = DatasetBuilder.newDataset();

	ds.addColumn("ID");
	ds.addColumn("Nome");
	ds.addColumn("Categoria");
	ds.addColumn("Horas");
	console.log("ds_SLA_009")

	var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
	var idBusca;
	var Categoria;
	var nome;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        for (var index = 0; index < constraints.length; index++) {
            idBusca = constraints[index].fieldName == "ID" ? constraints[0].initialValue : idBusca; // Se o ID for informado, é valor é atribuído a variável
            nome = constraints[index].fieldName == "Nome" ? constraints[0].initialValue : nome; // Se o nome for informado, é valor é atribuído a variável
            Categoria = constraints[index].fieldName == "Categoria" ? constraints[0].initialValue : Categoria; // Se o CNPJ for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (idBusca != undefined) { ds = getMatchValue(tempDataset, idBusca, 0); }
        else if (nome != undefined) { ds = getMatchValue(tempDataset, nome, 1); }
        else if (Categoria != undefined) { ds = getMatchValue(tempDataset, Categoria, 2) }
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
    ds.addColumn("Categoria");
    ds.addColumn("Horas");
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
	    ['N/A'  ,'24 HORAS (DIAS ÚTEIS)'    ,'Contrato bancário sem garantia'	,'008:30'],
        
        ['BAIXO','4 DIAS ÚTEIS'             ,'Contratos'						,'060:00'],
        ['MEDIO','6 DIAS ÚTEIS'             ,'Contratos'						,'090:00'],
        ['ALTO' ,'8 DIAS ÚTEIS'             ,'Contratos'						,'120:00'],
        
        ['BAIXO','4 DIAS ÚTEIS'             ,'Ato Societário'					,'060:00'],
        ['MEDIO','6 DIAS ÚTEIS'             ,'Ato Societário'					,'090:00'],
        ['ALTO' ,'8 DIAS ÚTEIS'             ,'Ato Societário'					,'120:00'],
        
        ['BAIXO','4 DIAS ÚTEIS'             ,'Procuração'					    ,'060:00'],
        ['MEDIO','6 DIAS ÚTEIS'             ,'Procuração'					    ,'060:00'],
        ['ALTO' ,'8 DIAS ÚTEIS'             ,'Procuração'					    ,'120:00'],
        
        ['BAIXO','4 DIAS ÚTEIS'             ,'Notificação/Ofício'			    ,'060:00'],
        ['MEDIO','6 DIAS ÚTEIS'             ,'Notificação/Ofício'			    ,'090:00'],
        ['ALTO' ,'8 DIAS ÚTEIS'             ,'Notificação/Ofício'			    ,'120:00'],
        
        ['BAIXO','4 DIAS ÚTEIS'             ,'Medida Disciplinar'				,'060:00'],
        ['MEDIO','6 DIAS ÚTEIS'             ,'Medida Disciplinar'				,'090:00'],
        ['ALTO' ,'8 DIAS ÚTEIS'             ,'Medida Disciplinar'				,'120:00'],
        
        ['BAIXO','4 DIAS ÚTEIS'            ,'Consulta/Parecer'				    ,'060:00'],
        ['MEDIO','6 DIAS ÚTEIS'             ,'Consulta/Parecer'				    ,'090:00'],
        ['ALTO' ,'8 DIAS ÚTEIS'             ,'Consulta/Parecer'				    ,'120:00'],
        
        ['BAIXO','7 DIAS ÚTEIS'             ,'Ação Judicial'					,'105:00'],
        ['MEDIO','15 DIAS ÚEIS'             ,'Ação Judicial'					,'225:00'],
        ['ALTO' ,'30 DIAS ÚTEIS'            ,'Ação Judicial'					,'450:00'],
        
        ['BAIXO','7 DIAS ÚTEIS'             ,'Recuperação de Crédito'			,'105:00'],
        ['MEDIO','15 DIAS ÚEIS'             ,'Recuperação de Créditor'			,'225:00'],
        ['ALTO' ,'30 DIAS ÚTEIS'            ,'Recuperação de Crédito'			,'450:00'],
        
        ['BAIXO','1 DIAS ÚTEIS'             ,'Suporte Protheus'			        ,'015:00'],
        ['MEDIO','3 DIAS ÚEIS'              ,'Suporte Protheus'			        ,'045:00'],
        ['ALTO' ,'5 DIAS ÚTEIS'             ,'Suporte Protheus'			        ,'075:00']
        
	];
}