function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	
    ds.addRow(new Array('01','01 - RODOVIARIO'));
    ds.addRow(new Array('02','02 - TRR'));
    ds.addRow(new Array('03','03 - LIDERPETRO'));
    ds.addRow(new Array('04','04 - LOCADORA'));
    ds.addRow(new Array('05','05 - MANUTENCAO E INSTALACAO'));
    ds.addRow(new Array('06','06 - COMUNICACAO E MARKETING'));
    ds.addRow(new Array('07','07 - IMOBILIARIO'));
    ds.addRow(new Array('08','08 - DISTRIBUIDORA PECAS'));
    ds.addRow(new Array('09','09 - URBANO'));
    ds.addRow(new Array('80','80 - PARTICIPACAO E NEGOCIOS'));


	
	return ds;
}
function onMobileSync(user) {

}