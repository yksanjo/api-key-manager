# API Key Manager

Simplified API key manager with minimal commands.

## Installation

```bash
cd api-key-manager
npm install
```

## Usage

```bash
# Add a key
npm start -- add -n "My Key" -k "api-key-value"

# List keys
npm start -- list

# Get a key
npm start -- get <id>

# Delete a key
npm start -- del <id>

# Generate a key
npm start -- gen
```

## Commands

| Command | Description |
|---------|-------------|
| `apik add` | Add API key |
| `apik list` | List keys |
| `apik get <id>` | Get key |
| `apik del <id>` | Delete key |
| `apik gen` | Generate key |

## License

MIT
