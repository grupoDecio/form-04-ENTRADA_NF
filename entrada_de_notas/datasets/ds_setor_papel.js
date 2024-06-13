function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("setor");
	ds.addColumn("papel");
	
	ds.addRow(new Array("Selecione uma opção", ""));
	ds.addRow(new Array("Faturamento central", "Pool:Role:tratativa_faturamento_central"));
	ds.addRow(new Array("Administrativo Central", "Pool:Role:tratativa_administrativo_central"));
	ds.addRow(new Array("Erros / Ajustes Unidades", "Pool:Role:tratativa_erros_de_faturamento"));
	ds.addRow(new Array("Análise de crédito", "Pool:Role:tratativa_analise_de_credito"));
	ds.addRow(new Array("Entrada de notas", "Pool:Role:tratativa_entrada_de_notas"));
	ds.addRow(new Array("Despesas", "Pool:Role:tratativa_despesas"));
	ds.addRow(new Array("Suporte Farmácia Americana", "Pool:Role:tratativa_suporte_farmacia_americana"));
	ds.addRow(new Array("Abertura de Data Retroativa", "Pool:Role:tratativa_abertura_de_data_retroativa"));
	ds.addRow(new Array("Controladoria Cadastro de Itens", "Pool:Role:tratativa_controladoria_cadastro_de_itens"));
	ds.addRow(new Array("Controladoria Contábil", "Pool:Role:tratativa_controladoria_contabil"));
	ds.addRow(new Array("Controladoria Fiscal", "Pool:Role:tratativa_controladoria_fiscal"));
	ds.addRow(new Array("Controladoria Gerencial", "Pool:Role:tratativa_controladoria_gerencial"));
	ds.addRow(new Array("Jurídico", "Pool:Role:tratativa_juridico"));
	ds.addRow(new Array("Agência Decio", "Pool:Role:trataiva_agencia_decio"));
	ds.addRow(new Array("Central de Compras", "Pool:Role:tratativa_central_de_compras"));
	ds.addRow(new Array("Suporte Gurupi", "Pool:Role:tratativa_suporte_gurupi"));
	ds.addRow(new Array("TI", "Pool:Role:tratativa_ti"));
	ds.addRow(new Array("Décio Locadora", "Pool:Role:tratativa_decio_locadora"));
	ds.addRow(new Array("Conciliação", "Pool:Role:tratativa_conciliacao"));
	ds.addRow(new Array("Contas a Pagar", "Pool:Role:tratativa_contas_a_pagar"));
	ds.addRow(new Array("SESMT - MA", "Pool:Role:tratativa_sesmt_ma"));
	
	return ds;

}function onMobileSync(user) {

}