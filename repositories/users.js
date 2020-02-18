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
        const contents = await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        });
        // Parse it
        const data = JSON.parse(contents);
        // Return Parse data

        return data; 
    }
}

const test = async () => {

    const repo = new UserRepository('users.json');
    const users = await repo.getAll();
    console.log(users);
}

test();