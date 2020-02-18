const fs = require('fs');

class UserRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        try {
            false.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async getAll() {
        // Open the filename
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    }

    async create(attrs) {
        const records = await this.getAll();
        records.push(attrs);

        await fs.promises.writeFile(this.filename, JSON.stringify(records), {
            encoding: 'utf8'
        });
    }
}
const test = async () => {

    const repo = new UserRepository('users.json');

    await repo.create({ email: 'test@test.com', password: 'blah' })

    const users = await repo.getAll();

    console.log(users);
}

test();