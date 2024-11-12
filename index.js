const express = require('express');
const bodyParser = require('body-parser');
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const app = express();
const port = 3004;

// Azure Key Vault setup
const credential = new DefaultAzureCredential();
const client = new SecretClient(`https://na-s.vault.azure.net/`, credential);

app.use(bodyParser.json());

app.get("/api/ping", (req, res) => {
    res.send("Vault Api")
    });
app.get('/get-secrets', async (req, res) => {
    // Check if the 'names' query parameter is provided
    if (!req.query.names) {
        return res.status(400).send('Missing query parameter: names. Please provide a comma-separated list of secret names.');
    }

    const secretNames = req.query.names.split(','); // Expecting names as a comma-separated list
    const secrets = {};

    for (const name of secretNames) {
        try {
            const secret = await client.getSecret(name);
            secrets[name] = secret.value;
        } catch (error) {
            console.error(`Failed to get secret ${name}:`, error.message);
            secrets[name] = null; // or handle differently if needed
        }
    }

    res.status(200).json(secrets);
});


// POST endpoint to set a secret
app.post('/set-secret', async (req, res) => {
    const { secretName, secretValue } = req.body;

    if (!secretName || !secretValue) {
        return res.status(400).send('Please provide both secretName and secretValue.');
    }

    try {
        await client.setSecret(secretName, secretValue);
        res.status(200).send(`Secret ${secretName} set successfully.`);
    } catch (error) {
        console.error(`Failed to set secret ${secretName}:`, error.message);
        res.status(500).send(`Failed to set secret: ${error.message}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});