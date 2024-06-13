function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	
	ds.addRow(new Array("alex.alves","Alex Alves"));
	ds.addRow(new Array("marinones.filho","Marinones Rodrigues Lopes Filho"));
	ds.addRow(new Array("guilherme.neto","Guilherme Antônio de Oliveira Neto"));
	ds.addRow(new Array("telio.macedo","Télio Henrique Macedo e Souza"));
	ds.addRow(new Array("selmo.barbosa","Selmo Elias Barbosa"));
	ds.addRow(new Array("wagner.vieira","Wagner Alves Vieira"));
	ds.addRow(new Array("adriano.guimaraes","Adriano Guimarães da Silva"));
	ds.addRow(new Array("raniere.queiroz","Raniere Dantas Queiroz"));
	ds.addRow(new Array("nara.braz","Nara Lemes Braz"));
	ds.addRow(new Array("wesley.campos","Wesley Junio Silva Campos"));
	ds.addRow(new Array("andreia.barroso","Andréia Barroso Pedroso"));
	ds.addRow(new Array("karina.fernandes","Karina Fernandes"));
	ds.addRow(new Array("suporte.fluig","ANdré Coimbra"));
	
	return ds;
}

function onMobileSync(user) {

}