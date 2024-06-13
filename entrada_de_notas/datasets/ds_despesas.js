function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Ana Paula COsta Moreira","Sem Tipo"));
	ds.addRow(new Array("2","Lilian Vilarinho Martins","Sem Tipo"));
	ds.addRow(new Array("3","Naiara Gomes Pereira","Sem Tipo"));
	ds.addRow(new Array("4","Ruy Souza Silva","Sem Tipo"));
	ds.addRow(new Array("5","Vera Lucia Diniz Vieira Barros","Sem Tipo"));
	ds.addRow(new Array("6","Roberto Alves","Sem Tipo"));
    ds.addRow(new Array("7","Karina FErnandes","Sem Tipo"));
	
	return ds;
}

function onMobileSync(user) {

}