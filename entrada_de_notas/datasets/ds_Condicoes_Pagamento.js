function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Condicao");
    ds.addColumn("Pagamentos");
    ds.addColumn("Prazo");

	ds.addRow(new Array("001","A vista","1","0"));
	ds.addRow(new Array("002","28 dd","1","28"));
	ds.addRow(new Array("002","0/30dd","2","0,30"));
	return ds;
}
function onMobileSync(user) {

}