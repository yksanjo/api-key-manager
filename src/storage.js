/**
 * Simple Storage - Minimal JSON-based storage
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class SimpleStorage {
  constructor(filePath = null) {
    this.filePath = filePath || path.join(process.cwd(), '.apik', 'keys.json');
    this.data = { keys: [] };
    this.load();
  }

  load() {
    if (fs.existsSync(this.filePath)) {
      try {
        this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
      } catch (e) {
        this.data = { keys: [] };
      }
    }
  }

  save() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  add(key) {
    const id = crypto.randomBytes(8).toString('hex');
    this.data.keys.push({
      id,
      name: key.name,
      value: key.value,
      service: key.service || 'default',
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  get(id) {
    return this.data.keys.find(k => k.id === id);
  }

  list() {
    return this.data.keys.map(k => ({ ...k, value: undefined }));
  }

  delete(id) {
    const index = this.data.keys.findIndex(k => k.id === id);
    if (index > -1) {
      this.data.keys.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }
}

module.exports = SimpleStorage;
