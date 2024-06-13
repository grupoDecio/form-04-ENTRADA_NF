function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	
	ds.addRow(new Array("1","Suporte1 Fluig"));
	ds.addRow(new Array("2","Suporte2 Fluig"));
	ds.addRow(new Array("3","Suporte3 Fluig"));
	ds.addRow(new Array("4","Eduardo Santos"));
	
	return ds;
}
function onMobileSync(user) {

}