function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("alex.alves","Alex Alves"));
	ds.addRow(new Array("suporte.fluig","Andre Coimbra"));
	
    ds.addRow(new Array("paulo.reis","Paulo Henrique"));
    ds.addRow(new Array("diego.oliveira","Diego Lacerda"));
    ds.addRow(new Array("carolina.coelho","Carolina Coelho"));
    ds.addRow(new Array("carivaldo.neto","Carivaldo Neto"));
    ds.addRow(new Array("rodrigo.crivellenti","Rodrigo Crivellenti"));
    ds.addRow(new Array("ti002","Karina Fernandes"));
    ds.addRow(new Array("suporte3.fluig", "Eric Eric"));

	return ds;
}
function onMobileSync(user) {

}