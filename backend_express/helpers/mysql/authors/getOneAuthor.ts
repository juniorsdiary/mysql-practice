import { executeMysqlQuery } from '../executeMysqlQuery';
import { AUTHORS_TABLE_NAME } from '../../../const/TABLES';
import { AuthorType } from '../../../types';

const getOneAuthor = async (id: string): Promise<AuthorType[]> => {
    return await executeMysqlQuery(`SELECT * FROM ${AUTHORS_TABLE_NAME} where author_id= ?`, [id]);
};

export {
    getOneAuthor,
}