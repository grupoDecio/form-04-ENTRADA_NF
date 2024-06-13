function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    var params = {}

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            try {
                params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
            } catch (e) {
                params[constraints[i].fieldName] = constraints[i].initialValue;
            }
        }
    }


    dataset.addColumn("STATUS");
    dataset.addColumn("NSOLIC");
    dataset.addColumn("NOMEFANTASIA");
    dataset.addColumn("CNPJ");
    dataset.addColumn("ETAPA");

    var cst = []
    cst.push(DatasetFactory.createConstraint("hd_processoAtivo", "true", "true", ConstraintType.MUST))
    "RAZAOSOCIAL" in params ? cst.push(DatasetFactory.createConstraint("nomeSolicitante", params["RAZAOSOCIAL"], params["RAZAOSOCIAL"], ConstraintType.SHOULD)) : ""
    "CNPJ" in params ? cst.push(DatasetFactory.createConstraint("itxt_matricula_colab", params["CNPJ"], params["CNPJ"], ConstraintType.SHOULD)) : ""




    var ds = DatasetFactory.getDataset('ds_fechamento', null, cst, null);

    for (var p = 0; p < ds.rowsCount; p++) {
        var status = ds.getValue(p, "hd_processoAtivo") == "true" ? "Em aberto" : "Encerrado"

        dataset.addRow(new Array(
            status,
            ds.getValue(p, "numeroSolicitacao"),
            ds.getValue(p, "nomeSolicitante"),
            ds.getValue(p, "itxt_matricula_colab"),
            ds.getValue(p, "hd_descEtapa")
        ));

    }


    return dataset;
}