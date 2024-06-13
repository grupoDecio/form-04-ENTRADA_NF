function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
 var ds = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
    
    		    			


	
	ds.addRow(new Array("01","AUTOSYSTEM"));
	ds.addRow(new Array("02","NOVO TAC"));
	ds.addRow(new Array("03","TEF"));
	ds.addRow(new Array("04","BIG LINX"));
	ds.addRow(new Array("05","FARMASYS"));
	ds.addRow(new Array("06","TACHUNGRY/CATRACAS"));
	ds.addRow(new Array("07","MSYS"));
	ds.addRow(new Array("08","SENIOR"));
	ds.addRow(new Array("09","FLUIG"));
	ds.addRow(new Array("10","PROTHEUS"));
	ds.addRow(new Array("11","APP"));
	ds.addRow(new Array("12","VEXPENSES"));
	ds.addRow(new Array("12","OUTROS"));
	
	return ds;
}
function onMobileSync(user) {

}