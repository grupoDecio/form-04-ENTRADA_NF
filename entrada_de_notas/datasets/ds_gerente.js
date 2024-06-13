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
	ds.addRow(new Array("carolina.coelhos","Carolina Coelho"));
	ds.addRow(new Array("cristiane.domingues","Cristiane Oliveira"));
	ds.addRow(new Array("cristina.lacerda","Cristina Lacerda"));
	ds.addRow(new Array("dilma.marcelino","Dilma Marcelino"));
	ds.addRow(new Array("eder.maciel","Eder Maciel"));
	ds.addRow(new Array("eurvanio.neto","Eurvanio Neto"));
	ds.addRow(new Array("flavia.santos","Flavia Medeiros"));
	ds.addRow(new Array("kaio.daros","Kaio Daros"));
	ds.addRow(new Array("leonardo.carvalho","Leonardo Carvalho"));
	ds.addRow(new Array("luciane.andrade","Luciane Andrade"));
	ds.addRow(new Array("marcos.farmacia","Marcos Farmacia"));
	ds.addRow(new Array("marcos.goncalves","Marcos Gonçalves"));
	ds.addRow(new Array("marcos.vinicius","Marcos Vinicius"));
	ds.addRow(new Array("nelson.caetano","Nelson Caetano"));
    ds.addRow(new Array("pauladiniz","Paula Diniz"));
    ds.addRow(new Array("paulo.abreu","Paulo Afonso"));
    ds.addRow(new Array("pericles.junior","Pericles Junior"));
    ds.addRow(new Array("rafael.arantes","Rafael Arantes"));
    ds.addRow(new Array("renata.zingra","Renata Zingra"));
    ds.addRow(new Array("rene.guedes","Renê Guedes"));
    ds.addRow(new Array("ricardo.manfrinato","Ricardo Manfrinato"));
    ds.addRow(new Array("rudge.rodrigues","Rudge Rodrigues"));
    ds.addRow(new Array("sidionei.ribeiro","Sidionei Ribeiro"));
    ds.addRow(new Array("tamirys.leles","Tamirys Leles"));
    ds.addRow(new Array("telio.macedo","Telio Macedo"));
    ds.addRow(new Array("tercio.macedo","Tercio Macedo"));
    ds.addRow(new Array("thiago.souza","Thiago Souza"));
    ds.addRow(new Array("valdecir. castro","Valdecir Castro"));
    ds.addRow(new Array("valter.almeida","Valter Almeida"));
    ds.addRow(new Array("vinicius.rodrigues","Vinicius Rodrigues"));
    ds.addRow(new Array("ti002","Karina Fernandes"));
    ds.addRow(new Array("suporte3.fluig", "Eric Eric"));
    
    
   
    
    
    
    
    
	return ds;
}
function onMobileSync(user) {

}