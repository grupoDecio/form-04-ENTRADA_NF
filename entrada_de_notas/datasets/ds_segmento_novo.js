function defineStructure() {
    addColumn("Id_Seg");
    addColumn("Nome");
    addColumn("Resp");
    setKey(["Id_Seg"]);
    addIndex(["Id_Seg"]);



}
function onSync(lastSyncDate) {

    var ds = DatasetBuilder.newDataset();
    ds_segmento = DatasetFactory.getDataset('ds_segmento_novo', null, null, null);

    for (var i = 0; i < ds_segmento.rowsCount; i++) {
        ds.addOrUpdateRow([
            ds_segmento.getValue(i, "Id_Seg"), ds_segmento.getValue(i, "Nome"), ds_segmento.getValue(i, "Resp")
        ]);
    }

    return ds;

}

function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("Id_Seg");
    ds.addColumn("Nome");
    ds.addColumn("Resp");

    ds = constraintsApply(constraints, ds)

    return ds;
}

function onMobileSync(user) {

}

function constraintsApply(constraints, ds) {
    var retorno = DatasetBuilder.newDataset();
    retorno.addColumn("Id_Seg");
    retorno.addColumn("Nome");
    retorno.addColumn("Resp");



    if (constraints != null) {
        var cID = '';
        var cNome = '';
        var cResp = '';
        var lFiltro = false;

        for (var j = 0; j < constraints.length; j++) {
            if (constraints[j].fieldName == "Id_Seg") {
                cID = constraints[j].initialValue
                lFiltro = true;
            }
            if (constraints[j].fieldName == "Nome") {
                log.info('constraints[j].initialValue1 =' + constraints[j].initialValue)
                cNome = constraints[j].initialValue
                lFiltro = true;
            }
            if (constraints[j].fieldName == "Resp") {
                cResp = constraints[j].initialValue
                lFiltro = true;
            }
        }
        log.info("Filtros_Recebido - Id_Seg=" + cID + " - Nome=" + cNome + " - Resp=" + cResp)

        if (lFiltro == true) {

            for (var i = 0; i < ds.values.length; i++) {
                if (cID != '') {
                    if (ds.getValue(i, "Id_Seg") == cID) {
                        retorno.addRow(new Array(ds.getValue(i, "Id_Seg"),
                            ds.getValue(i, "Nome"),
                            ds.getValue(i, "Resp")))
                    }
                }
                if (cNome != '') {
                    if (ds.getValue(i, "Nome") == cNome) {
                        retorno.addRow(new Array(ds.getValue(i, "Id_Seg"),
                            ds.getValue(i, "Nome"),
                            ds.getValue(i, "Resp")))
                    }
                }
                if (cResp != '') {
                    if (ds.getValue(i, "Resp") == cResp) {
                        retorno.addRow(new Array(ds.getValue(i, "Id_Seg"),
                            ds.getValue(i, "Nome"),
                            ds.getValue(i, "Resp")))
                    }
                }
            }
        } else {
            log.info("não_tem_constraint ");
            retorno = ds
        }
    } else {
        log.info("não_tem_constraint ");
        retorno = ds
    }

    log.dir(retorno)
    return retorno
}