function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("tamirys.leles","Tamirys Leles"));
	ds.addRow(new Array("ti002","Karina Fernandes"));
   

	return ds;
}
function onMobileSync(user) {

}