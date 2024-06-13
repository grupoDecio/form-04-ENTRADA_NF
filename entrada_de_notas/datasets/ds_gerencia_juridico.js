function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("ailime.ferreira","Ailime Ferreira"));
	ds.addRow(new Array("ti002","Karina Fernandes"));
   

	return ds;
}
function onMobileSync(user) {

}