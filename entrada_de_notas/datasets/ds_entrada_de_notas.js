function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Debora Kesia da Silva Marins","Sem Tipo"));
	ds.addRow(new Array("2","Monica Boaventura","Sem Tipo"));
	ds.addRow(new Array("3","Andressa de Sousa Medeiros","Sem Tipo"));
	ds.addRow(new Array("4","Luan Mateus de Oliveira","Sem Tipo"));
	ds.addRow(new Array("5","Miryene Nunes de Oliveira","Sem Tipo"));
	ds.addRow(new Array("6","Nataly Paloma Almeida dos Santos","Sem Tipo"));
	ds.addRow(new Array("7","Stefani Santos da Cunha","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}