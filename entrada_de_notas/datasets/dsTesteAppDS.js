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
  "operation" : "documento",
  "tableType" : "TABLE",
  "parameters" : [ ],
  "inputValues" : {
    "COD_EMPRESA" : [ ],
    "NR_DOCUMENTO" : [ ],
    "NR_VERSAO" : [ ],
    "COD_UUID" : [ ],
    "NR_ACESSOS" : [ ],
    "VERSAO_ATIVA" : [ ],
    "DS_COMENTARIO_ADICIONAL" : [ ],
    "PERMITIR_MULTI_FICHAS" : [ ],
    "APROV_E_OU" : [ ],
    "LOG_APROVADO" : [ ],
    "DT_APROVACAO" : [ ],
    "CD_ATUALIZACAO" : [ ],
    "DES_PRINC_FICHA" : [ ],
    "LOG_PASTA_CHECKOUT" : [ ],
    "CD_MATRICULA" : [ ],
    "IDI_TIP_ARMAZ_LP" : [ ],
    "NUM_CRC" : [ ],
    "DT_CRIACAO" : [ ],
    "NM_DATASET" : [ {
      "fieldName" : "NM_DATASET",
      "initialValue" : "DSFormularioderescisao_rh",
      "finalValue" : "DSFormularioderescisao_rh",
"constraintType" :  ConstraintType.MUST,
      "likeSearch" : true,
      "fieldType" : "STRING"
    } ],
    "LOG_DELETE" : [ ],
    "DS_PRINCIPAL_DOCUMENTO" : [ ],
    "NUM_DOCTO_PROPRIED" : [ ],
    "NUM_VERS_PROPRIED" : [ ],
    "TP_DOCUMENTO" : [ ],
    "CD_TIPO_DOC" : [ ],
    "LOG_PERMITE_DOWNLOAD" : [ ],
    "LOG_RASCUNHO" : [ ],
    "DT_EXPIRACAO" : [ ],
    "LOG_DOCTO_EXPIRA" : [ ],
    "CD_DOCUMENTO_EXT" : [ ],
    "NR_ICONE" : [ ],
    "LOG_NAO_ALTERA" : [ ],
    "LOG_INDEXAD" : [ ],
    "LOG_HERDA_APROV" : [ ],
    "LOG_HERDA_SEGUR" : [ ],
    "LOG_USA_VISUALIZ" : [ ],
    "NR_MARCA_DAGUA" : [ ],
    "DS_PALAVRA_CHAVE" : [ ],
    "CD_IDIOMA" : [ ],
    "DT_ATUALIZACAO" : [ ],
    "HRA_ATUALIZ" : [ ],
    "COD_LISTA" : [ ],
    "COD_REG_LISTA" : [ ],
    "COD_MIME_TYPE" : [ ],
    "NR_DIAS_NOT_EXP" : [ ],
    "LOG_DATASET_ATIVO" : [ ],
    "NR_DOCUMENTO_PAI" : [ ],
    "IDI_STATUS_CONV_PDF" : [ ],
    "COD_TIP_VISUALIZ" : [ ],
    "IDI_TIP_PERMIS" : [ ],
    "NM_ARQUIVO_FISICO" : [ ],
    "NUM_PRIORID" : [ ],
    "COD_MATR_PARTIC" : [ ],
    "LOG_DOCTO_PARTIC" : [ ],
    "LOG_PROCES_BATCH" : [ ],
    "CD_PUBLICADOR" : [ ],
    "QUOTA" : [ ],
    "NM_ARQUIVOS_RELACIONADOS" : [ ],
    "IDI_TIP_RESTRIC" : [ ],
    "FDN_SITECODE" : [ ],
    "NUM_TAM_ARQ_FISIC" : [ ],
    "DOCTO_SOCIAL" : [ ],
    "IDI_STATUS_ARMAZ_LP" : [ ],
    "CD_ASSUNTO" : [ ],
    "LOG_TRADUZIR" : [ ],
    "LOG_ATUALIZ_PROPRIED_ISO" : [ ],
    "USED_QUOTA" : [ ],
    "LOG_NOTIFICA_USUAR" : [ ],
    "DT_INI_VALIDADE" : [ ],
    "DS_VERSAO" : [ ],
    "CD_VISAO" : [ ],
    "COD_VOL_FISIC" : [ ],
    "LOG_PUBLIC" : [ ],
    "METADATAFORM_VERSION_STATUS" : [ ],
    "HASH_ANNOTATIONS" : [ ]
  },
  "inputAssignments" : { },
  "outputValues" : {
    "COD_EMPRESA" : {
      "result" : true,
      "type" : "bigint"
    },
    "NR_DOCUMENTO" : {
      "result" : true,
      "type" : "int"
    },
    "NR_VERSAO" : {
      "result" : true,
      "type" : "int"
    },
    "COD_UUID" : {
      "result" : true,
      "type" : "varchar"
    },
    "NR_ACESSOS" : {
      "result" : true,
      "type" : "int"
    },
    "VERSAO_ATIVA" : {
      "result" : true,
      "type" : "bit"
    },
    "DS_COMENTARIO_ADICIONAL" : {
      "result" : true,
      "type" : "longtext"
    },
    "PERMITIR_MULTI_FICHAS" : {
      "result" : true,
      "type" : "bit"
    },
    "APROV_E_OU" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_APROVADO" : {
      "result" : true,
      "type" : "bit"
    },
    "DT_APROVACAO" : {
      "result" : true,
      "type" : "date"
    },
    "CD_ATUALIZACAO" : {
      "result" : true,
      "type" : "int"
    },
    "DES_PRINC_FICHA" : {
      "result" : true,
      "type" : "varchar"
    },
    "LOG_PASTA_CHECKOUT" : {
      "result" : true,
      "type" : "bit"
    },
    "CD_MATRICULA" : {
      "result" : true,
      "type" : "varchar"
    },
    "IDI_TIP_ARMAZ_LP" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_CRC" : {
      "result" : true,
      "type" : "bigint"
    },
    "DT_CRIACAO" : {
      "result" : true,
      "type" : "date"
    },
    "NM_DATASET" : {
      "result" : true,
      "type" : "varchar"
    },
    "LOG_DELETE" : {
      "result" : true,
      "type" : "bit"
    },
    "DS_PRINCIPAL_DOCUMENTO" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_DOCTO_PROPRIED" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_VERS_PROPRIED" : {
      "result" : true,
      "type" : "int"
    },
    "TP_DOCUMENTO" : {
      "result" : true,
      "type" : "varchar"
    },
    "CD_TIPO_DOC" : {
      "result" : true,
      "type" : "varchar"
    },
    "LOG_PERMITE_DOWNLOAD" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_RASCUNHO" : {
      "result" : true,
      "type" : "bit"
    },
    "DT_EXPIRACAO" : {
      "result" : true,
      "type" : "date"
    },
    "LOG_DOCTO_EXPIRA" : {
      "result" : true,
      "type" : "bit"
    },
    "CD_DOCUMENTO_EXT" : {
      "result" : true,
      "type" : "varchar"
    },
    "NR_ICONE" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_NAO_ALTERA" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_INDEXAD" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_HERDA_APROV" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_HERDA_SEGUR" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_USA_VISUALIZ" : {
      "result" : true,
      "type" : "bit"
    },
    "NR_MARCA_DAGUA" : {
      "result" : true,
      "type" : "int"
    },
    "DS_PALAVRA_CHAVE" : {
      "result" : true,
      "type" : "longtext"
    },
    "CD_IDIOMA" : {
      "result" : true,
      "type" : "varchar"
    },
    "DT_ATUALIZACAO" : {
      "result" : true,
      "type" : "date"
    },
    "HRA_ATUALIZ" : {
      "result" : true,
      "type" : "varchar"
    },
    "COD_LISTA" : {
      "result" : true,
      "type" : "int"
    },
    "COD_REG_LISTA" : {
      "result" : true,
      "type" : "int"
    },
    "COD_MIME_TYPE" : {
      "result" : true,
      "type" : "varchar"
    },
    "NR_DIAS_NOT_EXP" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_DATASET_ATIVO" : {
      "result" : true,
      "type" : "bit"
    },
    "NR_DOCUMENTO_PAI" : {
      "result" : true,
      "type" : "int"
    },
    "IDI_STATUS_CONV_PDF" : {
      "result" : true,
      "type" : "int"
    },
    "COD_TIP_VISUALIZ" : {
      "result" : true,
      "type" : "varchar"
    },
    "IDI_TIP_PERMIS" : {
      "result" : true,
      "type" : "int"
    },
    "NM_ARQUIVO_FISICO" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_PRIORID" : {
      "result" : true,
      "type" : "int"
    },
    "COD_MATR_PARTIC" : {
      "result" : true,
      "type" : "varchar"
    },
    "LOG_DOCTO_PARTIC" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_PROCES_BATCH" : {
      "result" : true,
      "type" : "bit"
    },
    "CD_PUBLICADOR" : {
      "result" : true,
      "type" : "varchar"
    },
    "QUOTA" : {
      "result" : true,
      "type" : "int"
    },
    "NM_ARQUIVOS_RELACIONADOS" : {
      "result" : true,
      "type" : "longtext"
    },
    "IDI_TIP_RESTRIC" : {
      "result" : true,
      "type" : "int"
    },
    "FDN_SITECODE" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_TAM_ARQ_FISIC" : {
      "result" : true,
      "type" : "float"
    },
    "DOCTO_SOCIAL" : {
      "result" : true,
      "type" : "varchar"
    },
    "IDI_STATUS_ARMAZ_LP" : {
      "result" : true,
      "type" : "int"
    },
    "CD_ASSUNTO" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_TRADUZIR" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_ATUALIZ_PROPRIED_ISO" : {
      "result" : true,
      "type" : "bit"
    },
    "USED_QUOTA" : {
      "result" : true,
      "type" : "float"
    },
    "LOG_NOTIFICA_USUAR" : {
      "result" : true,
      "type" : "bit"
    },
    "DT_INI_VALIDADE" : {
      "result" : true,
      "type" : "date"
    },
    "DS_VERSAO" : {
      "result" : true,
      "type" : "varchar"
    },
    "CD_VISAO" : {
      "result" : true,
      "type" : "varchar"
    },
    "COD_VOL_FISIC" : {
      "result" : true,
      "type" : "varchar"
    },
    "LOG_PUBLIC" : {
      "result" : true,
      "type" : "bit"
    },
    "METADATAFORM_VERSION_STATUS" : {
      "result" : true,
      "type" : "varchar"
    },
    "HASH_ANNOTATIONS" : {
      "result" : true,
      "type" : "varchar"
    }
  },
  "outputAssignments" : { },
  "extraParams" : { }
}
;
}