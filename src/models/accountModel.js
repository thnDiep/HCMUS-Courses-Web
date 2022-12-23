import db from "../utils/db.js";

export default {
  getAll() {
    return db("user");
  },

  async findById(id) {
    const list = await db('user').where('id', id);
    if (list.length === 0)
      return null;

    return list[0];
  },

  async findByUsername(name) {
    const list = await db('user').where('name', name);
    if (list.length === 0)
      return null;

    return list[0];
  },
  async findByEmail(email) {
    const list = await db('user').where('email', email);
    if (list.length === 0)
      return null;

    return list[0];
  },

  add(user) {
    return db('user').insert(user);
  },

  del(id) {
    return db('user').where('id', id).del();
  },

  
};