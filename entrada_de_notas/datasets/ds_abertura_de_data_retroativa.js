function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");


	ds.addRow(new Array("ana.oliveira","Ana Paula Oliveira","Sem Tipo"));
	ds.addRow(new Array("jociane.siqueira","Jociane Siqueira","Sem Tipo"));
	ds.addRow(new Array("maria.mizael","Maria Mizael","Sem Tipo"));
	ds.addRow(new Array("nayane.vieria","Nayane Vieira","Sem Tipo"));
	ds.addRow(new Array("luciana.paz","Luciana Paz","Sem Tipo"));
	
	
	return ds;
}
function onMobileSync(user) {

}