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
	ds.addRow(new Array("junior.vendas","Alcy Junior"));
	ds.addRow(new Array("cristiane.domingues","Cristiane Oliveira"));
	ds.addRow(new Array("ti002","Karina Fernandes"));

  
    
    
    
    
    
	return ds;
}
function onMobileSync(user) {

}