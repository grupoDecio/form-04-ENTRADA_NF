function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Forma");
    ds.addColumn("Tipo");
    ds.addColumn("Formulario");
    
	ds.addRow(new Array("001","A Vista",'',''));
	ds.addRow(new Array("002","PIX",'F','Chave Pix, Tipo e Nome do Beneficiário'));
	ds.addRow(new Array("003","Transferência Bancária",'F','Dados Bancários Banco/Agência/C.Corrente/CPF ou CNPJ'));
	ds.addRow(new Array("004","Boleto",'',''));
	ds.addRow(new Array("005","Outros",'F','Descreva a forma de pagamento'));
	
	



	return ds;
}
function onMobileSync(user) {

}