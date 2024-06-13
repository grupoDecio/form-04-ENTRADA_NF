function defineStructure() {

}
function onSync(lastSyncDate) {
	 
}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("Id");
  ds.addColumn("Nome");

	ds.addRow(new Array("1","gabriel.palm"));
	ds.addRow(new Array("2","jefferson.machado"));
	return ds;

}
function onMobileSync(user) {

}
