function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("papel");
    ds.addColumn("setor");

	ds.addRow(new Array("Pool:Role:TI_GRUPODECIO","TI-Grupo Décio"));
	ds.addRow(new Array("Pool:Role:Analistas_DP","Entrada de Notas"));	

	return ds;

}function onMobileSync(user) {

}