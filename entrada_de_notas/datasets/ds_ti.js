function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
	ds.addColumn("Tipo");
	ds.addColumn("Login");

	ds.addRow(new Array("1","Weder Leal de Freitas","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("2","Welverth Cesar Silva Campos","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("3","Karina Marques Fernandes","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("4","Kaique Torres Leal","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("5","Davi Flavio Machado","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("6","Jefferson Flavio Machado","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("7","Kaio Daros","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("8","Lucas Martins","Sem Tipo","Pool:Group:TI-INFRA"));
	ds.addRow(new Array("9","Andre Coimbra","Sem Tipo","suporte.fluig"));
	ds.addRow(new Array("10","Roberto Alves","Sem Tipo","suporte.fluig"));
	return ds;
}
function onMobileSync(user) {

}