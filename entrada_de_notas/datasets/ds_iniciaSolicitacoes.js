/*
 * 
 Ex.:
 
	var card = JSON.stringify({
			pais:'Brasil',
			nome:'Guilherme'
	})
	
	
	var c1 = DatasetFactory.createConstraint('cardData', card, '', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('comments', '', '', ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('attachments', '', '', ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('colleagueIds', "['fulano.teste']", '', ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint('managerMode', 'false', '', ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint('appointment', '', '', ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint('choosedState', '0', '', ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint('userId', 'fulano.teste', '', ConstraintType.MUST);
	var c9 = DatasetFactory.createConstraint('completeTask', 'true', '', ConstraintType.MUST);
	var c10 = DatasetFactory.createConstraint('password', 'senhaFulano', '', ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint('companyId', '99', '', ConstraintType.MUST);
	var c12 = DatasetFactory.createConstraint('processId', 'NovoPontoComercial', '', ConstraintType.MUST);
	var c13 = DatasetFactory.createConstraint('username', 'fulano.teste', '', ConstraintType.MUST);
	
	
	
	var ds = DatasetFactory.getDataset('ECMWorkflowEngineService-startProcess', null, new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13), null);
	console.log(ds)
 
 * 
 **/


function createDataset(fields, constraints, sortFields) {
	try {
		log.info("====================ECMWorkflowEngineService-startProcess===========================")
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;

	verifyConstraints(serviceData.inputValues, constraints);
	log.info("================================ServiceManager.getService(serviceData.fluigService)")
	var serviceHelper = ServiceManager.getService(serviceData.fluigService);

	log.info("===============================serviceHelper.instantiate(serviceData.locatorClass)")
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	log.info("==============================serviceLocator.getWorkflowEngineServicePort()")
	var service = serviceLocator.getWorkflowEngineServicePort();
	log.info("====================================service.startProcess")
	
	var response = service.startProcess(
			getParamValue(params.username, assigns.username), 
			getParamValue(params.password, assigns.password),
			getParamValue(params.companyId, assigns.companyId), 
			getParamValue(params.processId, assigns.processId), 
			getParamValue(params.choosedState, assigns.choosedState), 
			fillStringArray(serviceHelper, params.colleagueIds, assigns.colleagueIds), 
			getParamValue(params.comments, assigns.comments), 
			getParamValue(params.userId, assigns.userId), 
			getParamValue(params.completeTask, assigns.completeTask), 
			fillProcessAttachmentDtoArray(serviceHelper, params.attachments, assigns.attachments), 
			fillMap(serviceHelper, params.cardData, assigns.cardData), 
			fillProcessTaskAppointmentDtoArray(serviceHelper, params.appointment, assigns.appointment), 
			getParamValue(params.managerMode, assigns.managerMode));
	

	return response;
}

function defineStructure() {
		addColumn('response');
}

function onSync(lastSyncDate) {
	var serviceData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				synchronizedDataset.addRow(values[i]);
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();
	var resultItens = result.getItem();
	var itemRow = [];
	for (var i = 0; i < resultItens.size(); i++) {
		if (resultItens.get(i).getItem().size() == 2) {
			dataset.addColumn(resultItens.get(i).getItem().get(0));
			itemRow.push(resultItens.get(i).getItem().get(1));
		}
	}
	if (itemRow.length > 0) {
		dataset.addRow(itemRow);
	}
	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('cardData');
	dataset.addColumn('comments');
	dataset.addColumn('attachments');
	dataset.addColumn('colleagueIds');
	dataset.addColumn('managerMode');
	dataset.addColumn('appointment');
	dataset.addColumn('choosedState');
	dataset.addColumn('userId');
	dataset.addColumn('completeTask');
	dataset.addColumn('password');
	dataset.addColumn('companyId');
	dataset.addColumn('processId');
	dataset.addColumn('username');

	var cardData = isPrimitive(params.cardData) ? params.cardData : JSONUtil.toJSON(params.cardData);
	var comments = isPrimitive(params.comments) ? params.comments : JSONUtil.toJSON(params.comments);
	var attachments = isPrimitive(params.attachments) ? params.attachments : JSONUtil.toJSON(params.attachments);
	var colleagueIds = isPrimitive(params.colleagueIds) ? params.colleagueIds : JSONUtil.toJSON(params.colleagueIds);
	var managerMode = isPrimitive(params.managerMode) ? params.managerMode : JSONUtil.toJSON(params.managerMode);
	var appointment = isPrimitive(params.appointment) ? params.appointment : JSONUtil.toJSON(params.appointment);
	var choosedState = isPrimitive(params.choosedState) ? params.choosedState : JSONUtil.toJSON(params.choosedState);
	var userId = isPrimitive(params.userId) ? params.userId : JSONUtil.toJSON(params.userId);
	var completeTask = isPrimitive(params.completeTask) ? params.completeTask : JSONUtil.toJSON(params.completeTask);
	var password = isPrimitive(params.password) ? params.password : JSONUtil.toJSON(params.password);
	var companyId = isPrimitive(params.companyId) ? params.companyId : JSONUtil.toJSON(params.companyId);
	var processId = isPrimitive(params.processId) ? params.processId : JSONUtil.toJSON(params.processId);
	var username = isPrimitive(params.username) ? params.username : JSONUtil.toJSON(params.username);

	dataset.addRow([error.message, cardData, comments, attachments, colleagueIds, managerMode, appointment, choosedState, '', completeTask, '', companyId, processId, username]);

	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function fillStringArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(getParamValue(params[i], assigns[i]));
	}

	return result;
}

