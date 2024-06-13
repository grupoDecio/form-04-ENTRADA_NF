function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

	/**
	 * @param {DATE} String formato "dd/mm/yyyy"
	 * @param {STATUS} String  indica se retorna próximo dia ou dia anterior opções "next" ou "previous"
	 * @return {string} data formatada "dd/mm/yyyy"
	*/

	var dateString = "25/12/2024";
	var statusgDate = "previous";
	
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("result");

	if (constraints) {
		for (var i = 0; i < constraints.length; i++) {
			dateString = String(constraints[i].fieldName).toUpperCase() == 'DATE' ? constraints[i].initialValue : dateString;
			statusgDate = String(constraints[i].fieldName).toUpperCase() == 'STATUS' ? constraints[i].initialValue : statusgDate;
		}
	}
	
	log.info( dateString );
	log.info( statusgDate );

	var date = new Date( dateString.split('/').reverse().join('/') );
	try {
		var workDate = getWorkDay(date, statusgDate);
		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
		ds.addRow([ sdf.format(workDate) ]);
	}catch (e){
		ds.addRow([ e.toString()]);
	}

	return ds;

}

function getWorkDay(date, statusgDate){

	if (isWorkDay(date) && !isHoliday(date)) {
        return date;
    }

	var nextDate = new Date(date);
	if ( statusgDate == 'next') nextDate.setDate(nextDate.getDate() + 1);
	if ( statusgDate == 'previous') nextDate.setDate(nextDate.getDate() - 1);
    
    /**
     * Loop até encontrar um dia útil que não seja feriado
    */
    while ( !isWorkDay(nextDate) || isHoliday(nextDate) ) {
//    	var days = 1;
//    	if ( isHoliday(nextDate) ) var days = 2;
    	if ( statusgDate == 'next') nextDate.setDate(nextDate.getDate() + 1);
    	if ( statusgDate == 'previous') nextDate.setDate(nextDate.getDate() - 1);
    }
    
    return nextDate;
}

function isWorkDay(date){
	var result = true;

	var workDay = date.getDay();
	
	/**
     * verifica se é dia útil
    */	
	if ( [0, 6].indexOf( workDay ) != -1 ){
		result = false;
	}

	return result;
}

function isHoliday(date){

//	var compositeDate = getCompositeDate(date);
	var sdfHoliday = new java.text.SimpleDateFormat("dd-MM-yyyy");	
	var result = false;
	
	var dsHoliday = DatasetFactory.getDataset("holiday", null, null, null);
	
	if ( dsHoliday.rowsCount > 0 ){
		for ( var i=0; i < dsHoliday.rowsCount; i++){
			if ( sdfHoliday.format(date) == dsHoliday.getValue(i, "dayFormatted" ) ){
				result = true;
			}
		}
	}
	
	return result;
}

function getCompositeDate(date){

	var day = date.getDate();
	var month = date.getMonth()+1;
	var year = date.getFullYear();

	var result = [
					day,
					month,
					year,
				];
	return result;
}

function onMobileSync(user) {

}