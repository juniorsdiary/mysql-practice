import { getOrCreateMysqlConnection } from "../../connections/mysql";

const executeMysqlQuery = async <T>(q: string, values: any[]): Promise<Array<T>> => {
    const pool = await getOrCreateMysqlConnection();

    const data = await pool?.execute(q, values);

    if (data) return JSON.parse(JSON.stringify(data[0]));
    return [];
}

export { executeMysqlQuery }