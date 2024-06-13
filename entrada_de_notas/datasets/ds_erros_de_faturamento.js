function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Adriana Melo","Parada Bonita"));
	ds.addRow(new Array("2","Nara Carvalho","Gurupi"));
	ds.addRow(new Array("3","Lailson Nunes","Rio Verde"));
	ds.addRow(new Array("4","Aline Tomaz","Ituiutaba"));
	ds.addRow(new Array("5","Nelson Caetano","Campina Verde"));
	ds.addRow(new Array("6","Cristina Lacerda","Geral"));
	ds.addRow(new Array("7","Suellen Franco","Buriti"));
	ds.addRow(new Array("8","Andreia Melo","Arapora/Centralina"));
	ds.addRow(new Array("9","Carolina Domingues","Olhos D'agua/Uberlandia"));
	ds.addRow(new Array("10","Érica Marcolino Bizoni","Posto L3"));
	ds.addRow(new Array("11","Luis Carlos Porfirio","Posto Alto"));
	ds.addRow(new Array("12","Renis Barbosa Silva","Posto L4"));
	ds.addRow(new Array("13","Eurvânio Francisco dos Santos Neto","ADM Variedades Urbanos MG"));
	ds.addRow(new Array("14","Jorge Elias de Freitas","ADM Posto L13"));
	ds.addRow(new Array("15","Francis Moraes de Freitas","ADM Posto L5"));
	ds.addRow(new Array("16","Diego Pires de Souza","SUP Posto L6"));
	ds.addRow(new Array("17","Pedro Ferraz Damasceno Junior","ADM Posto L7"));
	ds.addRow(new Array("18","Lucas Ximenes Padilha","ADM Posto L14"));
	ds.addRow(new Array("19","Cristiane Domingues Souza Oliveira","ADM Urbanos GO"));
	ds.addRow(new Array("20","Nivia Cristina Franco da Silva","Posto L5"));
	ds.addRow(new Array("21","Iandra Costa","Posto L6"));
	ds.addRow(new Array("22","Michele Reis Almeida Ramos","Posto L7"));
	ds.addRow(new Array("23","Lucia Natsue Kato","Posto L14"));
	ds.addRow(new Array("24","Luciara Coqueiro da Silva","Posto L13"));
	ds.addRow(new Array("25","Maxsuel Silva Pedro","SUP Urbanos GO"));
	
	
	return ds;
}
function onMobileSync(user) {

}