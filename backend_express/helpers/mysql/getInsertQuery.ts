const getInsertQuery = (table: string, data: { [key: string]: any }): string => {
    const keys = Object.keys(data).join(', ');

    const values = Object.keys(data).map(() => `?`).join(', ');

    return `INSERT INTO \`${table}\` (${keys}) values (${values})`;
}

export { getInsertQuery }