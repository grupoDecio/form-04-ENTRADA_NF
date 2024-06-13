function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Joao Colaco Silva","Sem Tipo"));
	ds.addRow(new Array("2","Suzane Luiza de Alcantara Santos","Sem Tipo"));
	ds.addRow(new Array("3","Franciene de Carvalho Silva","Sem Tipo"));
	ds.addRow(new Array("4","Iago Ferreira da Silva","Sem Tipo"));
	ds.addRow(new Array("5","Pedro Henrique Martins de Oliveira","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}