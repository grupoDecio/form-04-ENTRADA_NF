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
  "operation" : "tar_proces",
  "tableType" : "TABLE",
  "parameters" : [ ],
  "inputValues" : {
    "CD_MATRICULA" : [ ],
    "COD_EMPRESA" : [ ],
    "NUM_SEQ_MOVTO" : [ ],
    "NUM_PROCES" : [ {
      "fieldName" : "NUM_PROCES",
      "initialValue" : "13730",
      "finalValue" : "13730",
"constraintType" :  ConstraintType.MUST,
      "likeSearch" : false,
      "fieldType" : "NUMBER"
    } ],
    "NUM_SEQ_TRANSF" : [ ],
    "LOG_ATIV" : [ ],
    "ASSIGN_START_DATE" : [ ],
    "ASSIGN_END_DATE" : [ ],
    "DAT_MSG_ATRASO_RESPONS" : [ ],
    "NUM_HORA_MSG_ATRASO_RESPONS" : [ ],
    "COD_MATR_ESCOLHID" : [ ],
    "NUM_SEQ_ESCOLHID" : [ ],
    "CLOSURE_STATUS" : [ ],
    "CD_MATRICULA_CONCLUS" : [ ],
    "IDI_TIP_CONCLUS" : [ ],
    "DEADLINE" : [ ],
    "deadlineDate" : [ ],
    "deadlineHour" : [ ],
    "END_DATE" : [ ],
    "initialTermDate" : [ ],
    "initialTermHour" : [ ],
    "DAT_MSG_ATRASO_GESTOR" : [ ],
    "NUM_HORA_MSG_ATRASO_GESTOR" : [ ],
    "DAT_MSG_EXPIRAC_RESPONS" : [ ],
    "NUM_HORA_MSG_EXPIRAC_RESPONS" : [ ],
    "DAT_MSG_EXPIRAC_GESTOR" : [ ],
    "NUM_HORA_MSG_EXPIRAC_GESTOR" : [ ],
    "DAT_MSG_EXPIRAC_REQUISIT" : [ ],
    "NUM_HORA_MSG_EXPIRAC_REQUISIT" : [ ],
    "DAT_MSG_ATRASO_REQUISIT" : [ ],
    "NUM_HORA_MSG_ATRASO_REQUISIT" : [ ],
    "START_DATE" : [ ],
    "IDI_STATUS" : [ ],
    "taskCompletionDate" : [ ],
    "taskCompletionHour" : [ ],
    "DSL_OBS_TAR" : [ ],
    "LOG_ASSINADO" : [ ],
    "DS_ARQUIVO_HASH" : [ ],
    "DS_NOME_ARQUIVO_ASS" : [ ],
    "WARNING_DATE" : [ ],
    "TOTAL_RUNTIME" : [ ]
  },
  "inputAssignments" : { },
  "outputValues" : {
    "CD_MATRICULA" : {
      "result" : true,
      "type" : "varchar"
    },
    "COD_EMPRESA" : {
      "result" : true,
      "type" : "bigint"
    },
    "NUM_SEQ_MOVTO" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_PROCES" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_SEQ_TRANSF" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_ATIV" : {
      "result" : true,
      "type" : "bit"
    },
    "ASSIGN_START_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "ASSIGN_END_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "DAT_MSG_ATRASO_RESPONS" : {
      "result" : true,
      "type" : "date"
    },
    "NUM_HORA_MSG_ATRASO_RESPONS" : {
      "result" : true,
      "type" : "int"
    },
    "COD_MATR_ESCOLHID" : {
      "result" : true,
      "type" : "longtext"
    },
    "NUM_SEQ_ESCOLHID" : {
      "result" : true,
      "type" : "int"
    },
    "CLOSURE_STATUS" : {
      "result" : true,
      "type" : "int"
    },
    "CD_MATRICULA_CONCLUS" : {
      "result" : true,
      "type" : "varchar"
    },
    "IDI_TIP_CONCLUS" : {
      "result" : true,
      "type" : "int"
    },
    "DEADLINE" : {
      "result" : true,
      "type" : "datetime"
    },
    "deadlineDate" : {
      "result" : true,
      "type" : "datetime"
    },
    "deadlineHour" : {
      "result" : true,
      "type" : "int"
    },
    "END_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "initialTermDate" : {
      "result" : true,
      "type" : "datetime"
    },
    "initialTermHour" : {
      "result" : true,
      "type" : "int"
    },
    "DAT_MSG_ATRASO_GESTOR" : {
      "result" : true,
      "type" : "date"
    },
    "NUM_HORA_MSG_ATRASO_GESTOR" : {
      "result" : true,
      "type" : "int"
    },
    "DAT_MSG_EXPIRAC_RESPONS" : {
      "result" : true,
      "type" : "date"
    },
    "NUM_HORA_MSG_EXPIRAC_RESPONS" : {
      "result" : true,
      "type" : "int"
    },
    "DAT_MSG_EXPIRAC_GESTOR" : {
      "result" : true,
      "type" : "date"
    },
    "NUM_HORA_MSG_EXPIRAC_GESTOR" : {
      "result" : true,
      "type" : "int"
    },
    "DAT_MSG_EXPIRAC_REQUISIT" : {
      "result" : true,
      "type" : "date"
    },
    "NUM_HORA_MSG_EXPIRAC_REQUISIT" : {
      "result" : true,
      "type" : "int"
    },
    "DAT_MSG_ATRASO_REQUISIT" : {
      "result" : true,
      "type" : "date"
    },
    "NUM_HORA_MSG_ATRASO_REQUISIT" : {
      "result" : true,
      "type" : "int"
    },
    "START_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "IDI_STATUS" : {
      "result" : true,
      "type" : "int"
    },
    "taskCompletionDate" : {
      "result" : true,
      "type" : "datetime"
    },
    "taskCompletionHour" : {
      "result" : true,
      "type" : "int"
    },
    "DSL_OBS_TAR" : {
      "result" : true,
      "type" : "longtext"
    },
    "LOG_ASSINADO" : {
      "result" : true,
      "type" : "bit"
    },
    "DS_ARQUIVO_HASH" : {
      "result" : true,
      "type" : "varchar"
    },
    "DS_NOME_ARQUIVO_ASS" : {
      "result" : true,
      "type" : "varchar"
    },
    "WARNING_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "TOTAL_RUNTIME" : {
      "result" : true,
      "type" : "bigint"
    }
  },
  "outputAssignments" : { },
  "extraParams" : { }
}
;
}