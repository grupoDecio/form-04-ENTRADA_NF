function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();

	//HOMOLOGAÇÃO
	var cUsuario = 'tester@guruti.com.br_';
	var cMatricula = 'tester@guruti.com.br_';
	var cSenha = 'tester1234'


	//Cria as colunas
	dataset.addColumn("LG");
	dataset.addColumn("SH");
	dataset.addColumn("MT");

	dataset.addRow(new Array(cUsuario, cSenha, cMatricula));

	return dataset;
}