const fs = require('fs');
const crypto = require('crypto');

class UserRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        };
    }
    async getAll() {
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        );
    }

    async create(attrs) {
        attrs.id = this.randomID();
        const records = await this.getAll();
        records.push(attrs);

        await this.writeAll(records);
    }
    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }
    randomID() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

}

const test = async () => {

    const repo = new UserRepository('users.json');
    await repo.create({ email: 'test@test.com', password: 'password' });

    const user = await repo.getOne('ce45a3f0');
    console.log(user);
}

test();