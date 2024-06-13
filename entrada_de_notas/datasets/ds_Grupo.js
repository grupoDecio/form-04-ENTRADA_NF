function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var ds = DatasetBuilder.newDataset();
    ds.addColumn("Codigo");
    ds.addColumn("Grupo");
    
    ds.addRow(new Array("01", "RODOVIARIO"   ));
    ds.addRow(new Array("02", "TRR"          ));
    ds.addRow(new Array("03", "LIDERPETRO"   ));


    return ds;

} function onMobileSync(user) {

}