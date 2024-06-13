function defineStructure() {

}
function onSync(lastSyncDate) {
	 
}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("1","Nota Fiscal de Serviço"));
	ds.addRow(new Array("2","Folha"));
	ds.addRow(new Array("3","Benefícios"));
	ds.addRow(new Array("4","Segurança e Saúde do Trabalho"));
	ds.addRow(new Array("5","Rateio Corporativo"));
	ds.addRow(new Array("6","Impostos/Tributos"));
	ds.addRow(new Array("7","Consumo"));
	ds.addRow(new Array("8","Reembolso de Despesas"));
	ds.addRow(new Array("9","Receita"));
	ds.addRow(new Array("10","Adiantamento a Fornecedor"));
	ds.addRow(new Array("11","Despesas sem nota"));

	return ds;

}
function onMobileSync(user) {

}