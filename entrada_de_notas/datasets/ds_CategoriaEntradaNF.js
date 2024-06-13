function defineStructure() {

}
function onSync(lastSyncDate) {
	 
}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
    
	ds.addRow(new Array("1","Estação de serviços"));
	ds.addRow(new Array("3","Rododecio"));
	return ds;

}
function onMobileSync(user) {

}