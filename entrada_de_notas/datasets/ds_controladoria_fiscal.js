function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");
	ds.addColumn("Matricula");

	ds.addRow(new Array("1","Caio Passos","Sem Tipo","caio.passos"));
	ds.addRow(new Array("2","Thiago Nogueira","Sem Tipo","thiago.nogueira"));
	ds.addRow(new Array("3","Luciana Siqueira","Sem Tipo","luciana.siqueira"));
	ds.addRow(new Array("4","Michael Barbosa","Sem Tipo",""));
	ds.addRow(new Array("5","Camilla Cafelista","Sem Tipo","camila.cafelista"));
	ds.addRow(new Array("6","Priscila Fernandes","Sem Tipo","priscila.fernandes"));
	ds.addRow(new Array("7","Jessica Barbosa","Sem Tipo","jessica.barbora"));
	ds.addRow(new Array("8","Karina Fernandes","Sem Tipo","ti002"));
	ds.addRow(new Array("9","Andre Coimbra","Sem Tipo","suporte.fluig"));
	
	return ds;
}
function onMobileSync(user) {

}