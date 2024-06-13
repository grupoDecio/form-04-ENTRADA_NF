function createDataset(fields, constraints, sortFields) {
	return montaDataset(fields, constraints, sortFields, false);
}

function montaDataset(fields, constraints, sortFields, sync) {
	var newDataset = DatasetBuilder.newDataset();

	try {
		dados = {
			"sync": false
		}
		return retornaDocumentos(dados);
	} catch (error) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERROR");
		newDataset.addColumn("LINHA");
		newDataset.addRow([error.message, error.lineNumber]);
	}
	return newDataset;
}



function retornaDocumentos(dados) {
	try {
		var newDataset = DatasetBuilder.newDataset();
		var dataSource = "/jdbc/AppDS";
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var sqlLimit = 1000;
		var myQuery = "";
		var VALOR = 0;
		var setWhere = "";

		// myQuery += "\n 		SELECT  "
		// myQuery += "\n 		ATUAL.NUM_PROCES,  "
		// myQuery += "\n 		ATUAL.NUM_SEQ_MOVTO,  "
		// myQuery += "\n 		ATUAL.NUM_SEQ_ESTADO,  "
		// myQuery += "\n 		CAST(MIN(ANTERIOR.MOVTO_DATE_TIME) AS CHAR) AS ANTERIOR_MOVTO_DATE_TIME , "
		// myQuery += "\n 		CAST(MAX(ATUAL.MOVTO_DATE_TIME) AS CHAR) AS ATUAL_MOVTO_DATE_TIME , "
		// myQuery += "\n 		@tempo_parado := SUM(TIMESTAMPDIFF(SECOND, ANTERIOR.MOVTO_DATE_TIME, ATUAL.MOVTO_DATE_TIME)) AS tempo_parado_segundos, "
		// myQuery += "\n 		SUM(TIMESTAMPDIFF(SECOND, ANTERIOR.MOVTO_DATE_TIME, ATUAL.MOVTO_DATE_TIME)) AS tempo_parado, "
		// myQuery += "\n 		  CONCAT( ";
		// myQuery += "\n 				FLOOR(SUM(TIMESTAMPDIFF(SECOND, ANTERIOR.MOVTO_DATE_TIME, ATUAL.MOVTO_DATE_TIME)) / (24 * 60 * 60)), ' d, ', ";
		// myQuery += "\n 				MOD(FLOOR(SUM(TIMESTAMPDIFF(SECOND, ANTERIOR.MOVTO_DATE_TIME, ATUAL.MOVTO_DATE_TIME)) / (60 * 60)), 24), ' h, ', ";
		// myQuery += "\n 				MOD(FLOOR(SUM(TIMESTAMPDIFF(SECOND, ANTERIOR.MOVTO_DATE_TIME, ATUAL.MOVTO_DATE_TIME)) / 60), 60), ' m, ', ";
		// myQuery += "\n 				MOD(SUM(TIMESTAMPDIFF(SECOND, ANTERIOR.MOVTO_DATE_TIME, ATUAL.MOVTO_DATE_TIME)), 60), ' s' ";
		// myQuery += "\n 			  ) AS tempo_formatado ";
		// myQuery += "\n 	FROM histor_proces ATUAL "
		// myQuery += "\n 	LEFT JOIN histor_proces ANTERIOR ON ATUAL.NUM_PROCES = ANTERIOR.NUM_PROCES AND  ANTERIOR.NUM_SEQ_MOVTO = ATUAL.NUM_SEQ_MOVTO_ANT "
		// myQuery += "\n     WHERE ATUAL.NUM_PROCES = 14907 "
		// myQuery += "\n     GROUP BY NUM_SEQ_ESTADO;"


		myQuery +=  " SELECT TIMESTAMPDIFF(SECOND, ASSIGN_START_DATE, ASSIGN_END_DATE) AS 'SOMA',   tar_proces.* FROM tar_proces WHERE NUM_PROCES = 13730 "

		log.info(myQuery)

		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(myQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		for (var i = 1; i <= columnCount; i++) {
			newDataset.addColumn(rs.getMetaData().getColumnName(i));
		}
		while (rs.next()) {
			var Arr = new Array();
			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if (null != obj) {
					Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
				} else {
					Arr[i - 1] = "";
				}
			}
			if (dados.sync) { newDataset.addOrUpdateRow(Arr); }
			else { newDataset.addRow(Arr); }
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