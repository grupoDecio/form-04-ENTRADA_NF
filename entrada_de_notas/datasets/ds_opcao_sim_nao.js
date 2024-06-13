function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("1","Selecione uma opção"));
	ds.addRow(new Array("2","Não"));
	ds.addRow(new Array("3","Sim"));

	
	return ds;
}
function onMobileSync(user) {

}