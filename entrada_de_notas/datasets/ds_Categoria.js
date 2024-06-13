function defineStructure() {

}
function onSync(lastSyncDate) {
	 
}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
    ds.addColumn("Departamento");

	ds.addRow(new Array("1","Nota Fiscal de Serviço","Despesa"));
	ds.addRow(new Array("2","Folha","Despesa"));
	ds.addRow(new Array("3","Benefícios","Despesa"));
	ds.addRow(new Array("4","Segurança e Saúde do Trabalho","Despesa"));
	ds.addRow(new Array("5","Rateio Corporativo","Despesa"));
	ds.addRow(new Array("6","Impostos/Tributos","Despesa"));
	ds.addRow(new Array("7","Consumo","Despesa"));
	ds.addRow(new Array("8","Reembolso de Despesas","Despesa"));
	ds.addRow(new Array("9","Receita","Despesa"));
	ds.addRow(new Array("10","Adiantamento a Fornecedor","Despesa"));
	ds.addRow(new Array("11","Despesas sem nota","Despesa"));
	
	ds.addRow(new Array("12","RODODECIO","EntradaNF"));
	ds.addRow(new Array("13","Devolução","EntradaNF"));
	ds.addRow(new Array("14","Transferências","EntradaNF"));
	ds.addRow(new Array("15","Remessa","EntradaNF"));
	ds.addRow(new Array("16","Faturas(Internet, Telefonia, Energia, Água)","EntradaNF"));
	ds.addRow(new Array("17","Anulação","EntradaNF"));
	ds.addRow(new Array("18","Recusa","EntradaNF"));
	ds.addRow(new Array("19","Exclusão/Ajuste de Lançamentos","EntradaNF"));
	ds.addRow(new Array("20","Frete","EntradaNF"));
	ds.addRow(new Array("21","Perdas","EntradaNF"));
	ds.addRow(new Array("22","Medicamentos Vencidos","EntradaNF"));
	ds.addRow(new Array("23","Cobertura de NFCE","EntradaNF"));
	ds.addRow(new Array("24","Fracionamento","EntradaNF"));
	ds.addRow(new Array("25","Correção de lote","EntradaNF"));
	return ds;

}
function onMobileSync(user) {

}