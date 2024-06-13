function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");

	ds.addRow(new Array("1","Alex Alves Rosa","Sem Tipo"));
	ds.addRow(new Array("2","Bruna Teixeira Silva","Sem Tipo"));
	ds.addRow(new Array("3","Edriane Ribeiro Loretto Alves","Sem Tipo"));
	ds.addRow(new Array("4","Edson Jose Venancio Junior","Sem Tipo"));
	ds.addRow(new Array("5","Flavia Ferreira","Sem Tipo"));
	ds.addRow(new Array("6","Sirlei Inacio Nunes Carvalho","Sem Tipo"));
	ds.addRow(new Array("7","Stael Nunes Leite Siqueira","Sem Tipo"));
	ds.addRow(new Array("8","Thaysa Medeiros","Sem Tipo"));
	ds.addRow(new Array("9","Karina Fernandes","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}