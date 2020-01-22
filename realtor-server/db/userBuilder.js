class UserBuilder {
    constructor() {
        this.query = 'where 1',
        this.params = []
    }
    byId(id) {
        if (id) {
            this.query += ' and id = ?';
            this.params.push(id);
        }
        return this
    }
    byRoleId(roleId) {
        if (roleId) {
            this.query += ' and role_id = ?';
            this.params.push(roleId)
        };
        return this
    }
    byFirstName(firstName) {
        if (firstName) {
            this.query += ' and first_name = ?';
            this.params.push(firstName)
        };
        return this
    }
    byLastName(lastName) {
        if (lastName) {
            this.query += ' and last_name = ?';
            this.params.push(lastName)
        };
        return this
    }
    byEmail(email) {
        if (email) {
            this.query += ' and email = ?';
            this.params.push(email)
        };
        return this
    }
    byPhone(phone) {
        if (phone) {
            this.query += ' and phone = ?';
            this.params.push(phone)
        };
        return this
    }
    byStatus(status) {
        if (status) {
            this.query += ' and status = ?';
            this.params.push(status)
        };
        return this
    }
    build() {
        return {
            query: this.query, 
            params: this.params
        }
    }
}

module.exports = {
    UserBuilder
}