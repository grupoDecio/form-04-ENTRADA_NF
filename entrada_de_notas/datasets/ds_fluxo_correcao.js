function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("1","Selecione uma opção"));
	
    ds.addRow(new Array("2","ADM-->Ab. Solicitação - Administrativo Central"));
	ds.addRow(new Array("3","ADM-->Ab. Solicitação - Análise de Crédito/Cadastro de Fornecedores_Pessoas"));
	ds.addRow(new Array("4","ADM-->Ab. Solicitação - Despesas"));
	ds.addRow(new Array("5","ADM-->Ab. Solicitação - Entrada de Notas"));
    ds.addRow(new Array("6","ADM-->Ab. Solicitação - Faturamento Central"));
    
    ds.addRow(new Array("7","CONTROLADORIA-->Ab. Solicitação - Abertura de Data Retroativa"));
    ds.addRow(new Array("8","CONTROLADORIA-->Ab. Solicitação - Controladoria Cadastro de Itens"));
    ds.addRow(new Array("9","CONTROLADORIA-->Ab. Solicitação - Controladoria Contábil"));
    ds.addRow(new Array("10","CONTROLADORIA-->Ab. Solicitação - Controladoria Fiscal"));
    ds.addRow(new Array("11","CONTROLADORIA-->Ab. Solicitação - Controladoria Gerencial"));
    
    ds.addRow(new Array("12","DECIO LOCADORA-->Ab. Solicitação - Manutenção de veículos"));
    
    ds.addRow(new Array("13","JURÍDICO-->Ab. Solicitação - Jurídico"));
    
    ds.addRow(new Array("14","MARKETING-->Ab. Solicitação - Agência Decio"));
    
    ds.addRow(new Array("15","MEIO AMBIENTE-->Ab. Solicitação - Meio Ambiente"));
    
    ds.addRow(new Array("16","RH-->Ab. Solicitação - Adiantamento Salarial/13º Salário"));
    ds.addRow(new Array("17","RH-->Ab. Solicitação - Alteração de Cargo/Salário/Departamento/Setor"));
    ds.addRow(new Array("18","RH-->Ab. Solicitação - Avaliação de Experiência"));
    ds.addRow(new Array("19","RH-->Ab. Solicitação - Desligamento"));
    ds.addRow(new Array("20","RH-->Ab. Solicitação - Emissão de Advertência/Suspensão"));
    ds.addRow(new Array("21","RH-->Ab. Solicitação - Fechamento de Folha"));
    ds.addRow(new Array("22","RH-->Ab. Solicitação - Férias"));
    ds.addRow(new Array("23","RH-->Ab. Solicitação - Lançamento de Notas Fiscais PF/PJ"));
    ds.addRow(new Array("24","RH-->Ab. Solicitação - Orçamento para Treinamento"));
    ds.addRow(new Array("25","RH-->Ab. Solicitação - Pagamento Variáveis"));
    ds.addRow(new Array("26","RH-->Ab. Solicitação - Requisição de Pessoal/Admissão"));
    ds.addRow(new Array("27","RH-->Ab. Solicitação - Solicitações diversas"));
    ds.addRow(new Array("28","RH-->Ab. Solicitação - Validação do Ponto"));
    
    ds.addRow(new Array("29","RODOVIÁRIOS/URBANOS-->Ab. Solicitação - Ajustes Unidades/Erros de faturamento"));
    ds.addRow(new Array("30","RODOVIÁRIOS/URBANOS-->Ab. Solicitação - Central de Compras"));
    ds.addRow(new Array("31","RODOVIÁRIOS/URBANOS-->Ab. Suporte Farmácia Americana"));
    
    ds.addRow(new Array("32","TESOURARIA-->Ab. Solicitação - Conciliação"));
    ds.addRow(new Array("33","TESOURARIA-->Ab. Solicitação - Contas a Pagar"));
    
    ds.addRow(new Array("34","TI-->Ab. Solicitação - TI"));
    ds.addRow(new Array("35","TI-->Ab. Solicitação - TI-Interna"));
    ds.addRow(new Array("36","TI-->Ab. Solicitação - Correção nos Processos do Fluig"));
    ds.addRow(new Array("37","TI-->Ab. Solicitação - Criação/Melhoria nos Processos do Fluig"));
    
    ds.addRow(new Array("38","RH.Auxiliar-->Subprocesso Despesas - Folha"));
    ds.addRow(new Array("39","RH.Auxiliar-->Subprocesso Despesas - Pagamentos"));
    ds.addRow(new Array("40","RH.Auxiliar-->Subprocesso RH - Documentos Rescisão"));
    ds.addRow(new Array("41","RH.Auxiliar-->subprocesso_cadastroPF"));
    ds.addRow(new Array("42","RH.Auxiliar-->subprocesso_sesmt"));
    ds.addRow(new Array("43","RH.Auxiliar-->subprocesso_ti"));
    
    ds.addRow(new Array("44","00-FLUIG"));
    ds.addRow(new Array("45","01-TI & Sistemas"));
    ds.addRow(new Array("46","02-Despesas Imobiliárias"));
    ds.addRow(new Array("55","03-Cadastro"));
    ds.addRow(new Array("47","05-DESLIGAMENTO"));
    ds.addRow(new Array("48","06-MEDIDA DISCIPLINAR"));
    ds.addRow(new Array("65","07-Alterar Cargo-Salário-Depto-Setor"));
    ds.addRow(new Array("66","08-FINANCEIRO"));
    ds.addRow(new Array("60","09-PROJETOS"));
    ds.addRow(new Array("49","10-DESPESA"));
    ds.addRow(new Array("50","12-CONTROLADORIA FISCAL"));
    ds.addRow(new Array("50","13-PAGAMENTO RPA"));
    ds.addRow(new Array("51","14-RETORNO AO TRABALHO"));
    ds.addRow(new Array("52","15-JURIDICO"));
    ds.addRow(new Array("53","16-CARTAO VEXPENSES"));
    ds.addRow(new Array("54","17-RECRUTAMENTO"));
    ds.addRow(new Array("56","18-ALCADAS DE APROVAÇÃO"));
    ds.addRow(new Array("57","19-SESWMT"));
    ds.addRow(new Array("58","20-FECHAMENTO"));
    ds.addRow(new Array("59","21-ERRO_LANCAMENTO_DE_NOTA_FISCAL"));
    ds.addRow(new Array("61","22-TI_ACESsOS"));
    ds.addRow(new Array("62","23-TI_GDIN"));
    ds.addRow(new Array("63","24-LIQUIDACAO_CENTRAL"));

	return ds;
}
function onMobileSync(user) {

}