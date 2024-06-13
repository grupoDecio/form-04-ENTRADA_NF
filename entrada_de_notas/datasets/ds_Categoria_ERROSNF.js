function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
    ds.addColumn("Nome");

	//Não deletar essa linha numero 1
	ds.addRow(new Array("Selecione uma opção:"));
	ds.addRow(new Array("Araporã"));
    ds.addRow(new Array("Buriti"));
    ds.addRow(new Array("Campina Verde"));
    ds.addRow(new Array("Centralina"));
    ds.addRow(new Array("Gurupi"));
    ds.addRow(new Array("Ituiutaba"));
    ds.addRow(new Array("Olhos D'água"));
    ds.addRow(new Array("Parada Bonita"));
    ds.addRow(new Array("Rio Verde"));
    ds.addRow(new Array("Uberlândia"));
    ds.addRow(new Array("Urbanos Goiás"));
    ds.addRow(new Array("Urbanos Minas Gerais"));
    ds.addRow(new Array("Postos Mineiros"));


	return ds;
}
function onMobileSync(user) {

}