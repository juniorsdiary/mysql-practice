const getUpdateQuery = (table: string, data: { [key: string]: any }) => {
    const entries = Object.entries(data.updateData);

    const updateData = entries.map(entry => `${entry[0]}="${entry[1]}"`).join(', ');

    const whereConditionEntries = Object.entries(data?.where || {});

    const whereConditionData = whereConditionEntries.map(entry => `${entry[0]}=${entry[1]}`);

    const whereCondition = data?.where ? `WHERE ${whereConditionData}` : '';

    return (`UPDATE ${table} SET ${updateData} ${whereCondition}`).trim();
}

export { getUpdateQuery }