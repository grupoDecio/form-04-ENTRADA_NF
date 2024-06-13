function createDataset(fields, constraints, sortFields) {
	return montaDataset(fields, constraints, sortFields, false);
}

function montaDataset(fields, constraints, sortFields, sync) {
	let newDataset = DatasetBuilder.newDataset();

	try {

		newDataset.addColumn("colleagueId");
		newDataset.addColumn("companyId");
		newDataset.addColumn("groupId");
		newDataset.addColumn("colleagueName");
		newDataset.addColumn("mail");

		let constraintColleagueGroup = [];

		if (constraints != null) {
			for (let i = 0; i < constraints.length; i++) {
				let campo = String(constraints[i].fieldName).toUpperCase();
				let tipo = constraints[i].constraintType;
				let like = Boolean(constraints[i].likeSearch);
				let valorConstraintINI = constraints[i].initialValue;
				let valorConstraintFIM = constraints[i].finalValue ? constraints[i].finalValue : constraints[i].initialValue;

				if (campo == 'GROUPID') constraintColleagueGroup.push(DatasetFactory.createConstraint('colleagueGroupPK.groupId', valorConstraintINI, valorConstraintFIM, tipo));
				else if (campo == 'SQLLIMIT') constraintColleagueGroup.push(DatasetFactory.createConstraint('sqlLimit', valorConstraintINI, valorConstraintFIM, tipo));
			}
		}
		
		

		let datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, constraintColleagueGroup, null);

		if (datasetColleagueGroup.rowsCount > 0) {
			for (let index = 0; index < datasetColleagueGroup.rowsCount; index++) {
				let usuDetalhe = getDetalhesUsu(datasetColleagueGroup.getValue(index, 'colleagueGroupPK.colleagueId'));
				newDataset.addRow([
					datasetColleagueGroup.getValue(index, 'colleagueGroupPK.colleagueId'),
					datasetColleagueGroup.getValue(index, 'colleagueGroupPK.companyId'),
					datasetColleagueGroup.getValue(index, 'colleagueGroupPK.groupId'),
					usuDetalhe.get(0).get('colleagueName'),
					usuDetalhe.get(0).get('mail')
				]);
			}
		}
	} catch (error) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERROR");
		newDataset.addColumn("LINHA");
		newDataset.addRow([error.message, error.lineNumber]);
	}
	return newDataset;
}

function getDetalhesUsu(colleagueId) {
	let constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', colleagueId, colleagueId, ConstraintType.MUST);
	let colunasColleague = new Array('colleagueName', 'mail');
	let datasetColleague = DatasetFactory.getDataset('colleague', colunasColleague, new Array(constraintColleague1), null);
	if (datasetColleague.rowsCount > 0) return datasetColleague.getMap();
	else return colleagueId;
}