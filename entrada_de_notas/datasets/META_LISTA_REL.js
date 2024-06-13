function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var databaseData = data();
	var resultFields, queryClauses;

	resultFields = getOutputFields(databaseData.outputValues);
	queryClauses = verifyConstraints(databaseData, constraints);

	var result = DatabaseManager.select(databaseData.fluigService, databaseData.operation, resultFields, queryClauses, databaseData.extraParams);

	return result;
}

function defineStructure() {
	var databaseData = data();
	var columns = getOutputFields(databaseData.outputValues);

	for (column in columns) {
		var columnName = removeInvalidChars(columns[column]);
		if (!DatabaseManager.isReservedWord(columnName)) {
			addColumn(columnName);
		} else {
			addColumn('ds_' + columnName);
		}
	}
	if (databaseData.extraParams.key) {
		setKey([databaseData.extraParams.key]);
	}
}

function onSync(lastSyncDate) {
	var databaseData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				if (databaseData.extraParams.key) {
					synchronizedDataset.addOrUpdateRow(values[i]);
				} else {
					synchronizedDataset.addRow(values[i]);
				}
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function verifyConstraints(params, constraints) {
	var allConstraints = new Array();

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].getFieldName().toLowerCase() == 'sqllimit') {
				params.extraParams['limit'] = constraints[i].getInitialValue();
			} else {
				allConstraints.push(constraints[i]);
			}
		}
	}

	if (allConstraints.length == 0) {
		for (i in params.inputValues) {
			for (j in params.inputValues[i]) {
				var param = params.inputValues[i][j];
				var constraint = DatasetFactory.createConstraint(param.fieldName, param.initialValue, param.finalValue, param.constraintType);
				constraint.setLikeSearch(param.likeSearch);
				constraint.setFieldType(DatasetFieldType.valueOf(param.fieldType));
				allConstraints.push(constraint);
			}
		}
	}
	return allConstraints;
}

function getOutputFields(outputValues) {
	var outputFields = new Array();
	if (outputValues != null) {
		for (field in outputValues) {
			if (outputValues[field].result) {
				outputFields.push(field);
			}
		}
	}
	return outputFields;
}

