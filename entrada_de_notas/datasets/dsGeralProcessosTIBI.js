function defineStructure() {
	var dataset = montaDataset(null, null, null, 'defineStructure');
	var columns = dataset.getColumnsName();
	for (var i = 0; i < dataset.getColumnsCount(); i++) {
		if (!DatabaseManager.isReservedWord(columns[i])) {
			addColumn(columns[i]);
		} else {
			addColumn('ds_' + columns[i]);
		}
	}
	setKey(["NUM_PROCES", "NUM_SEQ_MOVTO"]);
	addIndex(["NUM_PROCES", "NUM_SEQ_MOVTO", "START_DATE"]);
}
function onSync(lastSyncDate) {
	try {
		return montaDataset(null, null, null, true);
	} catch (error) {
		throw error;
	}
}

function createDataset(fields, constraints, sortFields) {
	try {
		return montaDataset(fields, constraints, sortFields, false);
	} catch (error) {
		throw error;
	}
}

function montaDataset(fields, constraints, sortFields, sync) {
	var newDataset = DatasetBuilder.newDataset();

	try {

		var slaPadrao = "002:00";
		var processoConsulta;

		var datasetDoForm = 'ds_00-FLUIG';
		var ds_00_FLUIG = retornaTabelas('ds_00-FLUIG');
		var ds_01_TI_SISTEMAS = retornaTabelas('ds_01-TI_SISTEMAS');
		var ds_22_TI_ACESSOS = retornaTabelas('ds_22-TI_ACESSOS');
		var ds_23_TI_GDIN = retornaTabelas('ds_23-TI_GDIN');
		var dadosConsulta = {
			'sync': sync,
			'constraints': constraints,
			'PROCESS': processoConsulta,
			'ds_00_FLUIG': ds_00_FLUIG.getValue(0, 'TABELA_PRINCIPAL'),
			'ds_01_TI_SISTEMAS': ds_01_TI_SISTEMAS.getValue(0, 'TABELA_PRINCIPAL'),
			'ds_22_TI_ACESSOS': ds_22_TI_ACESSOS.getValue(0, 'TABELA_PRINCIPAL'),
			'ds_23_TI_GDIN': ds_23_TI_GDIN.getValue(0, 'TABELA_PRINCIPAL'),
			'SLA_PADRAO': slaPadrao
		}
		return retornaDocumentos(dadosConsulta);
	} catch (error) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERROR");
		newDataset.addColumn("LINHA");
		newDataset.addRow([error.message, error.lineNumber]);
	}
	return newDataset;
}

