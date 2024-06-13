function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	try {
		//criar constraints
		var descDataset = 'DSFormularioderescisao_rh';
		var sqlLimit;
		var DEPTID;

		var dadosConsulta = [];
		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				// log.info(String(constraints[i].fieldName).toUpperCase() + ": " + constraints[i].initialValue);
				descDataset = String(constraints[i].fieldName).toUpperCase() == 'NM_DATASET' ? constraints[i].initialValue : descDataset;
				sqlLimit = String(constraints[i].fieldName).toUpperCase() == 'SQLLIMIT' ? constraints[i].initialValue : sqlLimit;
				DEPTID = String(constraints[i].fieldName).toUpperCase() == 'DEPTID' ? constraints[i].initialValue : DEPTID;
			}
		}

		var rt = retornaTabelas(descDataset);
		log.info("retorno rt");
		log.dir(rt);

		/** Defini os valores para consulta aos dados do dataset do processo  */
		var dadosConsulta = {
			'NM_DATASET': descDataset,
			'sqlLimit': sqlLimit,
			'TABELA_PRINCIPAL': rt[0].TABELA_PRINCIPAL,
			'TABELA_FILHO': rt[0].TABELA_FILHO,
			'COD_LISTA_PAI': rt[0].COD_LISTA
		}
		if (rt[0].TABELA_PRINCIPAL != null && rt[0].TABELA_PRINCIPAL != undefined) {
			var newDataset = retornaDocumentos(dadosConsulta, DEPTID);
		} else {
			throw JSONUtil.toJSON(rt);
		}
	} catch (error) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERROR");
		newDataset.addColumn("LINHA");
		newDataset.addRow([error.message, error.lineNumber]);
	}
	return newDataset;
}

function retornaTabelas(dataset) {
	var dataSource = "/jdbc/AppDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var contador = 0;
	var returnBDMetaLista = [];
	var myQuery = "SELECT " +
		"\n 	DISTINCT NM_DATASET, " +
		"\n 	DOCUMENTO.COD_LISTA, " +
		"\n 	CONVERT( " +
		"\n 		CONCAT( " +
		"\n 			'ML', " +
		"\n 			CONCAT( " +
		"\n 				LPAD(DOCUMENTO.COD_EMPRESA, 3, '0'), " +
		"\n 				LPAD(DOCUMENTO.COD_LISTA, 3, '0') " +
		"\n 			) " +
		"\n 		), " +
		"\n 		CHAR " +
		"\n 	) AS TABELA_PRINCIPAL, " +
		"\n 	COD_LISTA_FILHO, " +
		"\n 	CONVERT( " +
		"\n 		CONCAT( " +
		"\n 			'ML', " +
		"\n 			CONCAT( " +
		"\n 				LPAD(DOCUMENTO.COD_EMPRESA, 3, '0'), " +
		"\n 				LPAD(META_LISTA_REL.COD_LISTA_FILHO, 3, '0') " +
		"\n 			) " +
		"\n 		), " +
		"\n 		CHAR " +
		"\n 	) AS TABELA_FILHO " +
		"\n FROM " +
		"\n 	DOCUMENTO " +
		"\n 	LEFT JOIN META_LISTA_REL ON META_LISTA_REL.COD_EMPRESA = DOCUMENTO.COD_EMPRESA " +
		"	AND META_LISTA_REL.COD_LISTA_PAI = DOCUMENTO.COD_LISTA " +

		"";
	myQuery += "\n WHERE NM_DATASET LIKE '%" + dataset + "%' AND  DOCUMENTO.COD_LISTA IS NOT NULL AND DOCUMENTO.VERSAO_ATIVA = true ";
	log.info(myQuery);

	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(myQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			returnBDMetaLista.push({});
			for (var i = 1; i <= columnCount; i++) {
				var coluna = String(rs.getMetaData().getColumnName(i));
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				log.dir({ "coluna": coluna, "obj": obj })
				if (obj != null) {
					returnBDMetaLista[contador][coluna] = String(obj);
				} else {
					returnBDMetaLista[contador][coluna] = "null";
				}
			}
			contador++;
		}
	} catch (e) {
		log.error("ERRO==============> " + e.message);
		returnBDMetaLista['error'] = e.message;
	} finally {
		if (rs != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return returnBDMetaLista;
}

function retornaDocumentos(dados, DEPTID) {
	var newDataset = DatasetBuilder.newDataset();
	var dataSource = "/jdbc/AppDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	var sqlLimit = dados.sqlLimit == undefined || dados.sqlLimit == 0 ? 300 : dados.sqlLimit;
	var myQuery = "";

	myQuery += "\n SELECT "
	myQuery += "\n DOC.NR_DOCUMENTO, ";
	myQuery += "\n MP.*, ";
	myQuery += "\n '" + dados.NM_DATASET + "' AS NM_DATASET"
	myQuery += "\n FROM DOCUMENTO DOC  ";
	// myQuery += "\n INNER JOIN " + dados.TABELA_FILHO + " MF ON MF.companyid = DOC.COD_EMPRESA AND MF.documentid = DOC.NR_DOCUMENTO AND MF.version = (SELECT NR_VERSAO FROM DOCUMENTO WHERE VERSAO_ATIVA = true AND NR_DOCUMENTO = MF.documentid) ";
	myQuery += "\n INNER JOIN " + dados.TABELA_PRINCIPAL + " MP ON MP.companyid = DOC.COD_EMPRESA AND MP.documentid = DOC.NR_DOCUMENTO AND MP.version = (SELECT NR_VERSAO FROM DOCUMENTO WHERE VERSAO_ATIVA = true AND NR_DOCUMENTO = MP.documentid) ";
	myQuery += "\n WHERE DOC.VERSAO_ATIVA = 1 AND DOC.COD_LISTA = " + dados.COD_LISTA_PAI;
	myQuery += DEPTID != undefined ? "\n AND MP.DEPTID LIKE '%" + DEPTID + "%'" : "";
	myQuery += "\n ORDER BY DOC.NR_DOCUMENTO";
	myQuery += sqlLimit != undefined ? String("\n limit " + sqlLimit) : "";


	log.info(myQuery);
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(myQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			if (!created) {
				for (var i = 1; i <= columnCount; i++) {
					newDataset.addColumn(rs.getMetaData().getColumnName(i));
				}
				created = true;
			}
			var Arr = new Array();
			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if (null != obj) {
					Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
				} else {
					Arr[i - 1] = "";
				}
			}
			newDataset.addRow(Arr);
		}
		if (rs != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	} catch (e) {
		log.error("ERRO==============> " + e.message);
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERRO");
		newDataset.addColumn("LINHA");
		newDataset.addRow([e.message, e.lineNumber]);
	} finally {
		if (rs != null) {
			rs.close();
		}
		if (stmt != null) {
			stmt.close();
		}
		if (conn != null) {
			conn.close();
		}
	}
	return newDataset;
}