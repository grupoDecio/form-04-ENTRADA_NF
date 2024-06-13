function defineStructure() {

}
function onSync(lastSyncDate) {
	 
}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("Nome");
    
	ds.addRow(new Array("Normal"));
	ds.addRow(new Array("24h"));
	
	return ds;

}
function onMobileSync(user) {

}