function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Wilza Carla de Oliveira Rodrigues","Cartao Frota"));
	ds.addRow(new Array("2","Isabelle Cristina Santos","Cartao Frota"));
	ds.addRow(new Array("3","Leticia de Souza Silva","Cartao Frota"));
	ds.addRow(new Array("4","Angelica Santos Silva","Cartao Debito/Credito"));
	ds.addRow(new Array("5","Aparecida Rosene de Lima","Cartao Debito/Credito"));
	ds.addRow(new Array("6","Bruna de Oliveira Costa","Cartao Debito/Credito"));
	ds.addRow(new Array("7","Carla Fernanda Duarte","Cartao Debito/Credito"));
	ds.addRow(new Array("8","Elida Araujo Costa","Cartao Debito/Credito"));
	ds.addRow(new Array("9","Hugo Ribeiro Alves","Cartao Debito/Credito"));
	ds.addRow(new Array("10","Vitor Hugo Nascimento de Moraes","Cartao Debito/Credito"));
	ds.addRow(new Array("11","Vitor Hugo Tavares da Silva","Cartao Debito/Credito"));
	ds.addRow(new Array("12","Erika Borges de Moura","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("13","Denia Vieira Santana","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("14","Eduardo Mendonca Venancio","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("15","Leila maria Fernandes","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("16","Monica Ferreira dos Santos","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("17","Rafael Guilherme Matos Franca Scalon","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("18","Saphiry Almeida Santana","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("19","Vinicio Claudino Bessa","Carta Frete/Nota a prazo"));
	ds.addRow(new Array("20","Lara Flávia Ribeiro","Rododecio"));
	ds.addRow(new Array("21","Lais Custodio da Silva","Rododecio"));
	
	return ds;
}
function onMobileSync(user) {

}