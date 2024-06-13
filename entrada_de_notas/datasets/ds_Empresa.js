function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var ds = DatasetBuilder.newDataset();
    ds.addColumn("ID");
    ds.addColumn("Linha");
    ds.addColumn("Cod1");
    ds.addColumn("CNPJ");
    ds.addColumn("Nome");

    ds.addRow(new Array("1", "RODOVIARIO", "101001", "19046218000105", "POSTO ITUIUTABA"));
    ds.addRow(new Array("1", "RODOVIARIO", "101002", "19046218000962", "POSTO PARADA BONITA"));
    ds.addRow(new Array("1", "RODOVIARIO", "101003", "19046218001004", "POSTO BURITI"));
    ds.addRow(new Array("1", "RODOVIARIO", "101004", "19046218001187", "POSTO ARAPORA"));
    ds.addRow(new Array("1", "RODOVIARIO", "101005", "19046218001268", "POSTO CAMPINA VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "101006", "19046218001772", "POSTO UBERLANDIA"));
    ds.addRow(new Array("1", "RODOVIARIO", "101007", "19046218002159", "POSTO RIO VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "101008", "19046218002310", "POSTO CENTRALINA"));
    ds.addRow(new Array("1", "RODOVIARIO", "101009", "19046218002582", "POSTO OLHOS DA AGUA"));
    ds.addRow(new Array("1", "RODOVIARIO", "102001", "19046218000296", "RESTAURANTE ITUIUTABA"));
    ds.addRow(new Array("1", "RODOVIARIO", "102002", "19046218000709", "RESTAURANTE PARADA BONITA"));
    ds.addRow(new Array("1", "RODOVIARIO", "102003", "19046218000610", "RESTAURANTE BURITI"));
    ds.addRow(new Array("1", "RODOVIARIO", "102004", "19046218000881", "RESTAURANTE ARAPORA"));
    ds.addRow(new Array("1", "RODOVIARIO", "102005", "19046218001420", "RESTAURANTE CAMPINA VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "102006", "19046218001500", "RESTAURANTE UBERLANDIA"));
    ds.addRow(new Array("1", "RODOVIARIO", "102007", "19046218002078", "RESTAURANTE RIO VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "102008", "19046218002400", "RESTAURANTE CENTRALINA"));
    ds.addRow(new Array("1", "RODOVIARIO", "102009", "19046218002663", "RESTAURANTE OLHOS DA AGUA"));
    ds.addRow(new Array("1", "RODOVIARIO", "103001", "19046218000377", "AUTO PECAS ITUIUTABA"));
    ds.addRow(new Array("1", "RODOVIARIO", "103002", "19046218000458", "AUTO PECAS PARADA BONITA"));
    ds.addRow(new Array("1", "RODOVIARIO", "103003", "19046218000539", "AUTO PECAS BURITI"));
    ds.addRow(new Array("1", "RODOVIARIO", "103004", "19046218001349", "AUTO PECAS ARAPORA"));
    ds.addRow(new Array("1", "RODOVIARIO", "103005", "19046218001853", "AUTO PECAS CAMPINA VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "103006", "19046218001691", "AUTO PECAS UBERLANDIA"));
    ds.addRow(new Array("1", "RODOVIARIO", "103007", "19046218001934", "AUTO PECAS RIO VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "103008", "19046218002230", "AUTO PECAS CENTRALINA"));
    ds.addRow(new Array("1", "RODOVIARIO", "103009", "19046218002744", "AUTO PECAS OLHOS DA AGUA"));
    ds.addRow(new Array("1", "RODOVIARIO", "104001", "19046218003635", "CONVENIENCIA ITUIUTABA"));
    ds.addRow(new Array("1", "RODOVIARIO", "104002", "19046218003392", "CONVENIENCIA PARADA BONITA"));
    ds.addRow(new Array("1", "RODOVIARIO", "104003", "19046218003040", "CONVENIENCIA BURITI"));
    ds.addRow(new Array("1", "RODOVIARIO", "104004", "19046218003201", "CONVENIENCIA ARAPORA"));
    ds.addRow(new Array("1", "RODOVIARIO", "104005", "19046218003120", "CONVENIENCIA CAMPINA VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "104006", "19046218002906", "CONVENIENCIA UBERLANDIA"));
    ds.addRow(new Array("1", "RODOVIARIO", "104007", "19046218003473", "CONVENIENCIA RIO VERDE"));
    ds.addRow(new Array("1", "RODOVIARIO", "104008", "19046218003554", "CONVENIENCIA CENTRALINA"));
    ds.addRow(new Array("1", "RODOVIARIO", "104009", "19046218002825", "CONVENIENCIA OLHOS DA AGUA"));
    ds.addRow(new Array("1", "RODOVIARIO", "105001", "16812480000125", "BAZAR DA JU", "RVD"));
    ds.addRow(new Array("1", "RODOVIARIO", "105001", "19046218003716", "VARIEDADES CENTRALINA"));
    ds.addRow(new Array("1", "RODOVIARIO", "105002", "19046218003988", "VARIEDADES UBERLANDIA"));
    ds.addRow(new Array("1", "RODOVIARIO", "106001", "19046218003805", "HOTEL BURITI"));
    ds.addRow(new Array("1", "RODOVIARIO", "201001", "16812480000125", "BAZAR DA JU", "RVD"));
    ds.addRow(new Array("1", "RODOVIARIO", "301001", "6698533000175", "POSTO GURUPI"));
    ds.addRow(new Array("1", "RODOVIARIO", "302001", "", "RESTAURANTE GURUPI"));
    ds.addRow(new Array("1", "RODOVIARIO", "401001", "", "VARIEDADES DMS CONVENIENCIA"));


    ds.addRow(new Array("2", "TRR", "101001", "64429400000108", "TRR UBERLANDIA"));
    ds.addRow(new Array("2", "TRR", "101002", "64429400000280", "TRR ITUMBIARA"));
    ds.addRow(new Array("2", "TRR", "101003", "64429400000361", "TRR RIO VERDE"));
    ds.addRow(new Array("2", "TRR", "101004", "64429400000442", "TRR ITUMBIARA 2"));
    ds.addRow(new Array("2", "TRR", "101005", "64429400000523", "TRR ITUIUTABA"));
    ds.addRow(new Array("2", "TRR", "101006", "64429400000604", "TRR PARADA BONITA"));
    ds.addRow(new Array("2", "TRR", "201001", "26195088000138", "TRR GURUPI"));

    ds.addRow(new Array("3", "LIDERPETRO", "101001", "1083568000186", "LIDERPETRO UBERLANDIA"));
    ds.addRow(new Array("3", "LIDERPETRO", "101002", "1083568000348", "LIDERPETRO SENADOR CANEDO"));


    return ds;

} function onMobileSync(user) {

}