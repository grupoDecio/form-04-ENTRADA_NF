function createDataset(fields, constraints, sortFields) 
{
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("processo"); /// processo
    dataset.addColumn("cargo"); /// cargo
    dataset.addColumn("valor"); /// valor

    //Cria os registros
	dataset.addRow(new Array('16-CARTAO_VEXPENSES','Gerência','R$ 2.000,00'));
	dataset.addRow(new Array('16-CARTAO_VEXPENSES','Motorista','R$ 800,00'));
	dataset.addRow(new Array('16-CARTAO_VEXPENSES','Demais colaboradores','R$ 1.000,00'));
	return dataset;
}
