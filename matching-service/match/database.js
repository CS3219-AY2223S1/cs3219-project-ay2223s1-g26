import { Sequelize, Model, DataTypes} from "sequelize";
import { getTime } from './time.js'
import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') { 
    config(); 
} 

const user = process.env.AWS_DB_USER;
const host = process.env.AWS_DB_ENDPOINT;
const database = process.env.AWS_DB;
const password = process.env.AWS_DB_PASSWORD;
const port = process.env.AWS_DB_PORT;

console.log(user);
const sequelize = connectPostgres();

export class Sockets extends Model {
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

function initSocketsModel(sequelize) {
    Sockets.init({
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'sockets',
        freezeTableName: true,
        timestamps: false
    })
}

export async function readSocketsQuery() {
    initSocketsModel(sequelize);
    const sockets = await Sockets.findAll();
    return sockets; 
}

export async function readSocketsByUuidQuery(uuidField) {
    initSocketsModel(sequelize);
    const socket = await Sockets.findOne({ 
        where: {
            uuid: uuidField
        }
    });
    return socket;
}

export async function insertSocketsQuery(socketId, uuidField) {
    initSocketsModel(sequelize);
    const socket = await Sockets.findOne({ 
        where: {
            uuid: uuidField
        }
    })
    if (socket == null) {
        try {
            const socket = await Sockets.create({id: socketId, uuid: uuidField});
            return socket;
        } catch (SequelizeUniqueConstraintError) {
            return null;
        }
    } else {
        try {
            await Sockets.update(
                { id: socketId, uuid: uuidField}, 
                { where: 
                    {
                        id: socket.id
                    }
                });
            const updatedSocket = await Sockets.readSocketsByUuidQuery(uuidField);
            return updatedSocket;
        } catch (SequelizeUniqueConstraintError) {
            return null;
        }
    }
}

export async function deleteSocketsQuery(socketId) {
    initSocketsModel(sequelize);
    const socket = await Sockets.findByPk(socketId);
    if (socket == null) {
        return null;
    }
    await socket.destroy({
        where: {
            id: socketId
        }
    })
    return socket;
}

export async function deleteSocketsByUuidQuery(uuidField) {
    initSocketsModel(sequelize);
    await Sockets.destroy({
        where: {
            uuid: uuidField
        }
    });
}

export class Waiting extends Model {
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
    initWaitingModel(sequelize);
    const waitingUsers = await Waiting.findAll();
    return waitingUsers;
}

export async function readWaitingQuery(difficultyField) {
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
    console.log(partnerUuid);
    const partner = await deleteWaitingQuery(partnerUuid);
    if (partner == null) {
        return null;
    }
    return [uuidField, partnerUuid];
}