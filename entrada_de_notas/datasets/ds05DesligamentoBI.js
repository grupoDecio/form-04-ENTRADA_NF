function createDataset(fields, constraints, sortFields) {
	return montaDataset(fields, constraints, sortFields, false);
}

function montaDataset(fields, constraints, sortFields, sync) {
	var newDataset = DatasetBuilder.newDataset();

	/**
	 * table_Outorgantes
	 * tabledetailname1
	 * table_Outorgados
	 */

	try {

		var slaJuridico = "000:00";

		var datasetDs_Constantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
		for (var idxJur = 0; idxJur < datasetDs_Constantes.rowsCount; idxJur++) {
			slaJuridico = datasetDs_Constantes.getValue(idxJur, "id") == "15-JURIDICO-BI" ? datasetDs_Constantes.getValue(idxJur, "Valor") : slaJuridico;
		}

		var datasetCadastroAprovadores = "ds_05-DESLIGAMENTO"; /** dataset do formulário de Cadastro de Aprovadores por centro de custo */
		var rt = retornaTabelas(datasetCadastroAprovadores);

		var dadosConsulta = {
			'sync': sync,
			'constraints': constraints,
			'NM_DATASET': datasetCadastroAprovadores,
			'COD_DEF_PROCES': "05-DESLIGAMENTO",
			'TABELA_PRINCIPAL': rt.getValue(0, "TABELA_PRINCIPAL"),
			'TABELA_FILHO': rt.getValue(0, "TABELA_FILHO"),
			'COD_LISTA_PAI': rt.getValue(0, "COD_LISTA_PAI"),
			'SLA_JURIDICO': slaJuridico
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
		"\n 	CAST(DOCUMENTO.COD_LISTA AS CHAR) as COD_LISTA_PAI, " +
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
		"\n 	) AS TABELA_FILHO, " +
		"\n 	VERSAO_ATIVA " +
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
	} catch (e) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERROR");
		newDataset.addColumn("LINHA");
		newDataset.addRow([error.message, error.lineNumber]);
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
	log.dir({ dados: dados });
	try {
		var newDataset = DatasetBuilder.newDataset();
		var dataSource = "/jdbc/AppDS";
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var sqlLimit = 10000;
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
				else if (campo == 'ZATENDENTE') setWhere += "\n AND MP.zAtendente " + montaCondConsulta(tipo, like, valorConstraintINI);
				else if (campo == 'NOMESOLICITANTE') setWhere += "\n AND MP.nomeSolicitante " + montaCondConsulta(tipo, like, valorConstraintINI);
				else if (campo == 'CATEGORIA') setWhere += "\n AND MP.categoria " + montaCondConsulta(tipo, like, valorConstraintINI);
				else if (campo == 'ZFONTE') setWhere += "\n AND MP.ZFONTE " + montaCondConsulta(tipo, like, valorConstraintINI);
				else if (campo == 'ZUNIDADE') setWhere += "\n AND MP.ZUNIDADE " + montaCondConsulta(tipo, like, valorConstraintINI);

				/** O que foge do padrão */
				else if (campo == 'SQLLIMIT') sqlLimit = valorConstraintINI;
				else if (campo == 'START_DATE') setWhere += "\n AND PW.START_DATE BETWEEN '" + valorConstraintINI + "' AND '" + valorConstraintFIM + "'";
				// else if (campo == 'START_DATE') setWhere += "\n AND STR_TO_DATE(PW.START_DATE, '%d/%m/%Y') BETWEEN STR_TO_DATE('" + valorConstraintINI + "', '%d/%m/%Y') AND STR_TO_DATE('" + valorConstraintFIM + "', '%d/%m/%Y')";

			}
		}

		myQuery += "\n 	SELECT "
		myQuery += "\n 		PW.NUM_PROCES, "
		myQuery += "\n 		CASE WHEN PW.STATUS = 0 THEN 'Aberta' WHEN PW.STATUS = 1 THEN 'Cancelada' WHEN PW.STATUS = 2 THEN 'Finalizada' ELSE 'INDEFINIDO' END AS SITUACAO , ";
		myQuery += "\n 		PW.COD_MATR_REQUISIT, ";
		myQuery += "\n 		MP.nomeSolicitante, ";

		myQuery += "\n 		CAST(EPMAX.NOM_ESTADO AS CHAR) AS LOCALIZACAO, ";
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_MOVTO = HPMAX.NUM_SEQ_MOVTO THEN CAST(UU.FULL_NAME AS CHAR)  END)  AS RESPONSAVEL, "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 6 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'INICIAR_SOLICITACAO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 6 THEN UU.FULL_NAME END) AS 'INICIAR_SOLICITACAO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 6 THEN TP.DEADLINE END) AS 'INICIAR_SOLICITACAO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 7 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'VALIDAR_INFORMACOES_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 7 THEN UU.FULL_NAME END) AS 'VALIDAR_INFORMACOES_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 7 THEN TP.DEADLINE END) AS 'VALIDAR_INFORMACOES_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 104 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'REVISAR_SOLICITACAO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 104 THEN UU.FULL_NAME END) AS 'REVISAR_SOLICITACAO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 104 THEN TP.DEADLINE END) AS 'REVISAR_SOLICITACAO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 14 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'GESTOR_LOCAL_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 14 THEN UU.FULL_NAME END) AS 'GESTOR_LOCAL_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 14 THEN TP.DEADLINE END) AS 'GESTOR_LOCAL_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 16 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'GERENTE_COORPORATIVO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 16 THEN UU.FULL_NAME END) AS 'GERENTE_COORPORATIVO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 16 THEN TP.DEADLINE END) AS 'GERENTE_COORPORATIVO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 20 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'DIRETOR_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 20 THEN UU.FULL_NAME END) AS 'DIRETOR_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 20 THEN TP.DEADLINE END) AS 'DIRETOR_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 18 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'GERENTE_RH_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 18 THEN UU.FULL_NAME END) AS 'GERENTE_RH_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 18 THEN TP.DEADLINE END) AS 'GERENTE_RH_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 92 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'GERAR_AVISO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 92 THEN UU.FULL_NAME END) AS 'GERAR_AVISO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 92 THEN TP.DEADLINE END) AS 'GERAR_AVISO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 375 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'IP_FECHAR_PONTO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 375 THEN UU.FULL_NAME END) AS 'IP_FECHAR_PONTO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 375 THEN TP.DEADLINE END) AS 'IP_FECHAR_PONTO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 120 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'FECHAR_PONTO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 120 THEN UU.FULL_NAME END) AS 'FECHAR_PONTO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 120 THEN TP.DEADLINE END) AS 'FECHAR_PONTO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 381 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'IP_SESMT_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 381 THEN UU.FULL_NAME END) AS 'IP_SESMT_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 381 THEN TP.DEADLINE END) AS 'IP_SESMT_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 378 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'IP_EMITIR_DEBITOS_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 378 THEN UU.FULL_NAME END) AS 'IP_EMITIR_DEBITOS_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 378 THEN TP.DEADLINE END) AS 'IP_EMITIR_DEBITOS_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 81 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'ARQUIVAR_AVISO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 81 THEN UU.FULL_NAME END) AS 'ARQUIVAR_AVISO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 81 THEN TP.DEADLINE END) AS 'ARQUIVAR_AVISO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 114 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'SUBS_AVISO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 114 THEN UU.FULL_NAME END) AS 'SUBS_AVISO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 114 THEN TP.DEADLINE END) AS 'SUBS_AVISO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 345 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'GERAR_DOCS_RESC_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 345 THEN UU.FULL_NAME END) AS 'GERAR_DOCS_RESC_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 345 THEN TP.DEADLINE END) AS 'GERAR_DOCS_RESC_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 332 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'COLETAR_ASS_DOCS_RESC_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 332 THEN UU.FULL_NAME END) AS 'COLETAR_ASS_DOCS_RESC_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 332 THEN TP.DEADLINE END) AS 'COLETAR_ASS_DOCS_RESC_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 333 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'VALIDAR_DOCS_RESC_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 333 THEN UU.FULL_NAME END) AS 'VALIDAR_DOCS_RESC_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 333 THEN TP.DEADLINE END) AS 'VALIDAR_DOCS_RESC_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 338 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'REVISAR_DOCS_RESC_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 338 THEN UU.FULL_NAME END) AS 'REVISAR_DOCS_RESC_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 338 THEN TP.DEADLINE END) AS 'REVISAR_DOCS_RESC_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 385 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'IP_ANALISE_CREDITO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 385 THEN UU.FULL_NAME END) AS 'IP_ANALISE_CREDITO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 385 THEN TP.DEADLINE END) AS 'IP_ANALISE_CREDITO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 384 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'IP_SUBP_TI_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 384 THEN UU.FULL_NAME END) AS 'IP_SUBP_TI_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 384 THEN TP.DEADLINE END) AS 'IP_SUBP_TI_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 218 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'ANALISAR_ASO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 218 THEN UU.FULL_NAME END) AS 'ANALISAR_ASO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 218 THEN TP.DEADLINE END) AS 'ANALISAR_ASO_PRAZO', "

		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 348 THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) END) AS 'AVALIAR_ATENDIMENTO_SLA', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 348 THEN UU.FULL_NAME END) AS 'AVALIAR_ATENDIMENTO_RESPONSAVEL', "
		myQuery += "\n 		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 348 THEN TP.DEADLINE END) AS 'AVALIAR_ATENDIMENTO_PRAZO', "


		myQuery += "\n	("
		myQuery += "\n		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 6 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END)  "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 7 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 104 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 14 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 16 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 20 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 18 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 92 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 375 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 120 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 29 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 381 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 378 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 81 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 114 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 345 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 332 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 333 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 338 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 385 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 384 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 218 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 348 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n	) AS TOTAL_SLA, "


		myQuery += "\n	("
		myQuery += "\n		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 6 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END)  "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 7 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 104 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 14 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 16 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 20 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 18 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 92 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 375 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 120 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 29 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 381 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 378 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 81 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 114 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 345 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 332 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 333 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 338 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 385 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 384 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 218 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 348 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n	) AS TOTAL_PRAZO, "

		myQuery += "\n	CASE WHEN ("
		myQuery += "\n		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 6 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END)  "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 7 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 104 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 14 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 16 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 20 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 18 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 92 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 375 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 120 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 29 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 381 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 378 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 81 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 114 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 345 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 332 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 333 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 338 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 385 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 384 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 218 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 348 AND TP.ASSIGN_END_DATE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.ASSIGN_END_DATE) ELSE 0 END) "
		myQuery += "\n	) - "

		myQuery += "\n	("
		myQuery += "\n		MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 6 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END)  "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 7 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 104 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 14 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 16 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 20 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 18 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 92 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 375 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 120 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 29 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 381 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 378 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 81 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 114 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 345 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 332 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 333 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 338 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 385 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 384 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 218 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n		+ MAX(CASE WHEN HP.NUM_SEQ_ESTADO = 348 AND TP.DEADLINE > '2020-01-01' THEN TIMESTAMPDIFF(SECOND, TP.ASSIGN_START_DATE, TP.DEADLINE) ELSE 0 END) "
		myQuery += "\n	) <= 0 THEN 'true' ELSE 'false' END AS CLASSIFICACAO, "

		myQuery += "\n 		'Relatório 05' AS RELATORIO ";
		myQuery += "\n FROM proces_workflow PW";
		myQuery += "\n LEFT JOIN def_proces DP 						ON DP.COD_DEF_PROCES = PW.COD_DEF_PROCES AND DP.COD_EMPRESA = PW.COD_EMPRESA ";
		myQuery += "\n INNER JOIN histor_proces HP 					ON HP.COD_EMPRESA = PW.COD_EMPRESA and HP.NUM_PROCES = PW.NUM_PROCES ";
		myQuery += "\n LEFT JOIN histor_proces HPMAX 				ON HPMAX.COD_EMPRESA = PW.COD_EMPRESA and HPMAX.NUM_PROCES = PW.NUM_PROCES AND HPMAX.NUM_SEQ_MOVTO = (SELECT MAX(NUM_SEQ_MOVTO) FROM histor_proces WHERE NUM_PROCES = PW.NUM_PROCES) ";
		myQuery += "\n INNER JOIN tar_proces TP			 			ON TP.COD_EMPRESA = PW.COD_EMPRESA and TP.NUM_PROCES = PW.NUM_PROCES AND TP.NUM_SEQ_MOVTO = HP.NUM_SEQ_MOVTO";
		myQuery += "\n LEFT JOIN estado_proces EP 					ON EP.COD_DEF_PROCES = PW.COD_DEF_PROCES and EP.NUM_VERS = PW.NUM_VERS AND EP.NUM_SEQ = HP.NUM_SEQ_ESTADO AND EP.COD_EMPRESA = PW.COD_EMPRESA ";
		myQuery += "\n LEFT JOIN estado_proces EPMAX				ON EPMAX.COD_DEF_PROCES = PW.COD_DEF_PROCES and EPMAX.NUM_VERS = PW.NUM_VERS AND EPMAX.NUM_SEQ = HPMAX.NUM_SEQ_ESTADO AND EPMAX.COD_EMPRESA = PW.COD_EMPRESA ";
		myQuery += "\n LEFT JOIN fdn_usertenant UT 					ON UT.USER_CODE = TP.CD_MATRICULA AND UT.TENANT_ID = PW.COD_EMPRESA ";
		myQuery += "\n LEFT JOIN fdn_user UU 						ON UU.USER_ID = UT.USER_ID ";

		myQuery += "\n INNER JOIN DOCUMENTO DOC 					ON DOC.COD_EMPRESA = PW.COD_EMPRESA and DOC.NR_DOCUMENTO = PW.NR_DOCUMENTO_CARD AND DOC.VERSAO_ATIVA = true ";
		myQuery += "\n INNER JOIN " + dados.TABELA_PRINCIPAL + " MP ON MP.companyid = DOC.COD_EMPRESA AND MP.documentid = DOC.NR_DOCUMENTO AND MP.version = DOC.NR_VERSAO ";
		// myQuery += "\n LEFT JOIN " + dados.TABELA_FILHO + " MF 		ON MF.companyid = DOC.COD_EMPRESA AND MF.documentid = DOC.NR_DOCUMENTO AND MF.version = DOC.NR_VERSAO ";
		myQuery += "\n WHERE DOC.COD_LISTA = " + dados.COD_LISTA_PAI + " AND DOC.VERSAO_ATIVA = 1 ";
		myQuery += "\n AND DOC.NUM_DOCTO_PROPRIED <> DOC.NR_DOCUMENTO ";
		myQuery += "\n AND PW.COD_DEF_PROCES = '" + dados.COD_DEF_PROCES + "' ";
		myQuery += "\n AND EP.IDI_TIP_BPMN IN (10, 80, 82, 60) ";
		myQuery += "\n AND PW.STATUS IS NOT NULL ";
		myQuery += setWhere;
		myQuery += "\n GROUP BY TP.NUM_PROCES  "
		myQuery += "\n ORDER BY PW.NUM_PROCES ASC, HP.NUM_SEQ_MOVTO DESC "

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
		newDataset.addColumn("LINHA");
		newDataset.addColumn("ERRO");
		newDataset.addRow([e.lineNumber, e.message]);
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