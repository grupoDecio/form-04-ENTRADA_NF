function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
    var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array("ailime.ferreira","Ailime Ferreira"));
	ds.addRow(new Array("ana.leite","Ana Leite"));
	ds.addRow(new Array("ana.mundim","Ana Mundim"));
	ds.addRow(new Array("bruna.mari","Bruna Mari"));
	ds.addRow(new Array("divino.junior","Divino Junior"));
	ds.addRow(new Array("matheus.neves","Matheus Neves"));
	ds.addRow(new Array("natalia.goncalves","Natalia Gonçalves"));
	ds.addRow(new Array("ti002","Karina Fernandes"));

	return ds;
}
function onMobileSync(user) {

}