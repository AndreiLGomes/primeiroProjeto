// models/userModel.js
import { db } from '../config/db.js';

// 🔍 Buscar usuário pelo nome
export const encontrarPorNome = async (nome) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE nome = ?', [nome]);
    return rows;
};

// 📄 Listar todos os usuários
export const listarTodos = async () => {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
};

// ➕ Criar um novo usuário
export const criarUsuario = async ({ nome, email }) => {
    const [resultado] = await db.execute(
        'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
        [nome, email]
    );
    return resultado.insertId;
};

// ✏️ Atualizar um usuário
export const atualizarUsuario = async (id, { nome, email }) => {
    const [resultado] = await db.execute(
        'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
        [nome, email, id]
    );
    return resultado.affectedRows;
};

// ❌ Deletar um usuário
export const deletarUsuario = async (id) => {
    const [resultado] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return resultado.affectedRows;
};
