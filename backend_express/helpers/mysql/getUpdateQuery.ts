import { VALID_TABLES_ARRAY } from '../../const/TABLES';

const getUpdateQuery = (table: string, data: { [key: string]: any }) => {
    if (!VALID_TABLES_ARRAY.includes(table)) return 'Please pass valid table name';
    if (!data.updateData) return 'Invalid update data';

    const entries = Object.entries(data.updateData);

    const updateData = entries
        .filter(entry => entry[1])
        .map(entry => `${entry[0]}="${entry[1]}"`).join(', ');

    const whereConditionEntries = Object.entries(data?.where || {});

    const whereConditionData = whereConditionEntries
        .filter(entry => entry[1])
        .map(entry => `${entry[0]}=${entry[1]}`).join(', ');

    const whereCondition = whereConditionData ? `WHERE ${whereConditionData}` : '';

    return (`UPDATE ${table} SET ${updateData} ${whereCondition}`).trim();
}

export { getUpdateQuery }