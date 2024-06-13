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
	ds.addRow(new Array("caua.silva","Cauã Silva"));
	ds.addRow(new Array("danielle.santos","Danielle Santos"));
	ds.addRow(new Array("davi.araujo","Davi Araujo"));
	ds.addRow(new Array("marcilia.rosana","Marcilia Rosana"));
	ds.addRow(new Array("siria.reis","Siria Reis"));
	ds.addRow(new Array("ti002","Karina Fernandes"));

	return ds;
}
function onMobileSync(user) {

}