function retornaTabelas(dataset, tabela) {
	var newDataset = DatasetBuilder.newDataset();
	var dataSource = "/jdbc/AppDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var myQuery = "SELECT " +
		"\n 	NM_DATASET, " +
		"\n 	NR_VERSAO, " +
		"\n 	COD_TABELA, " +
		"\n 	CAST(DOCUMENTO.COD_LISTA AS CHAR) AS 'COD_LISTA_PAI', " +
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
		"\n 				LPAD(META_LISTA_REL.COD_EMPRESA, 3, '0'), " +
		"\n 				LPAD(META_LISTA_REL.COD_LISTA_FILHO, 3, '0') " +
		"\n 			) " +
		"\n 		), " +
		"\n 		CHAR " +
		"\n 	) AS TABELA_FILHO " +
		"\n FROM " +
		"\n 	DOCUMENTO " +
		"\n 	LEFT JOIN META_LISTA_REL ON META_LISTA_REL.COD_EMPRESA = DOCUMENTO.COD_EMPRESA " +
		"\n	AND META_LISTA_REL.COD_LISTA_PAI = DOCUMENTO.COD_LISTA ";
	myQuery += "\n WHERE NM_DATASET = '" + dataset + "' ";
	myQuery += tabela ? "\n AND COD_TABELA = '" + tabela + "'" : "";
	myQuery += "\n AND VERSAO_ATIVA = 1 ";

	try {
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
				}
				else {
					Arr[i - 1] = "null";
				}
			}
			newDataset.addRow(Arr);
		}
	} catch (error) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERROR");
		newDataset.addColumn("LINHA");
		newDataset.addRow([String(error), error.lineNumber]);
	} finally {
		if (rs != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return newDataset;
}

function montaCondConsulta(tipo, coringa, valor) {
	if (tipo == "MUST" && coringa == true) {
		return " LIKE '%" + valor + "%' ";
	}
	else if (tipo == "MUST_NOT" && coringa == true) {
		return " LIKE NOT '%" + valor + "%' ";
	}
	else if (tipo == "MUST") {
		return " = '" + valor + "' ";
	}
	else if (tipo == "MUST_NOT") {
		return " <> '" + valor + "' ";
	}
	else if (tipo == "SHOULD") {
		return " IN (" + valor + ") ";
	}
	else {
		return " = '" + valor + "' ";
	}
}

function retornaDocumentos(dados) {
	try {
		var newDataset = DatasetBuilder.newDataset();
		var dataSource = "/jdbc/AppDS";
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var sqlLimit = 0;
		var myQuery = "";
		var VALOR = 0;
		var setWhere = "";

		if (dados.constraints != null) {
			for (var i = 0; i < dados.constraints.length; i++) {
				var campo = String(dados.constraints[i].fieldName).toUpperCase();
				var tipo = String(dados.constraints[i].constraintType);
				var like = Boolean(dados.constraints[i].likeSearch);
				var valorConstraintINI = dados.constraints[i].initialValue;
				var valorConstraintFIM = dados.constraints[i].finalValue ? dados.constraints[i].finalValue : dados.constraints[i].initialValue;

				/** Quase padrão */
				if (campo == 'NUM_PROCES') setWhere += "\n AND PW.NUM_PROCES " + montaCondConsulta(tipo, like, valorConstraintINI);
				else if (campo == 'STATUS') setWhere += "\n AND PW.STATUS " + montaCondConsulta(tipo, like, valorConstraintINI);

				/** O que foge do padrão */
				else if (campo == 'SQLLIMIT') sqlLimit = parseInt(valorConstraintINI);
				else if (campo == 'MAX_NUM_SEQ_MOVTO' && valorConstraintINI == 'true') setWhere += "\n AND HP.NUM_SEQ_MOVTO = HPMAX.MAX_NUM_SEQ_MOVTO ";
				else if (campo == 'MAX_NUM_SEQ_MOVTO' && valorConstraintINI == 'false') setWhere += "\n AND HP.NUM_SEQ_MOVTO <> HPMAX.MAX_NUM_SEQ_MOVTO ";
				else if (campo == 'START_DATE') setWhere += "\n AND PW.START_DATE BETWEEN '" + valorConstraintINI + "' AND '" + valorConstraintFIM + "'";
			}
		}

		var prazoPadraoHoras = String(dados.SLA_PADRAO).split(":")[0];
		var defineDeadline = "(CASE WHEN TP.DEADLINE > '2020-01-01' THEN TP.DEADLINE ELSE DATE_ADD(TP.ASSIGN_START_DATE, INTERVAL " + prazoPadraoHoras + " HOUR) END) ";
		var defineDeadlineSegundos = "SUM(TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, " + defineDeadline + ")) ";

		myQuery += "\n 	SELECT DISTINCT "

		myQuery += "\n 		PW.NUM_PROCES, "
		myQuery += "\n 		CASE WHEN PW.STATUS = 0 THEN 'Aberta' WHEN PW.STATUS = 1 THEN 'Cancelada' WHEN PW.STATUS = 2 THEN 'Finalizada' ELSE 'INDEFINIDO' END AS SITUACAO , ";
		myQuery += "\n 		PW.COD_DEF_PROCES, "
		myQuery += "\n 		DP.DES_DEF_PROCES, "
		myQuery += "\n 		PW.COD_MATR_REQUISIT, ";
		myQuery += "\n 		PW.NUM_PROCES_ORIG, ";
		myQuery += "\n 		PW.NR_DOCUMENTO_CARD_INDEX, ";
		myQuery += "\n 		PW.NR_DOCUMENTO_CARD, ";
		myQuery += "\n 		DS.NM_DATASET, "
		myQuery += "\n 		PW.TOTAL_RUNTIME, "
		myQuery += "\n 		CASE WHEN ds_00_FLUIG.version IS NOT NULL AND ds_00_FLUIG.version <> '' THEN ds_00_FLUIG.version "
		myQuery += "\n 			WHEN ds_01_TI_SISTEMAS.version IS NOT NULL AND ds_01_TI_SISTEMAS.version <> '' THEN ds_01_TI_SISTEMAS.version "
		myQuery += "\n 			WHEN ds_22_TI_ACESSOS.version IS NOT NULL AND ds_22_TI_ACESSOS.version <> '' THEN ds_22_TI_ACESSOS.version "
		myQuery += "\n 			WHEN ds_23_TI_GDIN.version IS NOT NULL AND ds_23_TI_GDIN.version <> '' THEN ds_23_TI_GDIN.version END AS version , "
		myQuery += "\n 		CASE WHEN ds_00_FLUIG.nomeSolicitante IS NOT NULL AND ds_00_FLUIG.nomeSolicitante <> '' THEN ds_00_FLUIG.nomeSolicitante "
		myQuery += "\n 			WHEN ds_01_TI_SISTEMAS.nomeSolicitante IS NOT NULL AND ds_01_TI_SISTEMAS.nomeSolicitante <> '' THEN ds_01_TI_SISTEMAS.nomeSolicitante "
		myQuery += "\n 			WHEN ds_22_TI_ACESSOS.nomeSolicitante IS NOT NULL AND ds_22_TI_ACESSOS.nomeSolicitante <> '' THEN ds_22_TI_ACESSOS.nomeSolicitante "
		myQuery += "\n 			WHEN ds_23_TI_GDIN.solicitante IS NOT NULL AND ds_23_TI_GDIN.solicitante <> '' THEN ds_23_TI_GDIN.solicitante  "
		myQuery += "\n 			ELSE 'Não definido' END AS nomeSolicitante , "
		myQuery += "\n 		CASE WHEN ds_00_FLUIG.zUnidade IS NOT NULL AND ds_00_FLUIG.zUnidade <> '' THEN ds_00_FLUIG.zUnidade "
		myQuery += "\n 			WHEN ds_01_TI_SISTEMAS.zUnidade IS NOT NULL AND ds_01_TI_SISTEMAS.zUnidade <> '' THEN ds_01_TI_SISTEMAS.zUnidade "
		myQuery += "\n 			WHEN ds_22_TI_ACESSOS.zUnidade IS NOT NULL AND ds_22_TI_ACESSOS.zUnidade <> '' THEN ds_22_TI_ACESSOS.zUnidade "
		myQuery += "\n 			WHEN ds_23_TI_GDIN.zUnidade IS NOT NULL AND ds_23_TI_GDIN.zUnidade <> '' THEN ds_23_TI_GDIN.zUnidade  "
		myQuery += "\n 			ELSE 'Não definido' END AS zUnidade , "
		myQuery += "\n 		CASE WHEN ds_00_FLUIG.zSegmento IS NOT NULL AND ds_00_FLUIG.zSegmento <> '' THEN ds_00_FLUIG.zSegmento "
		myQuery += "\n 			WHEN ds_01_TI_SISTEMAS.zSegmento IS NOT NULL AND ds_01_TI_SISTEMAS.zSegmento <> '' THEN ds_01_TI_SISTEMAS.zSegmento "
		myQuery += "\n 			WHEN ds_22_TI_ACESSOS.zSegmento IS NOT NULL AND ds_22_TI_ACESSOS.zSegmento <> '' THEN ds_22_TI_ACESSOS.zSegmento "
		myQuery += "\n 			WHEN ds_23_TI_GDIN.zSegmento IS NOT NULL AND ds_23_TI_GDIN.zSegmento <> '' THEN ds_23_TI_GDIN.zSegmento  "
		myQuery += "\n 			ELSE 'Não definido' END AS zSegmento , "
		myQuery += "\n 		CASE WHEN ds_00_FLUIG.assunto IS NOT NULL AND ds_00_FLUIG.assunto <> '' THEN ds_00_FLUIG.assunto "
		myQuery += "\n 			WHEN ds_01_TI_SISTEMAS.assunto IS NOT NULL AND ds_01_TI_SISTEMAS.assunto <> '' THEN ds_01_TI_SISTEMAS.assunto "
		myQuery += "\n 			WHEN ds_22_TI_ACESSOS.assunto IS NOT NULL AND ds_22_TI_ACESSOS.assunto <> '' THEN ds_22_TI_ACESSOS.assunto "
		myQuery += "\n 			WHEN ds_23_TI_GDIN.assunto IS NOT NULL AND ds_23_TI_GDIN.assunto <> '' THEN ds_23_TI_GDIN.assunto  "
		myQuery += "\n 			ELSE 'Não definido' END AS assunto , "
		myQuery += "\n 		CASE WHEN ds_00_FLUIG.zAtendente IS NOT NULL AND ds_00_FLUIG.zAtendente <> '' THEN ds_00_FLUIG.zAtendente "
		myQuery += "\n 			WHEN ds_01_TI_SISTEMAS.zAtendente IS NOT NULL AND ds_01_TI_SISTEMAS.zAtendente <> '' THEN ds_01_TI_SISTEMAS.zAtendente "
		myQuery += "\n 			WHEN ds_22_TI_ACESSOS.gestor_altAcesso IS NOT NULL AND ds_22_TI_ACESSOS.gestor_altAcesso <> '' THEN ds_22_TI_ACESSOS.gestor_altAcesso "
		myQuery += "\n 			WHEN ds_23_TI_GDIN.zAtendente IS NOT NULL AND ds_23_TI_GDIN.zAtendente <> '' THEN ds_23_TI_GDIN.zAtendente  "
		myQuery += "\n 			ELSE 'Não definido' END AS zAtendente , "
		myQuery += "\n 		HP.NUM_SEQ_MOVTO, ";
		myQuery += "\n 		HP.NUM_SEQ_ESTADO, ";
		myQuery += "\n 		CAST(EP.NOM_ESTADO AS CHAR) AS 'NOME_ATIVIDADE', ";
		myQuery += "\n 		COUNT(*) AS ATUACOES_ATIVIDADE, ";
		myQuery += "\n 		DATE_FORMAT(PW.START_DATE, '%d/%m/%Y %H:%i:%s') AS 'START_DATE', ";
		myQuery += "\n 		DATE_FORMAT(PW.END_DATE, '%d/%m/%Y %H:%i:%s') AS 'TR_END_DATE', ";
		myQuery += "\n 		CAST(TP.CD_MATRICULA AS CHAR) AS 'RESPONSAVEL_ATIVIDADE', ";
		myQuery += "\n 		(CASE WHEN UU.FULL_NAME IS NOT NULL THEN UU.FULL_NAME ELSE TP.CD_MATRICULA END) AS 'FULL_NAME_ATIVIDADE', ";
		myQuery += "\n 		SUM(TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE)) AS 'TEMPO_GASTO_ATIVIDADE', ";
		myQuery += "\n 		" + defineDeadlineSegundos + " AS 'PRAZO_ATIVIDADE', ";
		myQuery += "\n 		CASE WHEN SUM(TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE)) > " + defineDeadlineSegundos + " THEN 'Atrasada' ELSE 'Dentro do prazo' END AS 'CLASSIFICACAO', ";
		myQuery += "\n 		DATE_FORMAT(TP.ASSIGN_START_DATE, '%d/%m/%Y %H:%i:%s') AS 'TR_ASSIGN_START_DATE', ";
		myQuery += "\n 		DATE_FORMAT(TP.ASSIGN_END_DATE, '%d/%m/%Y %H:%i:%s') AS 'TR_ASSIGN_END_DATE', ";
		myQuery += "\n 		DATE_FORMAT(" + defineDeadline + ", '%d/%m/%Y %H:%i:%s') AS 'TR_DEADLINE', ";
		myQuery += "\n	CASE ";
		myQuery += "\n		WHEN HP.NUM_SEQ_MOVTO = HPMAX.MAX_NUM_SEQ_MOVTO THEN 'true' ";
		myQuery += "\n		ELSE 'false' ";
		myQuery += "\n	END AS MAX_NUM_SEQ_MOVTO_BOOL, ";
		// myQuery += "\n	'" + dados.ds_00_FLUIG + "' as ds_00_FLUIG, "
		// myQuery += "\n	'" + dados.ds_01_TI_SISTEMAS + "' as ds_01_TI_SISTEMAS, "
		// myQuery += "\n	'" + dados.ds_22_TI_ACESSOS + "' as ds_22_TI_ACESSOS, "
		// myQuery += "\n	'" + dados.ds_23_TI_GDIN + "' as ds_23_TI_GDIN, "
		myQuery += "\n 		'dsGeralProcessosBI' AS DATASET ";
		myQuery += "\n FROM proces_workflow PW";
		myQuery += "\n LEFT JOIN def_proces 						DP 					ON DP.COD_DEF_PROCES = PW.COD_DEF_PROCES AND DP.COD_EMPRESA = PW.COD_EMPRESA ";
		myQuery += "\n LEFT JOIN histor_proces 						HP 					ON HP.COD_EMPRESA = PW.COD_EMPRESA and HP.NUM_PROCES = PW.NUM_PROCES ";
		myQuery += "\n JOIN (SELECT HPSUB.NUM_PROCES, MAX(HPSUB.NUM_SEQ_MOVTO) AS MAX_NUM_SEQ_MOVTO FROM histor_proces AS HPSUB ";
		myQuery += "\n 	 GROUP BY HPSUB.NUM_PROCES) AS 				HPMAX 				ON HPMAX.NUM_PROCES = PW.NUM_PROCES ";
		myQuery += "\n LEFT JOIN tar_proces						 	TP			 		ON TP.COD_EMPRESA = PW.COD_EMPRESA and TP.NUM_PROCES = PW.NUM_PROCES AND TP.NUM_SEQ_MOVTO = HP.NUM_SEQ_MOVTO";
		myQuery += "\n LEFT JOIN estado_proces 						EP 					ON EP.COD_DEF_PROCES = PW.COD_DEF_PROCES and EP.NUM_VERS = PW.NUM_VERS AND EP.NUM_SEQ = HP.NUM_SEQ_ESTADO AND EP.COD_EMPRESA = PW.COD_EMPRESA ";
		myQuery += "\n LEFT JOIN fdn_usertenant 					UT 					ON UT.USER_CODE = TP.CD_MATRICULA AND UT.TENANT_ID = PW.COD_EMPRESA ";
		myQuery += "\n LEFT JOIN fdn_user 							UU 					ON UU.USER_ID = UT.USER_ID ";
		myQuery += "\n INNER JOIN DOCUMENTO 						DOC 				ON DOC.COD_EMPRESA = PW.COD_EMPRESA and DOC.NR_DOCUMENTO = PW.NR_DOCUMENTO_CARD AND DOC.VERSAO_ATIVA = true ";
		myQuery += "\n INNER JOIN DOCUMENTO 						DS					ON DS.COD_EMPRESA = PW.COD_EMPRESA and DS.NR_DOCUMENTO = PW.NR_DOCUMENTO_CARD_INDEX AND DS.VERSAO_ATIVA = true ";
		myQuery += "\n LEFT JOIN " + dados.ds_00_FLUIG + " 			ds_00_FLUIG 		ON ds_00_FLUIG.companyid = DOC.COD_EMPRESA AND ds_00_FLUIG.documentid = PW.NR_DOCUMENTO_CARD AND ds_00_FLUIG.version = DOC.NR_VERSAO ";
		myQuery += "\n LEFT JOIN " + dados.ds_01_TI_SISTEMAS + " 	ds_01_TI_SISTEMAS 	ON ds_01_TI_SISTEMAS.companyid = DOC.COD_EMPRESA AND ds_01_TI_SISTEMAS.documentid = PW.NR_DOCUMENTO_CARD  AND ds_01_TI_SISTEMAS.version = DOC.NR_VERSAO  ";
		myQuery += "\n LEFT JOIN " + dados.ds_22_TI_ACESSOS + " 	ds_22_TI_ACESSOS 	ON ds_22_TI_ACESSOS.companyid = DOC.COD_EMPRESA AND ds_22_TI_ACESSOS.documentid = PW.NR_DOCUMENTO_CARD AND ds_22_TI_ACESSOS.version = DOC.NR_VERSAO  ";
		myQuery += "\n LEFT JOIN " + dados.ds_23_TI_GDIN + " 		ds_23_TI_GDIN		ON ds_23_TI_GDIN.companyid = DOC.COD_EMPRESA AND ds_23_TI_GDIN.documentid = PW.NR_DOCUMENTO_CARD  AND ds_23_TI_GDIN.version = DOC.NR_VERSAO  ";
		myQuery += "\n WHERE  DOC.VERSAO_ATIVA = 1 ";
		myQuery += "\n AND DOC.NUM_DOCTO_PROPRIED <> DOC.NR_DOCUMENTO ";
		myQuery += "\n AND EP.IDI_TIP_BPMN IN (10, 80, 82, 60) ";
		myQuery += "\n AND PW.STATUS IS NOT NULL ";
		myQuery += "\n AND PW.COD_DEF_PROCES IN ('00-FLUIG', '01-TI_Sistemas', '22-TI_ACESSOS', '23-TI_GDIN') ";
		// myQuery += "\n AND PW.NUM_PROCES = 123  " ;
		myQuery += dados.sync == "defineStructure" ? "\n AND PW.NUM_PROCES = 123  " : "";
		myQuery += setWhere;
		myQuery += "\n GROUP BY HP.NUM_PROCES, HP.NUM_SEQ_MOVTO "
		myQuery += "\n ORDER BY PW.NUM_PROCES DESC, HP.NUM_SEQ_MOVTO DESC "
		myQuery += sqlLimit ? "\n LIMIT " + sqlLimit : "";
		myQuery += ";";

		log.info(myQuery)
		log.dir(dados)

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
				var columnName = rs.getMetaData().getColumnName(i);
				if (null != obj) {
					Arr[i - 1] = rs.getObject(columnName) ? String(rs.getObject(columnName)) : null;
				} else {
					Arr[i - 1] = null;
				}
			}
			if (dados.sync == "sync") { newDataset.addOrUpdateRow(Arr); }
			else { newDataset.addRow(Arr); }
		}
		if (rs != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	} catch (e) {
		log.error("ERRO==============> " + String(e));
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("LINHA");
		newDataset.addColumn("ERRO");
		if (dados.sync == "sync") { newDataset.addOrUpdateRow([e.lineNumber, String(e)]); }
		else { newDataset.addRow([e.lineNumber, String(e)]); }
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