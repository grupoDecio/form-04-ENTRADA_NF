function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	
	ds.addRow(new Array("1","Leonardo Costa"));
	
	return ds;
}
function onMobileSync(user) {

}