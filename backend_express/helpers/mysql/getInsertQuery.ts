const getInsertQuery = (table: string, data: { [key: string]: any }): string => {
    if (!data) return 'Pass data to insert';
    const keys = Object.keys(data).join(', ');

    const values = Object.keys(data).map(() => `?`).join(', ');

    return `INSERT INTO \`${table}\` (${keys}) values (${values})`;
}

export { getInsertQuery }