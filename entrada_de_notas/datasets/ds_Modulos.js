function defineStructure() {

}
function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) 
{
    var ds = DatasetBuilder.newDataset();
    ds.addColumn("ID");
    ds.addColumn("Nome");
    ds.addColumn("SLA");
    ds.addColumn("Horas");
    ds.addColumn("Hora2");
    ds.addColumn("Hora3");
    
    ds.addRow(new Array('01','01-Ativo Fixo','Alto','008:00','008:00','008:00'));
    ds.addRow(new Array('02','02-Compras','Medio','003:00','003:00','003:00'));
    ds.addRow(new Array('04','04-Estoque e Custos','Baixo','001:00','001:00','001:00'));
    ds.addRow(new Array('05','05-Faturamento','Baixo','001:00','001:00','001:00'));
    ds.addRow(new Array('06','06-Financeiro','Baixo','001:00','001:00','001:00'));
    ds.addRow(new Array('09','09-Livros Fiscais','Medio','003:00','003:00','003:00'));
    ds.addRow(new Array('12','12-Loja','Alto','008:00','008:00','008:00'));
    ds.addRow(new Array('34','34-Contabilidade Gerencial','Medio','003:00','003:00','003:00'));
    ds.addRow(new Array('84','84-TAF','Alto','008:00','008:00','008:00'));
    ds.addRow(new Array('97','97-Postos Inteligentes','Baixo','001:00','001:00','001:00'));
    ds.addRow(new Array('INT1','INT1-Transmite','Medio','003:00','000:01','003:00'));
    ds.addRow(new Array('INT2','INT2-Integração Teknisa','Medio','003:00','000:01','003:00'));
    ds.addRow(new Array('INT3','INT3-Integração BR Mania','Medio','003:00','000:01','003:00'));

    return ds;
}
function onMobileSync(user) {

}