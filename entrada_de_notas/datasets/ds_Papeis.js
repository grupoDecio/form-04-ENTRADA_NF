function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
    log.info("#### Dataset Usuarios de um Papel ####");

    var newDataset = DatasetBuilder.newDataset();

    var datasetRole = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
    var cTags = '';
	    
    // Carrega as colunas do Dataset de Papel
    for(var i = 0; i < datasetRole.columnsName.length; i++) {
        newDataset.addColumn(datasetRole.columnsName[i]);
    }

    for(var i = 0; i < datasetRole.rowsCount; i++) {
        var companyId   = datasetRole.getValue(i, "workflowColleagueRolePK.companyId");
        var colleagueId = datasetRole.getValue(i, "workflowColleagueRolePK.colleagueId");
        var roleId      = datasetRole.getValue(i, "workflowColleagueRolePK.roleId");
        cTags = '///';
	    

        var constraint = new Array();
        constraint.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST));

        var datasetUser = DatasetFactory.getDataset("colleague", null, constraint, null);

        if (i == 0) {
            // Carrega as colunas do Dataset de Usuários
            for(var j = 0; j < datasetUser.columnsName.length; j++) {
                newDataset.addColumn(datasetUser.columnsName[j]);
            }
        }

        // Carrega os dados no Dataset
        var dados = new Array(companyId, colleagueId, roleId);
        if (datasetUser.values.length > 0) {
            for(var k = 3; k < newDataset.columnsName.length; k++) {
                cTags = cTags + datasetUser.getValue(0, newDataset.columnsName[k])+';'
                dados.push(datasetUser.getValue(0, newDataset.columnsName[k]));
            }
        }
        log.info(cTags);
	    cTags = '';
        newDataset.addRow(dados);
    }

    return newDataset
}

function onMobileSync(user) {

}