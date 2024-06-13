function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("alessandra.costa","Alessandra Costa"));
    ds.addRow(new Array("luciane.andrade","Luciane Andrade"));
    ds.addRow(new Array("ti002","Karina Fernandes"));

	return ds;
}
function onMobileSync(user) {

}