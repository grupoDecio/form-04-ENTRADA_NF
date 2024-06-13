function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

	dataset.addColumn("empresa");
	dataset.addColumn("filial");
	dataset.addColumn("nome");

	dataset.addRow(['01', '01', 'Empresa 1']);
	dataset.addRow(['01', '02', 'Empresa 2']);
	
	return dataset;

}
function onMobileSync(user) {

}