function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dsResult = DatasetBuilder.newDataset();
	dsResult.addColumn("result");
	
	var data = "24-12-2024";
	var isHoliday = false;

	try{
		var dsHoliday = DatasetFactory.getDataset("holiday", null, null, null);
		
		if ( dsHoliday.rowsCount > 0 ){
			for ( var i=0; i < dsHoliday.rowsCount; i++){
				if ( data == dsHoliday.getValue(i, "dayFormatted" ) ){
					isHoliday = true;
				}
			}
		}
		
		dsResult.addRow([ isHoliday ]);
		
	} catch(e){
		log.info( e.toString() );
	}
	
	return dsResult;

}function onMobileSync(user) {

}