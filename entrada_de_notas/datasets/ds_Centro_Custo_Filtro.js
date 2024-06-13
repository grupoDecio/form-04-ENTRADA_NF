function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
	ds.addColumn("ID");
    ds.addColumn("Nome");
    ds.addColumn("CNPJ");

    log.info("constraints_015");
    log.dir(constraints);
    
    //criar constraints
    if(constraints != null && constraints.length){
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "CNPJ") { 
                cnpj = constraints[i].initialValue.toString(); 
            }
        }    
    }

    log,info('ds_centro_custo_filtro_026')
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("CNPJ", true, true, ConstraintType.MUST);
    var constraints = new Array(cst);

    var datasetPrincipal = DatasetFactory.getDataset("ds_Centro_Custo", null, null, null);
    
    return datasetPrincipal; }
    
function onMobileSync(user) {

}