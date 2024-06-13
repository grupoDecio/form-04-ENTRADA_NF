function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Renan Henrique Morete de Oliveira","Sem Tipo"));
	ds.addRow(new Array("2","Leidiane Alves Ferreira","Sem Tipo"));
	ds.addRow(new Array("3","Natalia Gomes Pereira","Sem Tipo"));
	ds.addRow(new Array("4","Rogerio Varella Caldeira Filho","Sem Tipo"));
	ds.addRow(new Array("5","Murilo Colmanetti de Carvalho","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}