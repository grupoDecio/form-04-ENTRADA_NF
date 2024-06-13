function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	
	ds.addRow(new Array("1","Alexandre Junior"));
	ds.addRow(new Array("2","Vanessa Silva"));
	ds.addRow(new Array("3","Diego Silva"));
	ds.addRow(new Array("4","Irlania Pereira"));
	ds.addRow(new Array("5","Matheus Malaquias"));
	ds.addRow(new Array("6","Silvio Andrade"));
	ds.addRow(new Array("7","Ruan Ferreira"));
	ds.addRow(new Array("8","Gabriel Oliveira"));
	ds.addRow(new Array("9","Joao Colaco"));
	ds.addRow(new Array("10","Suzane Alcantara"));
	ds.addRow(new Array("11","Rosangela Santos"));
	ds.addRow(new Array("12","Ellen Mota"));
	ds.addRow(new Array("13","Louyse Francisco"));
	ds.addRow(new Array("14","Andressa Santos de Paula"));
	ds.addRow(new Array("15","Ana Carolina Mota"));
	ds.addRow(new Array("16","Fabiana Medeiros"));
	return ds;
}
function onMobileSync(user) {

}