function fillProcessAttachmentDto(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDto");

	var attachmentSequence = getParamValue(params.attachmentSequence, assigns.attachmentSequence);
	if (hasValue(attachmentSequence)) { result.setAttachmentSequence(attachmentSequence); }
	var colleagueId = getParamValue(params.colleagueId, assigns.colleagueId);
	if (hasValue(colleagueId)) { result.setColleagueId(colleagueId); }
	var colleagueName = getParamValue(params.colleagueName, assigns.colleagueName);
	if (hasValue(colleagueName)) { result.setColleagueName(colleagueName); }
	var companyId = getParamValue(params.companyId, assigns.companyId);
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var crc = getParamValue(params.crc, assigns.crc);
	if (hasValue(crc)) { result.setCrc(crc); }
	var createDate = serviceHelper.getDate(getParamValue(params.createDate, assigns.createDate));
	if (hasValue(createDate)) { result.setCreateDate(createDate); }
	var createDateTimestamp = getParamValue(params.createDateTimestamp, assigns.createDateTimestamp);
	if (hasValue(createDateTimestamp)) { result.setCreateDateTimestamp(createDateTimestamp); }
	var deleted = getParamValue(params.deleted, assigns.deleted);
	if (hasValue(deleted)) { result.setDeleted(deleted); }
	var description = getParamValue(params.description, assigns.description);
	if (hasValue(description)) { result.setDescription(description); }
	var documentId = getParamValue(params.documentId, assigns.documentId);
	if (hasValue(documentId)) { result.setDocumentId(documentId); }
	var documentType = getParamValue(params.documentType, assigns.documentType);
	if (hasValue(documentType)) { result.setDocumentType(documentType); }
	var fileName = getParamValue(params.fileName, assigns.fileName);
	if (hasValue(fileName)) { result.setFileName(fileName); }
	var newAttach = getParamValue(params.newAttach, assigns.newAttach);
	if (hasValue(newAttach)) { result.setNewAttach(newAttach); }
	var originalMovementSequence = getParamValue(params.originalMovementSequence, assigns.originalMovementSequence);
	if (hasValue(originalMovementSequence)) { result.setOriginalMovementSequence(originalMovementSequence); }
	var permission = getParamValue(params.permission, assigns.permission);
	if (hasValue(permission)) { result.setPermission(permission); }
	var processInstanceId = getParamValue(params.processInstanceId, assigns.processInstanceId);
	if (hasValue(processInstanceId)) { result.setProcessInstanceId(processInstanceId); }
	var size = getParamValue(params.size, assigns.size);
	if (hasValue(size)) { result.setSize(size); }
	var version = getParamValue(params.version, assigns.version);
	if (hasValue(version)) { result.setVersion(version); }
	
	return result;
}

function fillProcessAttachmentDtoArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillProcessAttachmentDto(serviceHelper, params[i], assigns[i]));
	}

	return result;
}

