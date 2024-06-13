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
	ds.addRow(new Array("nayane.vieira","Nayane Vieira","Sem Tipo"));
	
	ds.addRow(new Array("luciana.paz","Luciana Paz","Sem Tipo"));
	ds.addRow(new Array("lilian.vilarinho","Lilian Vilarinho","Sem Tipo"));
	ds.addRow(new Array("nayara.alves","Nayara Alves","Sem Tipo"));
	ds.addRow(new Array("joao.alves","Joao Alves","Sem Tipo"));
	ds.addRow(new Array("cassio.custodio","Cassio Custodio","Sem Tipo"));
	
	return ds;
}
function onMobileSync(user) {

}