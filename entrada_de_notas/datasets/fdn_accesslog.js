function createDataset(fields, constraints, sortFields) {
	try {
	    var aRetornoLog = processResult(callService(fields, constraints, sortFields));
	    log.info("Inicio Log");
	    log.dir(aRetornoLog);
	    log.info("final log");
	    return aRetornoLog;
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
			    /// limite de registros por pesquisa
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
  "operation" : "fdn_accesslog",
  "tableType" : "TABLE",
  "parameters" : [ ],
  "inputValues" : {
    "ACCESSLOG_ID" : [ ],
    "ACCESS_DATE" : [ ],
    "CLIENT_ADDRESS" : [ ],
    "LOG_TYPE" : [ ],
    "LOGIN" : [ ],
    "SERVER_ADDRESS" : [ ],
    "TENANT_ID" : [ ],
    "CATEGORY" : [ ],
    "OS" : [ ]
  },
  "inputAssignments" : { },
  "outputValues" : {
    "ACCESSLOG_ID" : {
      "result" : true,
      "type" : "bigint"
    },
    "ACCESS_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "CLIENT_ADDRESS" : {
      "result" : true,
      "type" : "varchar"
    },
    "LOG_TYPE" : {
      "result" : true,
      "type" : "int"
    },
    "LOGIN" : {
      "result" : true,
      "type" : "varchar"
    },
    "SERVER_ADDRESS" : {
      "result" : true,
      "type" : "varchar"
    },
    "TENANT_ID" : {
      "result" : true,
      "type" : "bigint"
    },
    "CATEGORY" : {
      "result" : true,
      "type" : "varchar"
    },
    "OS" : {
      "result" : true,
      "type" : "varchar"
    }
  },
  "outputAssignments" : { },
  "extraParams" : {
    "limitResults" : false
  }
};

}
