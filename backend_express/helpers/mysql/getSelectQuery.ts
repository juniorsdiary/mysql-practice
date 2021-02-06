const getSelectQuery = (tableName: string, key: string) => {
    return `SELECT * FROM ${tableName} where \`${key}\`= ?`
}

export { getSelectQuery };