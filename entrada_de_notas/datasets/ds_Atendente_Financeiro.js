function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
    var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("murilo.carvalho","Murilo Carvalho"));
	ds.addRow(new Array("rogerio.filho","Rogerio Filho"));

	ds.addRow(new Array("wellington.arantes","Wellington Arantes"));
	ds.addRow(new Array("lais.arantes","Lais Arantes"));
	ds.addRow(new Array("vitor.silva","Vitor Silva"));
	ds.addRow(new Array("marco.camargo","Marco Antonio Ferreira de Camargo"));
	ds.addRow(new Array("michelle.paulo","Michelle Paulo"));


	return ds;
}
function onMobileSync(user) {

}