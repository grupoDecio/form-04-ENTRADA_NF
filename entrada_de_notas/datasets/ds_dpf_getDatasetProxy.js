function defineStructure() { } function onSync(lastSyncDate) { } function createDataset(fields, constraints, sortFields) { log.info("Digte Public Form - @@@ Inicio ds_dpf_getDatasetProxy.js"); var c1 = null; var datasetID = ""; var dpfDatasetId = ""; var newConstraints = []; var lAcesso = false; var userLocale = 'pt_BR'; var cCampoErro = ""; if (constraints != null && constraints.length > 0) { for (var i = 0; i < constraints.length; i++) { if (constraints[i].fieldName == "userLocale" && constraints[i].initialValue != "") { userLocale = constraints[i].initialValue; } else if (constraints[i].fieldName == "dpfDatasetId") { dpfDatasetId = constraints[i].initialValue; if (dpfDatasetId.indexOf("ds_dpf_") == -1){ /* ignorar para datasets do próprio public form */ c1 = DatasetFactory.createConstraint('dpfDatasetId', dpfDatasetId ,dpfDatasetId, ConstraintType.MUST); var dsDpfDataset = DatasetFactory.getDataset("dpf_dataset", null, [c1], null); if (dsDpfDataset != undefined && dsDpfDataset != null && dsDpfDataset.rowsCount > 0) { if (dsDpfDataset.getValue(0, "ativo") == "sim"){ datasetId = dsDpfDataset.getValue(0, "datasetId"); lAcesso = true; } } } else { datasetId = constraints[i].initialValue; lAcesso = true; } } else { newConstraints.push(constraints[i]); cCampoErro = constraints[i].fieldName; } } } if (lAcesso == true) { var dataset = DatasetFactory.getDataset(datasetId, null, newConstraints, sortFields); } else { log.info("Digte Public Form - @@@ Inicio ds_dpf_getDatasetProxy.j - ERRO: Dataset nao liberado ou nao configuragado Public Form Dataset: " + dpfDatasetId ); var dataset = DatasetBuilder.newDataset(); dataset.addColumn(cCampoErro); dataset.addRow([objLocale['dataset-sem-acesso-' + userLocale] + ' (dpfDatasetId: ' + dpfDatasetId + ')']); return dataset; } log.info("Digte Public Form - @@@ Fim ds_dpf_getDatasetProxy.js"); return dataset } function onMobileSync(user) { } var objLocale = { 'dataset-sem-acesso-pt_BR': '@@ Dataset não foi configurado ou sem acesso no public form.', 'dataset-sem-acesso-en_US': '@@ Dataset no fue configurado o sim acceso el public form', 'dataset-sem-acesso-es': '@@ Dataset is not setting or it is not allowed to access' }