function fillMap(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArrayArray");
	var paramKeys = Object.keys(params);

	for (var i = 0; i < paramKeys.length; i++) {

		var item = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArray");
		item.getItem().add(paramKeys[i]);
		item.getItem().add(getParamValue(params[paramKeys[i]], assigns[paramKeys[i]]));
		result.getItem().add(item);
	}

	return result;
}

function fillProcessTaskAppointmentDto(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDto");

	var appointmentDate = serviceHelper.getDate(getParamValue(params.appointmentDate, assigns.appointmentDate));
	if (hasValue(appointmentDate)) { result.setAppointmentDate(appointmentDate); }
	var appointmentSeconds = getParamValue(params.appointmentSeconds, assigns.appointmentSeconds);
	if (hasValue(appointmentSeconds)) { result.setAppointmentSeconds(appointmentSeconds); }
	var appointmentSequence = getParamValue(params.appointmentSequence, assigns.appointmentSequence);
	if (hasValue(appointmentSequence)) { result.setAppointmentSequence(appointmentSequence); }
	var colleagueId = getParamValue(params.colleagueId, assigns.colleagueId);
	if (hasValue(colleagueId)) { result.setColleagueId(colleagueId); }
	var colleagueName = getParamValue(params.colleagueName, assigns.colleagueName);
	if (hasValue(colleagueName)) { result.setColleagueName(colleagueName); }
	var companyId = getParamValue(params.companyId, assigns.companyId);
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var isNewRecord = getParamValue(params.isNewRecord, assigns.isNewRecord);
	if (hasValue(isNewRecord)) { result.setIsNewRecord(isNewRecord); }
	var movementSequence = getParamValue(params.movementSequence, assigns.movementSequence);
	if (hasValue(movementSequence)) { result.setMovementSequence(movementSequence); }
	var processInstanceId = getParamValue(params.processInstanceId, assigns.processInstanceId);
	if (hasValue(processInstanceId)) { result.setProcessInstanceId(processInstanceId); }
	var transferenceSequence = getParamValue(params.transferenceSequence, assigns.transferenceSequence);
	if (hasValue(transferenceSequence)) { result.setTransferenceSequence(transferenceSequence); }
	
	return result;
}

function fillProcessTaskAppointmentDtoArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillProcessTaskAppointmentDto(serviceHelper, params[i], assigns[i]));
	}

	return result;
}

function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ObjectFactory");

	return objectFactory;
}


function data() {
	var cfg 		=	getDadosSoap();
	var user 		= 	cfg.login;	
	var password 	=	cfg.senha;
	return {
		  "fluigService" : "ECMWorkflowEngineService",
		  "operation" : "startProcess",
		  "soapService" : "ECMWorkflowEngineServiceService",
		  "portType" : "WorkflowEngineService",
		  "locatorClass" : "com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService",
		  "portTypeMethod" : "getWorkflowEngineServicePort",
		  "parameters" : [ ],
		  "inputValues" : {
		    "cardData" : {},
		    "comments" : "",
		    "attachments" : [ ],
		    "colleagueIds" : [ ],
		    "managerMode" : false,
		    "appointment" : [ ],
		    "choosedState" : 0,
		    "userId" : "",
		    "completeTask" : false,
		    "password" : password,
		    "companyId" : "",
		    "processId" : "",
		    "username" : user
		  },
		  "inputAssignments" : {
		    "cardData" : { },
		    "comments" : "VALUE",
		    "attachments" : [ ],
		    "colleagueIds" : [ ],
		    "managerMode" : "VALUE",
		    "appointment" : [ ],
		    "choosedState" : "VALUE",
		    "userId" : "VALUE",
		    "completeTask" : "VALUE",
		    "password" : "",
		    "companyId" : "VALUE",
		    "processId" : "VALUE",
		    "username" : ""
		  },
		  "outputValues" : { },
		  "outputAssignments" : { },
		  "extraParams" : {
		    "enabled" : false
		  }
		}
	function getDadosSoap(){
		var retorno = DatasetFactory.getDataset("ds_Fluig", null, null, null);
		var data 	= new Object();
		data.login 	= retorno.getValue(0, "LG");
		data.senha  = retorno.getValue(0, "SH");	
		return data;
	}
}


