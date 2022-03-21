class Auth {
  async login(email: string) {
    return { message: 'service fired', email };
  }
}

export default new Auth();
