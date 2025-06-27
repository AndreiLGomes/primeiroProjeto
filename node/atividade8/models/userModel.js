import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'exemplo'
});

export const getAllUsers = (page = 1, limit = 10, callback) => {
    const offset = (page - 1) * limit;
    const query = 'SELECT * FROM usuarios LIMIT ? OFFSET ?';

    db.query(query, [parseInt(limit), parseInt(offset)], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};



export const createUser = (user, callback) => {
    const { nome, email, role } = user;
    const query = 'INSERT INTO usuarios (nome, email, role) VALUES (?, ?, ?)';
    db.query(query, [nome, email, role], (err, result) => {
        if (err) return callback(err);
        callback(null, { id: result.insertId, ...user });
    });
};


export const updateUserById = (id, user, callback) => {
    const { nome, email, role } = user;
    const query = 'UPDATE usuarios SET nome = ?, email = ?, role = ? WHERE id = ?';

    db.query(query, [nome, email, role, id], (err, result) => {
        if (err) return callback(err);
        callback(null, { id: parseInt(id), ...user });
    });
};


export const deleteUserById = (id, callback) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

export const getUsersByName = (nome, callback) => {
    const query = 'SELECT * FROM usuarios WHERE nome LIKE ?';
    const search = `%${nome}%`;
    db.query(query, [search], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};


