function createDataset(fields, constraints, sortFields) {
    var ds = DatasetBuilder.newDataset();
    ds.addColumn("ID");
    ds.addColumn("Nome");

    var categoria = "";
    var sl_sistema = "";
    	
    if (constraints != null && constraints.length > 0) {
        for (var c = 0; c < constraints.length; c++) {
            if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
                if (constraints[c].fieldName.toUpperCase() == "CATEGORIA") {
                    categoria = constraints[c].initialValue.trim();
                }
                if (constraints[c].fieldName.toUpperCase() == "SL_SISTEMA") {
                    sl_sistema = constraints[c].initialValue.trim();
                }
            }
        }
    }

    if(categoria == ""){
        return ds;
    }

    if(categoria == "Estação de serviços" && sl_sistema == "2"){
        ds.addRow(["1", "Faturas(Internet, Telefonia, Energia, Água)"]);
        ds.addRow(["2", "Devolução"]);
        ds.addRow(["3", "Exclusão/Ajuste de lançamento"]);
        //ds.addRow(["4", "Frete"]);
        ds.addRow(["5", "Recusa"]);
        ds.addRow(["6", "Remessa"]);
        ds.addRow(["7", "Transferência"]);
    }else if(categoria == "Estação de serviços"){
        ds.addRow(["1", "Faturas(Internet, Telefonia, Energia, Água)"]);
        ds.addRow(["2", "Devolução"]);
        ds.addRow(["3", "Exclusão/Ajuste de lançamento"]);
        ds.addRow(["4", "Frete"]);
        ds.addRow(["5", "Recusa"]);
        ds.addRow(["6", "Remessa"]);
        ds.addRow(["7", "Transferência"]);
    }
    else if(categoria == "Rododecio" && sl_sistema == "2"){
        ds.addRow(["1", "Faturas(Internet, Telefonia, Energia, Água)"]);
        ds.addRow(["2", "Exclusão/Ajuste de lançamento"]);
        ds.addRow(["3", "Devolução"]);
        ds.addRow(["4", "Lançamento de NF"]);
    }
    else if(categoria == "Rododecio"){
        ds.addRow(["1", "Faturas(Internet, Telefonia, Energia, Água)"]);
        ds.addRow(["2", "Exclusão/Ajuste de lançamento"]);
        ds.addRow(["3", "Devolução"]);
        ds.addRow(["4", "Lançamento de NF"]);
    }

    return ds;

}