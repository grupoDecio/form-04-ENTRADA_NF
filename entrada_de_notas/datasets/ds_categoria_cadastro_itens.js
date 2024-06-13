function defineStructure() {

}
function onSync(lastSyncDate) {
	 
}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
    

	ds.addRow(new Array("1","Selecione uma opção"));
	ds.addRow(new Array("2","Análise de cadastro"));
	ds.addRow(new Array("3","Cadastro de itens - 24HS"));
	ds.addRow(new Array("4","Cadastro de itens - Beirario"));
	ds.addRow(new Array("5","Cadastro de itens - Deciomania"));
	ds.addRow(new Array("6","Cadastro de itens - Urbanos/Variedades/Vilatreze"));
	ds.addRow(new Array("8","Outros"));
	ds.addRow(new Array("9","Validação de custos"));
	

	return ds;

}
function onMobileSync(user) {

}