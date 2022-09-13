import { Sequelize, Model, DataTypes} from "sequelize";
import { getTime } from './time.js'

const user = 'local';
const host = 'localhost';
const database = 'matchdb'
const password = 'local'
const port = '5432'

export class Waiting extends Model {
}

function connectPostgres() {
    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect:'postgres',
        logging: false
    })
    return sequelize;
}

function initWaitingModel(sequelize) {
    Waiting.init({
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull:false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'waiting',
        freezeTableName: true,
        timestamps: false
    })
}

export async function runQuery() {
    const sequelize = connectPostgres();
    initWaitingModel(sequelize);
    const waitingUsers = await Waiting.findAll();
    return waitingUsers;
}

export async function readWaitingQuery(difficultyField) {
    const sequelize = connectPostgres(); 
    initWaitingModel(sequelize);
    const waitingUsers = await Waiting.findAll({
        order: [['time', 'ASC']],
        where: {
            difficulty: difficultyField
        }
    });
    return waitingUsers;
}

export async function insertWaitingQuery(uuidField, difficultyField) {
    const sequelize = connectPostgres();
    initWaitingModel(sequelize);
    const timeField = getTime();
    const waitee = await Waiting.findByPk(uuidField);
    if (waitee == null) {
        const waitee = await Waiting.create({uuid: uuidField, difficulty: difficultyField, time: timeField});
        return waitee;
    }
    return null;
}

export async function deleteWaitingQuery(uuidField) {
    const sequelize = connectPostgres();
    initWaitingModel(sequelize);
    const waitee = await Waiting.findByPk(uuidField);
    if (waitee == null) {
        return null;
    } 
    await waitee.destroy({
        where: {
            uuid: uuidField
        }
    })
    return waitee;
}

export async function getMatchQuery(uuidField, difficultyField) {
    const waitingUsers = await readWaitingQuery(difficultyField);
    if (waitingUsers.length == 0) {
        const waitee = await insertWaitingQuery(uuidField, difficultyField);
        return null;
    }
    const partnerUuid = waitingUsers.at(0).getDataValue('uuid');
    const partner = await deleteWaitingQuery(partnerUuid);
    if (partner == null) {
        return null;
    }
    return [uuidField, partnerUuid];
}