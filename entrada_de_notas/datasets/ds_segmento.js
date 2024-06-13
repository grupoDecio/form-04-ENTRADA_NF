function defineStructure() {
    addColumn("ID");
    addColumn("Nome");
    addColumn("Resp");
    setKey(["ID"]);
    addIndex(["ID"]);



}
function onSync(lastSyncDate) {

    var ds = DatasetBuilder.newDataset();
    ds_segmento = DatasetFactory.getDataset('ds_segmento', null, null, null);

    for (var i = 0; i < ds_segmento.rowsCount; i++) {
        ds.addOrUpdateRow([
            ds_segmento.getValue(i, "ID"), ds_segmento.getValue(i, "Nome"), ds_segmento.getValue(i, "Resp")
        ]);
    }

    return ds;

}

function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("ID");
    ds.addColumn("Nome");
    ds.addColumn("Resp");

    //Não deletar ou modificar essa Linha
    ds.addRow(new Array("1", "Selecione uma opção:", ""));

    ds.addRow(new Array("2", "Administrativo", "suporte.fluig"));
    ds.addRow(new Array("3", "Cadastro/Analise de Credito", "suporte.fluig"));
    ds.addRow(new Array("4", "Cobrança", "admin"));
    ds.addRow(new Array("5", "Controladoria-Cadastro de Itens", "suporte.fluig"));
    ds.addRow(new Array("6", "Controladoria-Contábil", "suporte.fluig"));
    ds.addRow(new Array("7", "Controladoria-Fiscal", "suporte.fluig"));
    ds.addRow(new Array("8", "Controladoria-Gerencial", "suporte.fluig"));
    ds.addRow(new Array("9", "Conveniencia", "suporte.fluig"));
    ds.addRow(new Array("10", "Despesa", "suporte.fluig"));
    ds.addRow(new Array("11", "Diesel", "suporte.fluig"));
    ds.addRow(new Array("12", "Distribuidora", "suporte.fluig"));
    ds.addRow(new Array("13", "Drogaria", "suporte.fluig"));
    ds.addRow(new Array("14", "Entrada de Notas", "suporte.fluig"));
    ds.addRow(new Array("15", "Faturamento", "suporte.fluig"));
    ds.addRow(new Array("16", "Faturamento-Carta Frete", "suporte.fluig"));
    ds.addRow(new Array("17", "Faturamento-Nota a Prazo", "suporte.fluig"));
    ds.addRow(new Array("18", "Faturamento-Cartão Débito/Crédito", "suporte.fluig"));
    ds.addRow(new Array("19", "Faturamento-Cartão Frota", "suporte.fluig"));
    ds.addRow(new Array("20", "Faturamento-Liquidação", "suporte.fluig"));
    ds.addRow(new Array("21", "Hotel", "suporte.fluig"));
    ds.addRow(new Array("22", "Jurídico", "suporte.fluig"));
    ds.addRow(new Array("23", "Manutenção", "suporte.fluig"));
    ds.addRow(new Array("24", "Marketing", "suporte.fluig"));
    ds.addRow(new Array("25", "Obra", "suporte.fluig"));
    ds.addRow(new Array("26", "Peças e Acessorios", "suporte.fluig"));
    ds.addRow(new Array("27", "PGE", "suporte.fluig"));
    ds.addRow(new Array("28", "Projetos", "suporte.fluig"));
    ds.addRow(new Array("29", "Restaurante", "suporte.fluig"));
    ds.addRow(new Array("30", "RH", "suporte.fluig"));
    ds.addRow(new Array("31", "Tesouraria-Conciliação", "suporte.fluig"));
    ds.addRow(new Array("32", "Tesouraria-Contas a Pagar", "suporte.fluig"));
    ds.addRow(new Array("33", "TI", "suporte.fluig"));
    ds.addRow(new Array("34", "Top Bordados", "suporte.fluig"));
    ds.addRow(new Array("35", "Transportadora", "suporte.fluig"));
    ds.addRow(new Array("36", "TRR", "suporte.fluig"));
    ds.addRow(new Array("37", "Variedades", "suporte.fluig"));
    ds.addRow(new Array("38", "Governança", "suporte.fluig"));
    ds.addRow(new Array("39", "SSMA", "suporte.fluig"));
    ds.addRow(new Array("40", "Auditoria", "suporte.fluig"));
    ds.addRow(new Array("41","Imobiliaria","barbara.bacha"));

    ///ds = constraintsApply(constraints, ds)

    return ds;
}

function onMobileSync(user) {

}

function constraintsApply(constraints, ds) {
    var retorno = DatasetBuilder.newDataset();
    retorno.addColumn("ID");
    retorno.addColumn("Nome");
    retorno.addColumn("Resp");



    if (constraints != null) {
        var cID = '';
        var cNome = '';
        var cResp = '';
        var lFiltro = false;

        for (var j = 0; j < constraints.length; j++) {
            if (constraints[j].fieldName == "ID") {
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
        log.info("Filtros_Recebido - ID=" + cID + " - Nome=" + cNome + " - Resp=" + cResp)

        if (lFiltro == true) {

            for (var i = 0; i < ds.values.length; i++) {
                if (cID != '') {
                    if (ds.getValue(i, "ID") == cID) {
                        retorno.addRow(new Array(ds.getValue(i, "ID"),
                            ds.getValue(i, "Nome"),
                            ds.getValue(i, "Resp")))
                    }
                }
                if (cNome != '') {
                    if (ds.getValue(i, "Nome").toUpperCase() == cNome.toUpperCase()) {
                        retorno.addRow(new Array(ds.getValue(i, "ID"),
                            ds.getValue(i, "Nome"),
                            ds.getValue(i, "Resp")))
                    }
                }
                if (cResp != '') {
                    if (ds.getValue(i, "Resp") == cResp) {
                        retorno.addRow(new Array(ds.getValue(i, "ID"),
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