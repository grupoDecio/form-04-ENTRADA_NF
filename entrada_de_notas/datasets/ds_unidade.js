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

    ds.addRow(new Array("2","Drogaria Campina Verde"));
    ds.addRow(new Array("3","Drogaria Centralina"));
    ds.addRow(new Array("4","Drogaria Ituiutaba L2"));
    ds.addRow(new Array("5","Drogaria Ituiutaba Centro")); 
    ds.addRow(new Array("6","Drogaria Ituiutaba L4"));
    ds.addRow(new Array("7","Drogaria Monte Carmelo"));
    ds.addRow(new Array("8","Drogaria Rio Verde"));
    ds.addRow(new Array("9","Central Administrativa"));
    ds.addRow(new Array("10","Bulk Fit 3 UFU Uberlandia"));
    ds.addRow(new Array("11","Conveniencia Arapora")); 
    ds.addRow(new Array("12","Variedades Centralina")); 
    ds.addRow(new Array("13","Posto Ituiutaba")); 
    ds.addRow(new Array("14","Posto Parada Bonita")); 
    ds.addRow(new Array("15","Restaurante Parada Bonita")); 
    ds.addRow(new Array("16","Peças Parada Bonita"));
    ds.addRow(new Array("17","Posto Arapora"));
    ds.addRow(new Array("18","Restaurante Arapora")); 
    ds.addRow(new Array("19","Peças Arapora"));
    ds.addRow(new Array("20","Posto Buriti"));
    ds.addRow(new Array("21","Restaurante Buriti")); 
    ds.addRow(new Array("22","Peças Buriti"));
    ds.addRow(new Array("23","Posto Decio Uberlandia")); 
    ds.addRow(new Array("24","Restaurante Decio Uberlandia")); 
    ds.addRow(new Array("25","Peças Decio Uberlandia"));
    ds.addRow(new Array("26","Posto Rio Verde"));
    ds.addRow(new Array("27","Restaurante Rio Verde")); 
    ds.addRow(new Array("28","Peças Rio Verde"));
    ds.addRow(new Array("29","Restaurante Ituiutaba")); 
    ds.addRow(new Array("30","Posto Campina Verde"));
    ds.addRow(new Array("31","Restaurante Campina Verde")); 
    ds.addRow(new Array("32","Peças Campina Verde"));
    ds.addRow(new Array("33","Posto Centralina"));
    ds.addRow(new Array("34","Restaurante Centralina")); 
    ds.addRow(new Array("35","Peças Centralina"));
    ds.addRow(new Array("36","Posto Olhos D Agua")); 
    ds.addRow(new Array("37","Peças Ituiutaba")); 
    ds.addRow(new Array("38","Obra Posto Buriti"));
    ds.addRow(new Array("39","Obra Posto Campina Verde"));
    ds.addRow(new Array("40","Obra Centralina"));
    ds.addRow(new Array("41","Obra Olhos D Agua"));
    ds.addRow(new Array("42","Restaurante Olhos D Agua")); 
    ds.addRow(new Array("43","Peças Olhos D Agua"));
    ds.addRow(new Array("44","BR Mania Olhos D agua"));
    ds.addRow(new Array("45","Conveniencia Buriti"));
    ds.addRow(new Array("46","Conveniencia Decio Uberlandia"));
    ds.addRow(new Array("47","Marketing"));
    ds.addRow(new Array("48","Decio Racing")); 
    ds.addRow(new Array("49","Decio Manutencao"));
    ds.addRow(new Array("50","Variedades Rio Verde"));
    ds.addRow(new Array("51","Conveniencia Rio Verde"));
    ds.addRow(new Array("52","Conveniencia Buriti")); 
    ds.addRow(new Array("53","Variedades Decio Uberlandia"));
    ds.addRow(new Array("54","Rodo Decio Matriz")); 
    ds.addRow(new Array("55","Rodo Decio Filial")); 
    ds.addRow(new Array("56","Liderpetro Uberlandia")); 
    ds.addRow(new Array("57","Liderpetro Senador Canedo"));
    ds.addRow(new Array("58","TRR Uberlandia"));
    ds.addRow(new Array("59","TRR Itumbiara"));
    ds.addRow(new Array("60","TRR Rio Verde"));
    ds.addRow(new Array("61","TRR Itumbiara Nova Filial"));
    ds.addRow(new Array("62","TRR Itumbiara Obra"));
    ds.addRow(new Array("63","TRR Ituiutaba"));
    ds.addRow(new Array("64","Villa 13 Doceria"));
    ds.addRow(new Array("65","Posto 5"));
    ds.addRow(new Array("66","Posto L2"));
    ds.addRow(new Array("67","Posto L3"));
    ds.addRow(new Array("68","Posto L4"));
    ds.addRow(new Array("69","Posto L5"));
    ds.addRow(new Array("70","Posto L6"));
    ds.addRow(new Array("71","Posto L7"));
    ds.addRow(new Array("72","Posto L14"));
    ds.addRow(new Array("73","Posto L13"));
    ds.addRow(new Array("74","Conveniencia Posto 5"));
    ds.addRow(new Array("75","Conveniencia L2"));
    ds.addRow(new Array("76","Conveniencia L3"));
    ds.addRow(new Array("77","Conveniencia L4"));
    ds.addRow(new Array("78","Conveniencia L5"));
    ds.addRow(new Array("79","Conveniencia L6"));
    ds.addRow(new Array("80","Conveniencia L7"));
    ds.addRow(new Array("81","Conveniencia Brisa"));
    ds.addRow(new Array("82","Drogaria 050"));
    ds.addRow(new Array("83","Conveniencia L13")); 
    ds.addRow(new Array("84","Conveniencia L14"));
    ds.addRow(new Array("85","Bulk Fit 1 Ituiutaba"));
    ds.addRow(new Array("86","Decio Imobiliaria"));
    ds.addRow(new Array("87","Posto Alto Da Cidade")); 
    ds.addRow(new Array("88","Conveniencia Posto Alto"));
    ds.addRow(new Array("89","Bulk Fit 2  Ituiutaba"));
    ds.addRow(new Array("90","Posto Gurupi"));
    ds.addRow(new Array("91","Restaurante Gurupi")); 
    ds.addRow(new Array("92","Peças Gurupi"));
    ds.addRow(new Array("93","Conveniencia Gurupi"));
    ds.addRow(new Array("94","Drogaria Gurupi"));
    ds.addRow(new Array("95","Macedo Distribuidora Ituiutaba"));
    ds.addRow(new Array("96","Macedo Distribuidora Itumbiara"));
    ds.addRow(new Array("97","Decio Locadora Uberlandia"));
    ds.addRow(new Array("98","Decio Locadora Ituiutaba"));
    ds.addRow(new Array("99","Decio Locadora Arapora"));
    ds.addRow(new Array("100","Decio Locadora Itumbiara"));
    ds.addRow(new Array("101","Decio Locadora Rio Verde"));
    ds.addRow(new Array("102","Decio TRR Gurupi"));
    ds.addRow(new Array("103","Obra TRR Gurupi"));
    ds.addRow(new Array("104","Bulk Fit 5 Martins Uberlandia"));
    ds.addRow(new Array("105","Bulk Fit 4 Pampulha Uberlandia"));
    ds.addRow(new Array("106","Transl Gurupi"));
    ds.addRow(new Array("107","Decio Holding"));


	return ds;
}
function onMobileSync(user) {

}