function createDataset(fields, constraints, sortFields){ log.info("Digte Public Form - @@@ Inicio Dataset ds_dpf_listaDeProcessos.js"); var datasetRetorno = DatasetBuilder.newDataset(); datasetRetorno.addColumn("idProcesso"); datasetRetorno.addColumn("nmProcesso"); datasetRetorno.addColumn("versaoProcesso"); datasetRetorno.addColumn("idFormulario"); datasetRetorno.addColumn("datasetFormulario"); var idProcesso = ""; var nmProcesso = ""; if (constraints != null) { for (var i = 0; i < constraints.length; i++) { if (constraints[i].fieldName == "idProcesso" && constraints[i].initialValue != "") { idProcesso = constraints[i].initialValue; } else if (constraints[i].fieldName == "nmProcesso" && constraints[i].initialValue != "") { nmProcesso = constraints[i].initialValue; } } } var pdConstraints = []; var companyId = getValue("WKCompany"); var c = DatasetFactory.createConstraint("processDefinitionPK.companyId", companyId, companyId, ConstraintType.MUST); pdConstraints.push(c); if (idProcesso != "") { var c = DatasetFactory.createConstraint("processDefinitionPK.processId", idProcesso, idProcesso, ConstraintType.MUST); pdConstraints.push(c); } if (nmProcesso != "") { var c = DatasetFactory.createConstraint("processDescription", "%" + nmProcesso + "%", "%" + nmProcesso + "%", ConstraintType.MUST); c.setLikeSearch(true); pdConstraints.push(c); } var datasetWorkflowProcess = DatasetFactory.getDataset("processDefinition", null, pdConstraints, null ); var c1 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST); var c2 = DatasetFactory.createConstraint("processDefinitionVersionPK.companyId", companyId, companyId, ConstraintType.MUST); var constraints = new Array(c1,c2); var datasetWorkflowProcessVersion = DatasetFactory.getDataset("processDefinitionVersion", null, constraints, null ); /* BUSCA FORMULÁRIO DO PROCESSO */ for (var i = 0; i < datasetWorkflowProcess.rowsCount; i++) { var idProcesso = datasetWorkflowProcess.getValue(i,"processDefinitionPK.processId"); var nmProcesso = datasetWorkflowProcess.getValue(i,"processDescription"); var idFormulario = ""; var version = ""; for (var j = 0; j < datasetWorkflowProcessVersion.rowsCount; j++) { if (idProcesso == datasetWorkflowProcessVersion.getValue(j,"processDefinitionVersionPK.processId")){ idFormulario = datasetWorkflowProcessVersion.getValue(j,"formId"); version = datasetWorkflowProcessVersion.getValue(j,"processDefinitionVersionPK.version"); } } var datasetName = ""; /* BUSCA DATASET DO FORMULÁRIO */ if (idFormulario != "") { var c1 = DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST); var c2 = DatasetFactory.createConstraint("documentPK.documentId", idFormulario, idFormulario, ConstraintType.MUST); var c3 = DatasetFactory.createConstraint("documentPK.companyId", companyId, companyId, ConstraintType.MUST); var constraints = new Array(c1, c2, c3); var dsForm = DatasetFactory.getDataset("document", null, constraints, null ); if (dsForm != undefined && dsForm != null && dsForm.rowsCount > 0) { datasetName = dsForm.getValue(0,"datasetName"); } } datasetRetorno.addRow(new Array(idProcesso,nmProcesso,version,idFormulario,datasetName)); } log.info("Digte Public Form - @@@ Fim Dataset ds_dpf_listaDeProcessos.js"); return datasetRetorno; } 