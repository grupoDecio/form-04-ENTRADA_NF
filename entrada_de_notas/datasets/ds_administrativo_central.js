function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","cobranca@grupodecio.com.br","Supervisao-Cobrança"));
	ds.addRow(new Array("2","conciliacao@grupodecio.com.br","Supervisao-Conciliacao"));
	ds.addRow(new Array("3","contasapagar@grupodecio.com.br","Supervisao-Contas a Pagar"));
	ds.addRow(new Array("4","ccontabil@grupodecio.com.br","Supervisao-Controladoria Contabil"));
	ds.addRow(new Array("5","cfiscal@grupodecio.com.br","Supervisao-Controladoria Fiscal"));
	ds.addRow(new Array("6","cgerencial@grupodecio.com.br","Supervisao-Controladoria Gerencial"));
	ds.addRow(new Array("7","cadastro@grupodecio.com.br","Supervisao-Cadastro de Itens"));
	ds.addRow(new Array("8","despesa@grupodecio.com.br","Supervisao-Despesa"));
	ds.addRow(new Array("9","entrada@grupodecio.com.br","Supervisao-Entrada de Notas"));
	ds.addRow(new Array("10","faturamento@grupodecio.com.br","Supervisao-Faturamento"));
	ds.addRow(new Array("11","alex.alves@grupodecio.com.br","Supervisao-RH"));
	
	return ds;
}
function onMobileSync(user) {

}