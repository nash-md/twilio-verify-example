const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

class Repository {
  constructor() {
    this.users = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'users.json'), 'utf8'));
  }

  async create(name, password) {
    this.users.push({ id: uuidv4(), name: name, password: bcrypt.hashSync(password, 10) });

    this.save();
  }

  async findUserByNameAndPassword(name, password) {
    const user = this.users.filter((user) => user.name === name)[0];

    if (!user) {
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return;
    }

    return user;
  }

  async findByName(name) {
    const user = this.users.filter((user) => user.name === name)[0];

    return user;
  }

  async findById(id) {
    const user = this.users.filter((user) => user.id === id)[0];

    return user;
  }

  async addPushVerification(id, factor) {
    const user = this.users.filter((user) => user.id === id)[0];

    if (!user) {
      return;
    }

    this.users = this.users.map((user) => (user.id === id ? { ...user, factor: factor } : user));

    await this.save();
  }

  async save() {
    fs.writeFileSync(
      path.join(process.cwd(), 'users.json'),
      JSON.stringify(this.users, 0, 3),
      'utf-8'
    );
  }
}

module.exports = Repository;
