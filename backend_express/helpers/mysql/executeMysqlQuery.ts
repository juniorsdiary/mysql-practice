import { getOrCreateMysqlConnection } from "../../connections/mysql";

const executeMysqlQuery = async (q: string, values: any[]) => {
    const pool = await getOrCreateMysqlConnection();

    const data = await pool?.execute(q, values);

    if (data) return JSON.parse(JSON.stringify(data[0]));
}

export { executeMysqlQuery }