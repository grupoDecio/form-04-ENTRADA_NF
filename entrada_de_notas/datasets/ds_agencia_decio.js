function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Cristiane Moraes Melo","Sem Tipo"));
	ds.addRow(new Array("2","Deborah Cristina Isidoro Barbosa","Sem Tipo"));
	ds.addRow(new Array("3","Erica Gomes Araujo","Sem Tipo"));
	ds.addRow(new Array("4","Isabela de Jesus Alves","Sem Tipo"));
	ds.addRow(new Array("5","Joao Paulo Nogueira Arantes","Sem Tipo"));

	return ds;
}
function onMobileSync(user) {

}