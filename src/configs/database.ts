import databaseConnection from './databaseConnection';

const DB = databaseConnection.postgresDb;


class DatabaseQueryRunner {
    static transaction = (query: string, data: object | []) => {
      console.log({ query, data });
      return DB.any(query, data);
    }

    static singleTransaction = (query: string, data: object | []) => {
      return DB.oneOrNone(query, data);
    }

    static batchTransaction = (transaction: []) => DB.tx((t) => {
      const data = transaction.map((el) => {
        const {query, payload} = el;
        return t.any(query, payload);
      });
      return t.batch(data);
    });
}

export default DatabaseQueryRunner;