function processResult(result) {
	var databaseData = data();
	var dataset = DatasetBuilder.newDataset();
	var columns = getOutputFields(databaseData.outputValues);

	for (column in columns) {
		dataset.addColumn(columns[column]);
	}

	for (var i = 0; i < result.size(); i++) {
		var datasetRow = new Array();
		var item = result.get(i);
		for (param in columns) {
			datasetRow.push(item.get(columns[param]));
		}
		dataset.addRow(datasetRow);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn('error');
	dataset.addRow([error.message]);

	return dataset;
}

function removeInvalidChars(columnName) {
	var invalidChars = '#';
	var newChar = '_';
	for (var i = 0; i < invalidChars.length; i++) {
		columnName = columnName.split(invalidChars[i]).join(newChar);
	}

	return columnName;
}

function data() {
	return {
  "fluigService" : "AppDS",
  "operation" : "ml001242",
  "tableType" : "TABLE",
  "parameters" : [ ],
  "inputValues" : {
    "ID" : [ ],
    "companyid" : [ ],
    "cardid" : [ ],
    "documentid" : [ ],
    "version" : [ ],
    "tableid" : [ ],
    "anonymization_date" : [ ],
    "anonymization_user_id" : [ ],
    "div_numero_solicitacao" : [ ],
    "numeroSolicitacao" : [ ],
    "div_dados_solicitante" : [ ],
    "nomeSolicitante" : [ ],
    "itxt_matricula_colab" : [ ],
    "itxt_mail_colab" : [ ],
    "contato" : [ ],
    "zUnidade" : [ ],
    "nCodigo" : [ ],
    "zSegmento" : [ ],
    "div_dados_solicitacao" : [ ],
    "assunto" : [ ],
    "cnpj" : [ ],
    "colaborador" : [ ],
    "dataAdmissao" : [ ],
    "matricula" : [ ],
    "aviso" : [ ],
    "div_desconto_aviso" : [ ],
    "pedido_demissao" : [ ],
    "tipo_aviso" : [ ],
    "data_aviso" : [ ],
    "data_final_aviso" : [ ],
    "ultimodia" : [ ],
    "termino_antecip" : [ ],
    "colab_subst" : [ ],
    "medidas" : [ ],
    "checkbox520" : [ ],
    "checkbox521" : [ ],
    "checkbox522" : [ ],
    "checkbox523" : [ ],
    "checkbox524" : [ ],
    "checkbox525" : [ ],
    "checkbox526" : [ ],
    "div_Outro_motivo" : [ ],
    "just_desligamen" : [ ],
    "nome_gestor" : [ ],
    "hidden_nome_gestor" : [ ],
    "nome_gerente" : [ ],
    "hidden_nome_gerente" : [ ],
    "nome_gerenteRH" : [ ],
    "hidden_nome_gerenteRH" : [ ],
    "nome_diretor" : [ ],
    "hidden_nome_diretor" : [ ],
    "atendente_resc" : [ ],
    "hidden_atendente_resc" : [ ],
    "div_Validar" : [ ],
    "revisao_formula" : [ ],
    "obs_desligament" : [ ],
    "atenddebitos" : [ ],
    "hidden_atenddebitos" : [ ],
    "atendente_ponto" : [ ],
    "hidden_atendente_ponto" : [ ],
    "div_Obs_Fec_Ponto" : [ ],
    "obs_fech_ponto" : [ ],
    "PIS" : [ ],
    "RG" : [ ],
    "cargo" : [ ],
    "CTPS" : [ ],
    "colab_estabilid" : [ ],
    "obs_estabilidad" : [ ],
    "CPF" : [ ],
    "matricula_colaborador" : [ ],
    "centro_custo" : [ ],
    "div_Ap_Ger_Loc" : [ ],
    "aprov_gestor" : [ ],
    "obs_aprov_gesto" : [ ],
    "div_Aprova_Ger_Geral" : [ ],
    "aprov_gerente" : [ ],
    "obs_ger_area" : [ ],
    "div_Aprova_Diretor" : [ ],
    "aprov_Diretor" : [ ],
    "aprovacao_diretor" : [ ],
    "div_Aprova_Ger_RH" : [ ],
    "aprov_gerenteRH" : [ ],
    "obs_aprov_gerrh" : [ ],
    "div_Gera_Aviso" : [ ],
    "obs_Gera_Aviso" : [ ],
    "div_Coletar_Assinatura" : [ ],
    "obs_Coleta_Assinatura" : [ ],
    "div_Informa_Debito" : [ ],
    "Obs_debitos" : [ ],
    "div_Arquiva_Documento" : [ ],
    "obs_doc_deslig" : [ ],
    "rev_doc_deslg" : [ ],
    "div_Subst_Documento" : [ ],
    "Obs_Subst_Doc" : [ ],
    "div_Analisar_Aso" : [ ],
    "rev_infASO" : [ ],
    "obs_aso" : [ ],
    "div_atribuicoes" : [ ],
    "cTask007" : [ ],
    "zTask007" : [ ],
    "nTask007" : [ ],
    "cTask104" : [ ],
    "zTask104" : [ ],
    "nTask104" : [ ],
    "cTask014" : [ ],
    "zTask014" : [ ],
    "nTask013" : [ ],
    "cTask016" : [ ],
    "zTask016" : [ ],
    "nTask016" : [ ],
    "cTask020" : [ ],
    "zTask020" : [ ],
    "nTask020" : [ ],
    "cTask018" : [ ],
    "zTask018" : [ ],
    "nTask018" : [ ],
    "cTask275" : [ ],
    "zTask275" : [ ],
    "nTask275" : [ ],
    "cTask029" : [ ],
    "zTask029" : [ ],
    "nTask029" : [ ],
    "cTask120" : [ ],
    "zTask120" : [ ],
    "nTask120" : [ ],
    "cTask034" : [ ],
    "zTask034" : [ ],
    "nTask034" : [ ],
    "cTask092" : [ ],
    "zTask092" : [ ],
    "nTask092" : [ ],
    "cTask081" : [ ],
    "zTask081" : [ ],
    "nTask081" : [ ],
    "cTask114" : [ ],
    "zTask114" : [ ],
    "nTask114" : [ ],
    "cTask218" : [ ],
    "zTask218" : [ ],
    "nTask218" : [ ],
    "data_nascimento" : [ ],
    "div_dados_ocultos" : [ ],
    "guiaexame" : [ ],
    "div_Rescisao_RH" : [ ],
    "pedidodemissao" : [ ],
    "terminoexperien" : [ ],
    "atendenterescis" : [ ],
    "hidden_atendenterescis" : [ ],
    "revisao" : [ ],
    "mensagem" : [ ],
    "comentario" : [ ],
    "div_Revisao_RH" : [ ],
    "cTask332" : [ ],
    "zTask332" : [ ],
    "nTask332" : [ ],
    "cTask333" : [ ],
    "zTask333" : [ ],
    "nTask333" : [ ],
    "cTask338" : [ ],
    "zTask338" : [ ],
    "nTask338" : [ ],
    "div_Just_Estabilidade" : [ ],
    "div_Doc_desligamento" : [ ],
    "Obs_Doc_Desligamento" : [ ],
    "cTask345" : [ ],
    "zTask345" : [ ],
    "nTask345" : [ ],
    "div_Avaliacao" : [ ],
    "Avaliado" : [ ],
    "cTask348" : [ ],
    "zTask072" : [ ],
    "nTask348" : [ ],
    "div_descAvaliacao" : [ ],
    "descAvaliacao" : [ ],
    "zTask348" : [ ],
    "matricula_col" : [ ],
    "anexos" : [ ],
    "txt_desconto_aviso" : [ ],
    "cTask395" : [ ],
    "zTask395" : [ ],
    "nTask395" : [ ],
    "cTask005_05_19" : [ ],
    "zTask005_05_19" : [ ],
    "nTask005_05_19" : [ ],
    "contatoSolicitacao" : [ ],
    "itxt_mail_solicitacao" : [ ]
  },
  "inputAssignments" : { },
  "outputValues" : {
    "ID" : {
      "result" : true,
      "type" : "int"
    },
    "companyid" : {
      "result" : true,
      "type" : "int"
    },
    "cardid" : {
      "result" : true,
      "type" : "int"
    },
    "documentid" : {
      "result" : true,
      "type" : "int"
    },
    "version" : {
      "result" : true,
      "type" : "int"
    },
    "tableid" : {
      "result" : true,
      "type" : "text"
    },
    "anonymization_date" : {
      "result" : true,
      "type" : "date"
    },
    "anonymization_user_id" : {
      "result" : true,
      "type" : "text"
    },
    "div_numero_solicitacao" : {
      "result" : true,
      "type" : "text"
    },
    "numeroSolicitacao" : {
      "result" : true,
      "type" : "text"
    },
    "div_dados_solicitante" : {
      "result" : true,
      "type" : "text"
    },
    "nomeSolicitante" : {
      "result" : true,
      "type" : "text"
    },
    "itxt_matricula_colab" : {
      "result" : true,
      "type" : "text"
    },
    "itxt_mail_colab" : {
      "result" : true,
      "type" : "text"
    },
    "contato" : {
      "result" : true,
      "type" : "text"
    },
    "zUnidade" : {
      "result" : true,
      "type" : "text"
    },
    "nCodigo" : {
      "result" : true,
      "type" : "text"
    },
    "zSegmento" : {
      "result" : true,
      "type" : "text"
    },
    "div_dados_solicitacao" : {
      "result" : true,
      "type" : "text"
    },
    "assunto" : {
      "result" : true,
      "type" : "text"
    },
    "cnpj" : {
      "result" : true,
      "type" : "text"
    },
    "colaborador" : {
      "result" : true,
      "type" : "text"
    },
    "dataAdmissao" : {
      "result" : true,
      "type" : "text"
    },
    "matricula" : {
      "result" : true,
      "type" : "text"
    },
    "aviso" : {
      "result" : true,
      "type" : "text"
    },
    "div_desconto_aviso" : {
      "result" : true,
      "type" : "text"
    },
    "pedido_demissao" : {
      "result" : true,
      "type" : "text"
    },
    "tipo_aviso" : {
      "result" : true,
      "type" : "text"
    },
    "data_aviso" : {
      "result" : true,
      "type" : "text"
    },
    "data_final_aviso" : {
      "result" : true,
      "type" : "text"
    },
    "ultimodia" : {
      "result" : true,
      "type" : "text"
    },
    "termino_antecip" : {
      "result" : true,
      "type" : "text"
    },
    "colab_subst" : {
      "result" : true,
      "type" : "text"
    },
    "medidas" : {
      "result" : true,
      "type" : "text"
    },
    "checkbox520" : {
      "result" : true,
      "type" : "text"
    },
    "checkbox521" : {
      "result" : true,
      "type" : "text"
    },
    "checkbox522" : {
      "result" : true,
      "type" : "text"
    },
    "checkbox523" : {
      "result" : true,
      "type" : "text"
    },
    "checkbox524" : {
      "result" : true,
      "type" : "text"
    },
    "checkbox525" : {
      "result" : true,
      "type" : "text"
    },
    "checkbox526" : {
      "result" : true,
      "type" : "text"
    },
    "div_Outro_motivo" : {
      "result" : true,
      "type" : "text"
    },
    "just_desligamen" : {
      "result" : true,
      "type" : "text"
    },
    "nome_gestor" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_nome_gestor" : {
      "result" : true,
      "type" : "text"
    },
    "nome_gerente" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_nome_gerente" : {
      "result" : true,
      "type" : "text"
    },
    "nome_gerenteRH" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_nome_gerenteRH" : {
      "result" : true,
      "type" : "text"
    },
    "nome_diretor" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_nome_diretor" : {
      "result" : true,
      "type" : "text"
    },
    "atendente_resc" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_atendente_resc" : {
      "result" : true,
      "type" : "text"
    },
    "div_Validar" : {
      "result" : true,
      "type" : "text"
    },
    "revisao_formula" : {
      "result" : true,
      "type" : "text"
    },
    "obs_desligament" : {
      "result" : true,
      "type" : "text"
    },
    "atenddebitos" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_atenddebitos" : {
      "result" : true,
      "type" : "text"
    },
    "atendente_ponto" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_atendente_ponto" : {
      "result" : true,
      "type" : "text"
    },
    "div_Obs_Fec_Ponto" : {
      "result" : true,
      "type" : "text"
    },
    "obs_fech_ponto" : {
      "result" : true,
      "type" : "text"
    },
    "PIS" : {
      "result" : true,
      "type" : "text"
    },
    "RG" : {
      "result" : true,
      "type" : "text"
    },
    "cargo" : {
      "result" : true,
      "type" : "text"
    },
    "CTPS" : {
      "result" : true,
      "type" : "text"
    },
    "colab_estabilid" : {
      "result" : true,
      "type" : "text"
    },
    "obs_estabilidad" : {
      "result" : true,
      "type" : "text"
    },
    "CPF" : {
      "result" : true,
      "type" : "text"
    },
    "matricula_colaborador" : {
      "result" : true,
      "type" : "text"
    },
    "centro_custo" : {
      "result" : true,
      "type" : "text"
    },
    "div_Ap_Ger_Loc" : {
      "result" : true,
      "type" : "text"
    },
    "aprov_gestor" : {
      "result" : true,
      "type" : "text"
    },
    "obs_aprov_gesto" : {
      "result" : true,
      "type" : "text"
    },
    "div_Aprova_Ger_Geral" : {
      "result" : true,
      "type" : "text"
    },
    "aprov_gerente" : {
      "result" : true,
      "type" : "text"
    },
    "obs_ger_area" : {
      "result" : true,
      "type" : "text"
    },
    "div_Aprova_Diretor" : {
      "result" : true,
      "type" : "text"
    },
    "aprov_Diretor" : {
      "result" : true,
      "type" : "text"
    },
    "aprovacao_diretor" : {
      "result" : true,
      "type" : "text"
    },
    "div_Aprova_Ger_RH" : {
      "result" : true,
      "type" : "text"
    },
    "aprov_gerenteRH" : {
      "result" : true,
      "type" : "text"
    },
    "obs_aprov_gerrh" : {
      "result" : true,
      "type" : "text"
    },
    "div_Gera_Aviso" : {
      "result" : true,
      "type" : "text"
    },
    "obs_Gera_Aviso" : {
      "result" : true,
      "type" : "text"
    },
    "div_Coletar_Assinatura" : {
      "result" : true,
      "type" : "text"
    },
    "obs_Coleta_Assinatura" : {
      "result" : true,
      "type" : "text"
    },
    "div_Informa_Debito" : {
      "result" : true,
      "type" : "text"
    },
    "Obs_debitos" : {
      "result" : true,
      "type" : "text"
    },
    "div_Arquiva_Documento" : {
      "result" : true,
      "type" : "text"
    },
    "obs_doc_deslig" : {
      "result" : true,
      "type" : "text"
    },
    "rev_doc_deslg" : {
      "result" : true,
      "type" : "text"
    },
    "div_Subst_Documento" : {
      "result" : true,
      "type" : "text"
    },
    "Obs_Subst_Doc" : {
      "result" : true,
      "type" : "text"
    },
    "div_Analisar_Aso" : {
      "result" : true,
      "type" : "text"
    },
    "rev_infASO" : {
      "result" : true,
      "type" : "text"
    },
    "obs_aso" : {
      "result" : true,
      "type" : "text"
    },
    "div_atribuicoes" : {
      "result" : true,
      "type" : "text"
    },
    "cTask007" : {
      "result" : true,
      "type" : "text"
    },
    "zTask007" : {
      "result" : true,
      "type" : "text"
    },
    "nTask007" : {
      "result" : true,
      "type" : "text"
    },
    "cTask104" : {
      "result" : true,
      "type" : "text"
    },
    "zTask104" : {
      "result" : true,
      "type" : "text"
    },
    "nTask104" : {
      "result" : true,
      "type" : "text"
    },
    "cTask014" : {
      "result" : true,
      "type" : "text"
    },
    "zTask014" : {
      "result" : true,
      "type" : "text"
    },
    "nTask013" : {
      "result" : true,
      "type" : "text"
    },
    "cTask016" : {
      "result" : true,
      "type" : "text"
    },
    "zTask016" : {
      "result" : true,
      "type" : "text"
    },
    "nTask016" : {
      "result" : true,
      "type" : "text"
    },
    "cTask020" : {
      "result" : true,
      "type" : "text"
    },
    "zTask020" : {
      "result" : true,
      "type" : "text"
    },
    "nTask020" : {
      "result" : true,
      "type" : "text"
    },
    "cTask018" : {
      "result" : true,
      "type" : "text"
    },
    "zTask018" : {
      "result" : true,
      "type" : "text"
    },
    "nTask018" : {
      "result" : true,
      "type" : "text"
    },
    "cTask275" : {
      "result" : true,
      "type" : "text"
    },
    "zTask275" : {
      "result" : true,
      "type" : "text"
    },
    "nTask275" : {
      "result" : true,
      "type" : "text"
    },
    "cTask029" : {
      "result" : true,
      "type" : "text"
    },
    "zTask029" : {
      "result" : true,
      "type" : "text"
    },
    "nTask029" : {
      "result" : true,
      "type" : "text"
    },
    "cTask120" : {
      "result" : true,
      "type" : "text"
    },
    "zTask120" : {
      "result" : true,
      "type" : "text"
    },
    "nTask120" : {
      "result" : true,
      "type" : "text"
    },
    "cTask034" : {
      "result" : true,
      "type" : "text"
    },
    "zTask034" : {
      "result" : true,
      "type" : "text"
    },
    "nTask034" : {
      "result" : true,
      "type" : "text"
    },
    "cTask092" : {
      "result" : true,
      "type" : "text"
    },
    "zTask092" : {
      "result" : true,
      "type" : "text"
    },
    "nTask092" : {
      "result" : true,
      "type" : "text"
    },
    "cTask081" : {
      "result" : true,
      "type" : "text"
    },
    "zTask081" : {
      "result" : true,
      "type" : "text"
    },
    "nTask081" : {
      "result" : true,
      "type" : "text"
    },
    "cTask114" : {
      "result" : true,
      "type" : "text"
    },
    "zTask114" : {
      "result" : true,
      "type" : "text"
    },
    "nTask114" : {
      "result" : true,
      "type" : "text"
    },
    "cTask218" : {
      "result" : true,
      "type" : "text"
    },
    "zTask218" : {
      "result" : true,
      "type" : "text"
    },
    "nTask218" : {
      "result" : true,
      "type" : "text"
    },
    "data_nascimento" : {
      "result" : true,
      "type" : "text"
    },
    "div_dados_ocultos" : {
      "result" : true,
      "type" : "text"
    },
    "guiaexame" : {
      "result" : true,
      "type" : "text"
    },
    "div_Rescisao_RH" : {
      "result" : true,
      "type" : "text"
    },
    "pedidodemissao" : {
      "result" : true,
      "type" : "text"
    },
    "terminoexperien" : {
      "result" : true,
      "type" : "text"
    },
    "atendenterescis" : {
      "result" : true,
      "type" : "text"
    },
    "hidden_atendenterescis" : {
      "result" : true,
      "type" : "text"
    },
    "revisao" : {
      "result" : true,
      "type" : "text"
    },
    "mensagem" : {
      "result" : true,
      "type" : "text"
    },
    "comentario" : {
      "result" : true,
      "type" : "text"
    },
    "div_Revisao_RH" : {
      "result" : true,
      "type" : "text"
    },
    "cTask332" : {
      "result" : true,
      "type" : "text"
    },
    "zTask332" : {
      "result" : true,
      "type" : "text"
    },
    "nTask332" : {
      "result" : true,
      "type" : "text"
    },
    "cTask333" : {
      "result" : true,
      "type" : "text"
    },
    "zTask333" : {
      "result" : true,
      "type" : "text"
    },
    "nTask333" : {
      "result" : true,
      "type" : "text"
    },
    "cTask338" : {
      "result" : true,
      "type" : "text"
    },
    "zTask338" : {
      "result" : true,
      "type" : "text"
    },
    "nTask338" : {
      "result" : true,
      "type" : "text"
    },
    "div_Just_Estabilidade" : {
      "result" : true,
      "type" : "text"
    },
    "div_Doc_desligamento" : {
      "result" : true,
      "type" : "text"
    },
    "Obs_Doc_Desligamento" : {
      "result" : true,
      "type" : "text"
    },
    "cTask345" : {
      "result" : true,
      "type" : "text"
    },
    "zTask345" : {
      "result" : true,
      "type" : "text"
    },
    "nTask345" : {
      "result" : true,
      "type" : "text"
    },
    "div_Avaliacao" : {
      "result" : true,
      "type" : "text"
    },
    "Avaliado" : {
      "result" : true,
      "type" : "text"
    },
    "cTask348" : {
      "result" : true,
      "type" : "text"
    },
    "zTask072" : {
      "result" : true,
      "type" : "text"
    },
    "nTask348" : {
      "result" : true,
      "type" : "text"
    },
    "div_descAvaliacao" : {
      "result" : true,
      "type" : "text"
    },
    "descAvaliacao" : {
      "result" : true,
      "type" : "text"
    },
    "zTask348" : {
      "result" : true,
      "type" : "text"
    },
    "matricula_col" : {
      "result" : true,
      "type" : "text"
    },
    "anexos" : {
      "result" : true,
      "type" : "text"
    },
    "txt_desconto_aviso" : {
      "result" : true,
      "type" : "text"
    },
    "cTask395" : {
      "result" : true,
      "type" : "text"
    },
    "zTask395" : {
      "result" : true,
      "type" : "text"
    },
    "nTask395" : {
      "result" : true,
      "type" : "text"
    },
    "cTask005_05_19" : {
      "result" : true,
      "type" : "text"
    },
    "zTask005_05_19" : {
      "result" : true,
      "type" : "text"
    },
    "nTask005_05_19" : {
      "result" : true,
      "type" : "text"
    },
    "contatoSolicitacao" : {
      "result" : true,
      "type" : "text"
    },
    "itxt_mail_solicitacao" : {
      "result" : true,
      "type" : "text"
    }
  },
  "outputAssignments" : { },
  "extraParams" : { }
};
}