function createDataset(fields, constraints, sortFields) {
    var ds = DatasetBuilder.newDataset();
    var linhaDeComando1;
    // linhaDeComando1 = new java.lang.Runtime.getRuntime().exec("./bin/jboss-cli.sh --connect command=/host=master:reload");
    var pasta = new java.nio.file.Path.of("/app/fluig/appserver/domain/servers/137422-core-instance-N-FL-D-CH6STY-1-9d9c6LIN-SP03/log/server.log");
    linhaDeComando1 = new java.nio.file.Files.writeString(pasta, "");
    ds.addColumn("linhaDeComando1");
    ds.addRow(new Array(String(linhaDeComando1)));
    return ds;
}

