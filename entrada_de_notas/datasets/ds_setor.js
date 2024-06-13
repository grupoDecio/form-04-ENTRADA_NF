function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	

    var ds = DatasetBuilder.newDataset();
	ds.addColumn("TI");
    ds.addColumn("Faturamento");
    ds.addColumn("Agencia");



	
	ds.addRow(new Array("Dúvida","Frota"));
	ds.addRow(new Array("Problema","Carta Frete"));	
	ds.addRow(new Array("Solicitação de Serviço", "Cartão de Crédito"));
	ds.addRow(new Array('',"Descontos não Faturados"));
	ds.addRow(new Array('' ,"Faturamento Rododecio"));
    ds.addRow(new Array('',"Nota a prazo"));


    

	
	return ds;

}function onMobileSync(user) {

}