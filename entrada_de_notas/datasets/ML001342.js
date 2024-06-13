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
  "operation" : "ml001342",
  "tableType" : "TABLE",
  "parameters" : [ ],
  "inputValues" : {
    "ID" : [ ],
    "companyid" : [ ],
    "cardid" : [ ],
    "documentid" : [ {
      "fieldName" : "documentid",
      "initialValue" : "16302",
      "finalValue" : "16302",
"constraintType" :  ConstraintType.MUST,
      "likeSearch" : false,
      "fieldType" : "NUMBER"
    } ],
    "version" : [ ],
    "tableid" : [ ],
    "anonymization_date" : [ ],
    "anonymization_user_id" : [ ],
    "div_numero_solicitacao" : [ ],
    "numeroSolicitacao" : [ ],
    "div_solicitante" : [ ],
    "nomeSolicitante" : [ ],
    "itxt_matricula_colab" : [ ],
    "itxt_mail_colab" : [ ],
    "contato" : [ ],
    "zUnidade" : [ ],
    "nCodigo" : [ ],
    "zSegmento" : [ ],
    "div_solicitacao" : [ ],
    "assunto" : [ ],
    "acao" : [ ],
    "div_Software" : [ ],
    "zSoftware" : [ ],
    "div_categoria" : [ ],
    "categoria" : [ ],
    "idAnyDesk" : [ ],
    "div_Descricao" : [ ],
    "lbl_Sistemas" : [ ],
    "mensagem" : [ ],
    "div_UserVexpenses" : [ ],
    "Nome_UserVexpenses" : [ ],
    "CPF_CNPJ" : [ ],
    "cFone" : [ ],
    "data_nascimento" : [ ],
    "cFilial" : [ ],
    "Cargo_UserVexpenses" : [ ],
    "Superior_UserVexpenses" : [ ],
    "CCusto_UserVexpenses" : [ ],
    "Banco_UserVexpenses" : [ ],
    "Agencia_UserVexpenses" : [ ],
    "Conta_UserVexpenses" : [ ],
    "Email_UserVexpenses" : [ ],
    "Perfil_UserVexpenses" : [ ],
    "obs_UserVexpenses" : [ ],
    "div_SuporteProtheus" : [ ],
    "lbl_SolicitacaoProtheus" : [ ],
    "zEmpresa" : [ ],
    "zFilial" : [ ],
    "zModuloProtheus" : [ ],
    "RotinaProtheus" : [ ],
    "DescricaoSolicitacaoProtheus" : [ ],
    "div_UserProtheus" : [ ],
    "Nome_UserProtheus" : [ ],
    "Cargo_UserProtheus" : [ ],
    "Email_UserProtheus" : [ ],
    "Perfil_UserProtheus" : [ ],
    "obs_UserProtheus" : [ ],
    "div_Validacao" : [ ],
    "Validado" : [ ],
    "div_descComplementa" : [ ],
    "f" : [ ],
    "div_Aprovacao" : [ ],
    "zSLA" : [ ],
    "nSLA" : [ ],
    "obs_analise" : [ ],
    "div_AtendimentoN1" : [ ],
    "AceitoN1" : [ ],
    "div_TranfereN2" : [ ],
    "div_AtendN1" : [ ],
    "zUsers" : [ ],
    "div_Atendimento" : [ ],
    "zAtendente" : [ ],
    "lbl_ConcluidoN1" : [ ],
    "Obs_N1" : [ ],
    "div_AtendimentoN2" : [ ],
    "AceitoN2" : [ ],
    "lbl_ConcluidoN2" : [ ],
    "Obs_N2" : [ ],
    "div_AtendimentoN3" : [ ],
    "AceitoN3" : [ ],
    "div_ObsN3" : [ ],
    "lbl_ConcluidoN3" : [ ],
    "lbl_InformacaoN3" : [ ],
    "Obs_N3" : [ ],
    "div_Avaliacao" : [ ],
    "Avaliado" : [ ],
    "div_descAvaliacao" : [ ],
    "descAvaliacao" : [ ],
    "div_Historico" : [ ],
    "Obs_Historico" : [ ],
    "div_dados_ocultos" : [ ],
    "lAprova" : [ ],
    "Atividade_Conjunta" : [ ],
    "mensagem_original" : [ ],
    "SlaN1" : [ ],
    "SlaN2" : [ ],
    "SlaN3" : [ ],
    "div_atribuicoes" : [ ],
    "cTask004" : [ ],
    "zTask004" : [ ],
    "nTask004" : [ ],
    "cTask008" : [ ],
    "zTask008" : [ ],
    "nTask008" : [ ],
    "cTask013" : [ ],
    "zTask013" : [ ],
    "nTask013" : [ ],
    "cTask029" : [ ],
    "zTask029" : [ ],
    "nTask029" : [ ],
    "cTask065" : [ ],
    "zTask065" : [ ],
    "nTask065" : [ ],
    "cTask066" : [ ],
    "zTask066" : [ ],
    "nTask066" : [ ],
    "cTask077" : [ ],
    "zTask077" : [ ],
    "nTask077" : [ ],
    "cTask090" : [ ],
    "zTask090" : [ ],
    "nTask090" : [ ],
    "cTask094" : [ ],
    "zTask094" : [ ],
    "nTask094" : [ ],
    "cTask095" : [ ],
    "zTask095" : [ ],
    "nTask095" : [ ],
    "descComplementa" : [ ],
    "cTask107" : [ ],
    "zTask107" : [ ],
    "nTask107" : [ ]
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
    "div_solicitante" : {
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
    "div_solicitacao" : {
      "result" : true,
      "type" : "text"
    },
    "assunto" : {
      "result" : true,
      "type" : "text"
    },
    "acao" : {
      "result" : true,
      "type" : "text"
    },
    "div_Software" : {
      "result" : true,
      "type" : "text"
    },
    "zSoftware" : {
      "result" : true,
      "type" : "text"
    },
    "div_categoria" : {
      "result" : true,
      "type" : "text"
    },
    "categoria" : {
      "result" : true,
      "type" : "text"
    },
    "idAnyDesk" : {
      "result" : true,
      "type" : "text"
    },
    "div_Descricao" : {
      "result" : true,
      "type" : "text"
    },
    "lbl_Sistemas" : {
      "result" : true,
      "type" : "text"
    },
    "mensagem" : {
      "result" : true,
      "type" : "text"
    },
    "div_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "Nome_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "CPF_CNPJ" : {
      "result" : true,
      "type" : "text"
    },
    "cFone" : {
      "result" : true,
      "type" : "text"
    },
    "data_nascimento" : {
      "result" : true,
      "type" : "text"
    },
    "cFilial" : {
      "result" : true,
      "type" : "text"
    },
    "Cargo_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "Superior_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "CCusto_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "Banco_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "Agencia_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "Conta_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "Email_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "Perfil_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "obs_UserVexpenses" : {
      "result" : true,
      "type" : "text"
    },
    "div_SuporteProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "lbl_SolicitacaoProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "zEmpresa" : {
      "result" : true,
      "type" : "text"
    },
    "zFilial" : {
      "result" : true,
      "type" : "text"
    },
    "zModuloProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "RotinaProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "DescricaoSolicitacaoProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "div_UserProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "Nome_UserProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "Cargo_UserProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "Email_UserProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "Perfil_UserProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "obs_UserProtheus" : {
      "result" : true,
      "type" : "text"
    },
    "div_Validacao" : {
      "result" : true,
      "type" : "text"
    },
    "Validado" : {
      "result" : true,
      "type" : "text"
    },
    "div_descComplementa" : {
      "result" : true,
      "type" : "text"
    },
    "f" : {
      "result" : true,
      "type" : "text"
    },
    "div_Aprovacao" : {
      "result" : true,
      "type" : "text"
    },
    "zSLA" : {
      "result" : true,
      "type" : "text"
    },
    "nSLA" : {
      "result" : true,
      "type" : "text"
    },
    "obs_analise" : {
      "result" : true,
      "type" : "text"
    },
    "div_AtendimentoN1" : {
      "result" : true,
      "type" : "text"
    },
    "AceitoN1" : {
      "result" : true,
      "type" : "text"
    },
    "div_TranfereN2" : {
      "result" : true,
      "type" : "text"
    },
    "div_AtendN1" : {
      "result" : true,
      "type" : "text"
    },
    "zUsers" : {
      "result" : true,
      "type" : "text"
    },
    "div_Atendimento" : {
      "result" : true,
      "type" : "text"
    },
    "zAtendente" : {
      "result" : true,
      "type" : "text"
    },
    "lbl_ConcluidoN1" : {
      "result" : true,
      "type" : "text"
    },
    "Obs_N1" : {
      "result" : true,
      "type" : "text"
    },
    "div_AtendimentoN2" : {
      "result" : true,
      "type" : "text"
    },
    "AceitoN2" : {
      "result" : true,
      "type" : "text"
    },
    "lbl_ConcluidoN2" : {
      "result" : true,
      "type" : "text"
    },
    "Obs_N2" : {
      "result" : true,
      "type" : "text"
    },
    "div_AtendimentoN3" : {
      "result" : true,
      "type" : "text"
    },
    "AceitoN3" : {
      "result" : true,
      "type" : "text"
    },
    "div_ObsN3" : {
      "result" : true,
      "type" : "text"
    },
    "lbl_ConcluidoN3" : {
      "result" : true,
      "type" : "text"
    },
    "lbl_InformacaoN3" : {
      "result" : true,
      "type" : "text"
    },
    "Obs_N3" : {
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
    "div_descAvaliacao" : {
      "result" : true,
      "type" : "text"
    },
    "descAvaliacao" : {
      "result" : true,
      "type" : "text"
    },
    "div_Historico" : {
      "result" : true,
      "type" : "text"
    },
    "Obs_Historico" : {
      "result" : true,
      "type" : "text"
    },
    "div_dados_ocultos" : {
      "result" : true,
      "type" : "text"
    },
    "lAprova" : {
      "result" : true,
      "type" : "text"
    },
    "Atividade_Conjunta" : {
      "result" : true,
      "type" : "text"
    },
    "mensagem_original" : {
      "result" : true,
      "type" : "text"
    },
    "SlaN1" : {
      "result" : true,
      "type" : "text"
    },
    "SlaN2" : {
      "result" : true,
      "type" : "text"
    },
    "SlaN3" : {
      "result" : true,
      "type" : "text"
    },
    "div_atribuicoes" : {
      "result" : true,
      "type" : "text"
    },
    "cTask004" : {
      "result" : true,
      "type" : "text"
    },
    "zTask004" : {
      "result" : true,
      "type" : "text"
    },
    "nTask004" : {
      "result" : true,
      "type" : "text"
    },
    "cTask008" : {
      "result" : true,
      "type" : "text"
    },
    "zTask008" : {
      "result" : true,
      "type" : "text"
    },
    "nTask008" : {
      "result" : true,
      "type" : "text"
    },
    "cTask013" : {
      "result" : true,
      "type" : "text"
    },
    "zTask013" : {
      "result" : true,
      "type" : "text"
    },
    "nTask013" : {
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
    "cTask065" : {
      "result" : true,
      "type" : "text"
    },
    "zTask065" : {
      "result" : true,
      "type" : "text"
    },
    "nTask065" : {
      "result" : true,
      "type" : "text"
    },
    "cTask066" : {
      "result" : true,
      "type" : "text"
    },
    "zTask066" : {
      "result" : true,
      "type" : "text"
    },
    "nTask066" : {
      "result" : true,
      "type" : "text"
    },
    "cTask077" : {
      "result" : true,
      "type" : "text"
    },
    "zTask077" : {
      "result" : true,
      "type" : "text"
    },
    "nTask077" : {
      "result" : true,
      "type" : "text"
    },
    "cTask090" : {
      "result" : true,
      "type" : "text"
    },
    "zTask090" : {
      "result" : true,
      "type" : "text"
    },
    "nTask090" : {
      "result" : true,
      "type" : "text"
    },
    "cTask094" : {
      "result" : true,
      "type" : "text"
    },
    "zTask094" : {
      "result" : true,
      "type" : "text"
    },
    "nTask094" : {
      "result" : true,
      "type" : "text"
    },
    "cTask095" : {
      "result" : true,
      "type" : "text"
    },
    "zTask095" : {
      "result" : true,
      "type" : "text"
    },
    "nTask095" : {
      "result" : true,
      "type" : "text"
    },
    "descComplementa" : {
      "result" : true,
      "type" : "text"
    },
    "cTask107" : {
      "result" : true,
      "type" : "text"
    },
    "zTask107" : {
      "result" : true,
      "type" : "text"
    },
    "nTask107" : {
      "result" : true,
      "type" : "text"
    }
  },
  "outputAssignments" : { },
  "extraParams" : { }
}
;
}