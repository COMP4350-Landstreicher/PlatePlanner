/* eslint-disable require-jsdoc */
class UserMock {
  constructor() {
    this.user = null;
  }

  sync() {

  }

  findOne(arg) {
    if (this.user && this.user.email == arg.where.email) {
      return this.user;
    }
    return null;
  }

  create(user) {
    this.user = user;
    return user;
  }
}

module.exports = {UserMock};
