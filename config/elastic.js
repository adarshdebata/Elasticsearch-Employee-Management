const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

if (!process.env.ELASTIC_CLOUD_ID || !process.env.ELASTIC_USERNAME || !process.env.ELASTIC_PASSWORD) {
    throw new Error('Please ensure ELASTIC_CLOUD_ID, ELASTIC_USERNAME, and ELASTIC_PASSWORD are set in the .env file');
}

const client = new Client({
    cloud: {
        id: process.env.ELASTIC_CLOUD_ID, // Cloud ID from Elastic Cloud deployment
    },
    auth: {
        username: process.env.ELASTIC_USERNAME, // Username for Elastic Cloud
        password: process.env.ELASTIC_PASSWORD, // Password for Elastic Cloud
    },
});

module.exports = client;
