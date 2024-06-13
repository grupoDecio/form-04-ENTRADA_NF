function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("STATUS");
    dataset.addColumn("MENSAGEM");
    dataset.addColumn("SUBCATEGORIA");


    var categoria = ""
    var dept = ""

    if (constraints != null && constraints.length) {
        for (var c = 0; c < constraints.length; c++) {
            if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
                if (constraints[c].fieldName.trim().toUpperCase() == "CAT") {
                    categoria = constraints[c].initialValue.trim().toUpperCase();
                }
                if (constraints[c].fieldName.trim().toUpperCase() == "DEPT") {
                    dept = constraints[c].initialValue.trim().toUpperCase();
                }
            }
        }
    }

    if (categoria == "" || dept == "") {
        dataset.addRow(["NOK", "Necessário informar a categoria e departamento!", "Informe a categoria e departamento!"]);
        return dataset;
    }

   

    var cstCategoria = DatasetFactory.createConstraint("DEPT", dept, dept, ConstraintType.MUST)
    var datasetCategoria = DatasetFactory.getDataset("dts_categoria_cadItem", null, [cstCategoria], null)

    

    for (var p = 0; p < datasetCategoria.rowsCount; p++) {
        var categoriaDts = datasetCategoria.getValue(p, "CATEGORIA")

        if (categoria == categoriaDts.toUpperCase()) {
            var strSubCategorias = datasetCategoria.getValue(p, "SUBCATEGORIA")
            var arrSubCategorias = strSubCategorias.split(";;")

            for (var i = 0; i < arrSubCategorias.length; i++) {
                dataset.addRow(["OK", null, arrSubCategorias[i]]);
            }
        }
    }


    return dataset;
}
