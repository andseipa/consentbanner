'use strict';

const UuidIdentity = require('./UuidIdentity');
const StoredIdentity = require('./StoredIdentity');
const StaticIdentity = require('./StaticIdentity');

class User {
    constructor(identity) {
        this._identity = identity;
        this._attributes = {};
    }

    static createDefault() {
        return new User(new StoredIdentity(new UuidIdentity()));
    }

    get identity() {
        return this._identity;
    }

    get attributes() {
        return this._attributes;
    }

    set attributes(attributes) {
        this._attributes = attributes;

        return this;
    }

    addAttribute(name, value) {
        this._attributes[name] = value;

        return this;
    }

    withIdentity(identity) {
        const user = new User(identity);
        user.attributes = this.attributes;

        return user;
    }

    withStaticIdentity(id) {
        try {
            return this.withIdentity(new StaticIdentity(id));
        } catch (e) {
            console.warn(e + ' Previous identity strategy will be used.');
        }

        return this;
    }
}

module.exports = User;
