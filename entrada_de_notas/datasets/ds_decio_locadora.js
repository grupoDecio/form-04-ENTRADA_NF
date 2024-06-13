function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("carolina.messias","Carolina Messias","Sem Tipo"));
	ds.addRow(new Array("deciolocadora","João","Sem Tipo"));
	ds.addRow(new Array("ti002","Karina Fernandes","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}