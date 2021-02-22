import { BuildSelectQueryArgsType } from '../../types';

const buildSelectEntityQuery = ({ tableName, skip, limit, order, orderBy }: BuildSelectQueryArgsType): string => {
    const baseQuery = `SELECT * FROM ${tableName}`;

    const orderQuery = order && orderBy ? `${baseQuery} ORDER BY ${orderBy} ${order.toUpperCase()}` : baseQuery;

    return skip && limit ? `${orderQuery} LIMIT ${limit} OFFSET ${skip}` : orderQuery;
};

export {
    buildSelectEntityQuery,
};