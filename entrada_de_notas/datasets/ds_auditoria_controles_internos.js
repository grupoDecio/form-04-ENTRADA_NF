function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("ademilson.moura","Ademilson Moura"));
	ds.addRow(new Array("germano.arantes","Germano Arantes"));
	ds.addRow(new Array("ti002","Karina Fernandes"));
	ds.addRow(new Array("roberta.oliveira","Roberta Oliveira"));
   

	return ds;
}
function onMobileSync(user) {

}