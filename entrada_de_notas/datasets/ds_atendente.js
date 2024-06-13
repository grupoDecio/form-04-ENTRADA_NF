function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	
	ds.addRow(new Array("1","Vander Junio Queiroz"));
	ds.addRow(new Array("2","Welverth Cesar Silva Campos"));
	ds.addRow(new Array("3","Karina Marques Fernandes"));
	ds.addRow(new Array("4","Andre Gustavo Coimbra"));
	
	return ds;
}
function onMobileSync(user) {

}