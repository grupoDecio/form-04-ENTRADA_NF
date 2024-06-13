function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");

	ds.addRow(new Array('01-0101001','0101001 - POSTO ITUIUTABA'));
    ds.addRow(new Array('01-0101002','0101002 - POSTO PARADA BONITA'));
    ds.addRow(new Array('01-0101003','0101003 - POSTO BURITI'));
    ds.addRow(new Array('01-0101004','0101004 - POSTO ARAPORA'));
    ds.addRow(new Array('01-0101005','0101005 - POSTO CAMPINA VERDE'));
    ds.addRow(new Array('01-0101006','0101006 - POSTO UBERLANDIA'));
    ds.addRow(new Array('01-0101007','0101007 - POSTO RIO VERDE'));
    ds.addRow(new Array('01-0101008','0101008 - POSTO CENTRALINA'));
    ds.addRow(new Array('01-0101009','0101009 - POSTO OLHOS DA AGUA'));
    ds.addRow(new Array('01-0101010','0101010 - POSTO MINEIROS'));
    ds.addRow(new Array('01-0101011','0101011 - POSTO BARREIRAS'));
    ds.addRow(new Array('01-0101012','0101012 - POSTO PRESIDENTE VENCESLAU'));
    ds.addRow(new Array('01-0102001','0102001 - RESTAURANTE ITUIUTABA'));
    ds.addRow(new Array('01-0102002','0102002 - RESTAURANTE PARADA BONITA'));
    ds.addRow(new Array('01-0102003','0102003 - RESTAURANTE BURITI'));
    ds.addRow(new Array('01-0102004','0102004 - RESTAURANTE ARAPORA'));
    ds.addRow(new Array('01-0102005','0102005 - RESTAURANTE CAMPINA VERDE'));
    ds.addRow(new Array('01-0102006','0102006 - RESTAURANTE UBERLANDIA'));
    ds.addRow(new Array('01-0102007','0102007 - RESTAURANTE RIO VERDE'));
    ds.addRow(new Array('01-0102008','0102008 - RESTAURANTE CENTRALINA'));
    ds.addRow(new Array('01-0102009','0102009 - RESTAURANTE OLHOS DA AGUA'));
    ds.addRow(new Array('01-0102010','0102010 - RESTAURANTE MINEIROS'));
    ds.addRow(new Array('01-0102011','0102011 - RESTAURANTE BARREIRAS'));
    ds.addRow(new Array('01-0102012','0102012 - RESTAURANTE PRESIDENTE VENCESLAU'));
    ds.addRow(new Array('01-0103001','0103001 - ACESSORIOS ITUIUTABA'));
    ds.addRow(new Array('01-0103002','0103002 - ACESSORIOS PARADA BONITA'));
    ds.addRow(new Array('01-0103003','0103003 - ACESSORIOS BURITI'));
    ds.addRow(new Array('01-0103004','0103004 - ACESSORIOS ARAPORA'));
    ds.addRow(new Array('01-0103005','0103005 - ACESSORIOS CAMPINA VERDE'));
    ds.addRow(new Array('01-0103006','0103006 - ACESSORIOS UBERLANDIA'));
    ds.addRow(new Array('01-0103007','0103007 - ACESSORIOS RIO VERDE'));
    ds.addRow(new Array('01-0103008','0103008 - ACESSORIOS CENTRALINA'));
    ds.addRow(new Array('01-0103009','0103009 - ACESSORIOS OLHOS DA AGUA'));
    ds.addRow(new Array('01-0103010','0103010 - ACESSORIOS MINEIROS'));
    ds.addRow(new Array('01-0103011','0103011 - ACESSORIOS BARREIRAS'));
    ds.addRow(new Array('01-0103012','0103012 - ACESSORIOS PRESIDENTE VENCESLAU'));
    ds.addRow(new Array('01-0104001','0104001 - CONVENIENCIA ITUIUTABA'));
    ds.addRow(new Array('01-0104002','0104002 - CONVENIENCIA PARADA BONITA'));
    ds.addRow(new Array('01-0104003','0104003 - CONVENIENCIA BURITI'));
    ds.addRow(new Array('01-0104004','0104004 - CONVENIENCIA ARAPORA'));
    ds.addRow(new Array('01-0104005','0104005 - CONVENIENCIA CAMPINA VERDE'));
    ds.addRow(new Array('01-0104006','0104006 - CONVENIENCIA UBERLANDIA'));
    ds.addRow(new Array('01-0104007','0104007 - CONVENIENCIA RIO VERDE'));
    ds.addRow(new Array('01-0104008','0104008 - CONVENIENCIA CENTRALINA'));
    ds.addRow(new Array('01-0104009','0104009 - CONVENIENCIA OLHOS DA AGUA'));
    ds.addRow(new Array('01-0104010','0104010 - CONVENIENCIA MINEIROS'));
    ds.addRow(new Array('01-0104012','0104012 - CONVENIENCIA PRESIDENTE VENCESLAU'));
    ds.addRow(new Array('01-0105006','0105006 - VARIEDADES UBERLANDIA'));
    ds.addRow(new Array('01-0105008','0105008 - VARIEDADES CENTRALINA'));
    ds.addRow(new Array('01-0106001','0106001 - HOTEL BURITI'));
    ds.addRow(new Array('01-0301001','0301001 - POSTO GURUPI'));
    ds.addRow(new Array('01-0302001','0302001 - RESTAURANTE GURUPI'));
    ds.addRow(new Array('01-0303001','0303001 - ACESSORIOS GURUPI'));
    ds.addRow(new Array('01-0304001','0304001 - CONVENIENCIA GURUPI'));
    ds.addRow(new Array('01-0305001','0305001 - VARIEDADES GURUPI'));
    ds.addRow(new Array('02-0101001','0101001 - TRR UBERLANDIA'));
    ds.addRow(new Array('02-0101002','0101002 - TRR ITUMBIARA'));
    ds.addRow(new Array('02-0101003','0101003 - TRR RIO VERDE'));
    ds.addRow(new Array('02-0101004','0101004 - TRR ITUMBIARA 2'));
    ds.addRow(new Array('02-0101005','0101005 - TRR ITUIUTABA'));
    ds.addRow(new Array('02-0101006','0101006 - TRR PARADA BONITA'));
    ds.addRow(new Array('02-0201001','0201001 - TRR GURUPI'));
    ds.addRow(new Array('03-0101001','0101001 - LIDERPETRO UBERLANDIA'));
    ds.addRow(new Array('03-0101002','0101002 - LIDERPETRO SENADOR CANEDO'));
    ds.addRow(new Array('04-0101001','0101001 - LOCADORA UBERLANDIA'));
    ds.addRow(new Array('04-0101002','0101002 - LOCADORA ITUIUTABA'));
    ds.addRow(new Array('04-0101003','0101003 - LOCADORA ARAPORA'));
    ds.addRow(new Array('04-0101004','0101004 - LOCADORA ITUMBIARA'));
    ds.addRow(new Array('04-0101005','0101005 - LOCADORA RIO VERDE'));
    ds.addRow(new Array('05-0101001','0101001 - MANUTENCAO E INSTALACAO UBERLANDIA'));
    ds.addRow(new Array('06-0101001','0101001 - COMUNICAO E MARKETING ITUIUTABA'));
    ds.addRow(new Array('06-0101002','0101002 - COMUNICAO E MARKETING UBERLANDIA'));
    ds.addRow(new Array('07-0101001','0101001 - DECIO IMOBILIARIA'));
    ds.addRow(new Array('08-0101001','0101001 - MACEDO DISTRIBUIDORA LTDA ITUIUTABA'));
    ds.addRow(new Array('08-0101002','0101002 - DECIO DISTRIBUIDORA RIO VERDE'));
    ds.addRow(new Array('09-0101001','0101001 - POSTO DECIO 5 - MATRIZ'));
    ds.addRow(new Array('09-0101002','0101002 - Posto Decio L2'));
    ds.addRow(new Array('09-0101003','0101003 - Posto Decio L6'));
    ds.addRow(new Array('09-0101004','0101004 - Posto Decio L5'));
    ds.addRow(new Array('09-0101005','0101005 - Posto Decio L7'));
    ds.addRow(new Array('09-0101006','0101006 - Posto Decio L3'));
    ds.addRow(new Array('09-0101007','0101007 - Posto Decio L14'));
    ds.addRow(new Array('09-0101008','0101008 - Posto Decio L4'));
    ds.addRow(new Array('09-0101009','0101009 - Posto Decio L17'));
    ds.addRow(new Array('09-0201001','0201001 - Posto Decio L13'));
    ds.addRow(new Array('09-0304001','0304001 - Bombocado - Decio 5'));
    ds.addRow(new Array('09-0304002','0304002 - Bombocado - Decio L2'));
    ds.addRow(new Array('09-0304003','0304003 - Bombocado - Decio L6 - RVD'));
    ds.addRow(new Array('09-0304004','0304004 - Bombocado - Decio L5 - RVD'));
    ds.addRow(new Array('09-0304005','0304005 - Bombocado - Decio L7 - RVD'));
    ds.addRow(new Array('09-0304006','0304006 - Bombocado - Decio L3'));
    ds.addRow(new Array('09-0304007','0304007 - Bombocado - Decio L14 - RVD'));
    ds.addRow(new Array('09-0304008','0304008 - Bombocado - Decio L4'));
    ds.addRow(new Array('09-0304009','0304009 - Bombocado - Decio L17'));
    ds.addRow(new Array('09-0304010','0304010 - Bombocado - Decio L13 - RVD'));
    ds.addRow(new Array('09-0304011','0304011 - Panificadora Bombocado'));
    ds.addRow(new Array('09-0401001','0401001 - POSTO ALTO DA CIDADE'));
    ds.addRow(new Array('80-0101001','0101001 - DECIO HOLDING UBERLANDIA MATRIZ'));
    ds.addRow(new Array('80-0101002','0101002 - DECIO HOLDING UBERLANDIA FILIAL'));
	return ds;
}
function onMobileSync(user) {

}