async function getUF() {
    const connection = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const convertedConnection = await connection.json();
    return convertedConnection;
}

async function getCity(UF) {
    const connection = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`);
    const convertedConnection = await connection.json();
    return convertedConnection;
}

export const connectApi = {
    getUF, getCity
}
