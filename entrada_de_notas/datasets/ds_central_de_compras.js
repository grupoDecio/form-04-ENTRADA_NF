function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Adriana Aparecida Silva","Sem Tipo"));
	ds.addRow(new Array("2","Richard Silva","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}