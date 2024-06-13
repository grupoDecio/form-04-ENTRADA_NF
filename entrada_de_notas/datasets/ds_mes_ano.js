function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    
    var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	//Não deletar essa linha numero 1
	ds.addRow(new Array("1","Selecione uma opção:"));

    ds.addRow(new Array("2","JANEIRO/2022"));
    ds.addRow(new Array("3","FEVEREIRO/2022"));
    ds.addRow(new Array("4","MARÇO/2022"));
    ds.addRow(new Array("5","ABRIL/2022")); 
    ds.addRow(new Array("6","MAIO/2022"));
    ds.addRow(new Array("7","JUNHO/2022"));
    ds.addRow(new Array("8","JULHO/2022"));
    ds.addRow(new Array("9","AGOSTO/2022"));
    ds.addRow(new Array("10","SETEMBRO/2022"));
    ds.addRow(new Array("11","OUTUBRO/2022"));
    ds.addRow(new Array("12","NOVEMBRO/2022"));
    ds.addRow(new Array("13","DEZEMBRO/2022"));
    
    ds.addRow(new Array("14","JANEIRO/2023"));
    ds.addRow(new Array("15","FEVEREIRO/2023"));
    ds.addRow(new Array("16","MARÇO/2023"));
    ds.addRow(new Array("17","ABRIL/2023")); 
    ds.addRow(new Array("18","MAIO/2023"));
    ds.addRow(new Array("19","JUNHO/2023"));
    ds.addRow(new Array("20","JULHO/2023"));
    ds.addRow(new Array("21","AGOSTO/2023"));
    ds.addRow(new Array("22","SETEMBRO/2023"));
    ds.addRow(new Array("23","OUTUBRO/2023"));
    ds.addRow(new Array("24","NOVEMBRO/2023"));
    ds.addRow(new Array("25","DEZEMBRO/2023"));
    
    ds.addRow(new Array("26","JANEIRO/2024"));
    ds.addRow(new Array("27","FEVEREIRO/2024"));
    ds.addRow(new Array("28","MARÇO/2024"));
    ds.addRow(new Array("29","ABRIL/2024")); 
    ds.addRow(new Array("30","MAIO/2024"));
    ds.addRow(new Array("31","JUNHO/2024"));
    ds.addRow(new Array("32","JULHO/2024"));
    ds.addRow(new Array("33","AGOSTO/2024"));
    ds.addRow(new Array("34","SETEMBRO/2024"));
    ds.addRow(new Array("35","OUTUBRO/2024"));
    ds.addRow(new Array("36","NOVEMBRO/2024"));
    ds.addRow(new Array("37","DEZEMBRO/2024"));
    
    
    return ds;

}
function onMobileSync(user) {

}