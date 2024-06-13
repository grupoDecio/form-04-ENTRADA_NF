function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");


	ds.addRow(new Array("alexandre.junior","Alexandre Junior"));
	ds.addRow(new Array("rodrigo.martins","Rodrigo Martins"));
	
	return ds;
}
function onMobileSync(user) {

}