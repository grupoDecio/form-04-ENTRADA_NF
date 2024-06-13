function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Sila Roberta Batista","Sem Tipo"));
	ds.addRow(new Array("2","Raphael Anderson de Souza Oliveira","Sem Tipo"));
	ds.addRow(new Array("3","Lais Daiane Loureano","Sem Tipo"));
	ds.addRow(new Array("4","Karla Alessandra Araujo Vilela","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}