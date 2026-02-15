require('dotenv').config();

const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sql = require('mssql');
const app = express();

// Enable CORS if frontend is on a different port/domain
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const config = {
    server: process.env.DB_SERVER,       // e.g., 'localhost' or '192.168.1.100'
    database: process.env.DB_DATABASE,   // Database name
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,// SQL Server username
    options: {
        encrypt: true,           // Use encryption (required for Azure SQL)
        trustServerCertificate: true // For local dev/self-signed certs
    },
    pool: {
        max: 10,                  // Max number of connections
        min: 0,                   // Min number of connections
        idleTimeoutMillis: 30000  // Close idle connections after 30s
    }
};

//Product Type service
// DB interaction
app.get('/productType', async (req, res) => {
    const { product = "" } = req.query;
    let responseSend = await connectAndQuery(product);

    res.json(
        responseSend);
});


// Download file
app.get('/downloadProduct', async (req, res) => {
    const { productDetails = "" } = req.query;
    const downloadFilePath = await connectString(productDetails);
    console.log(downloadFilePath);
     fs.access(downloadFilePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send('File not found.');
            }

            // Send file to client
            res.sendFile(downloadFilePath, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).send('Error sending file.');
                } else {
                    console.log('File sent successfully.');
                }
            });
        });
});

app.post('/checkoutProduct', (req, res) => {
    const { productName } = req.body; // Extract data from the request body
    console.log(req.body);
    res.json({ 'message': `${productName} sent for submit` }); // Send response
});

async function connectString(fileName) {
    try {
        // Get connection string from environment variable
        const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

        if (!AZURE_STORAGE_CONNECTION_STRING) {
            throw new Error("Azure Storage connection string not found. Set AZURE_STORAGE_CONNECTION_STRING in your environment.");
        }

        // Create BlobServiceClient from connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

        console.log("✅ Connected to Azure Blob Storage");
        
        // Example: List all containers
        const containerName = process.env.CONTAINER_AZURE; // Change to your container name
        const blobName = `${fileName}.png`;
        console.log(blobName);
        console.log(containerName);
        const downloadFilePath = path.join(__dirname, "downloaded-" + blobName);

        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);
        console.log(`Downloading blob "${blobName}" from container "${containerName}"...`);
        await blobClient.downloadToFile(downloadFilePath);
        console.log(`✅ Download complete. File saved to: ${downloadFilePath}`);
       return downloadFilePath;

    } catch (err) {
        console.error("❌ Error connecting to Azure Blob Storage:", err.message);
        return '';
    }
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});


// Async function to connect and run a query
async function connectAndQuery(typeProduct) {
    let resultSet = [];
    try {
        // Connect to SQL Server
        let pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        // Example query
        let result = await pool.request()
            .input('typeProduct', sql.VarChar, typeProduct) // Parameterized query to prevent SQL injection
            .query('SELECT * FROM INVENTORY_APP WHERE typeProduct = @typeProduct');

        console.log('Query Result:', result.recordset);
        resultSet = result.recordset;

    } catch (err) {
        resultSet = ProductData.filter(x => x.type === productId).map(data => ({
            ...data,
            fileId: ProductData.indexOf(data)
        }));
        console.error('SQL error:', err.message);
    } finally {
        // Close the connection pool
        await sql.close();
        return resultSet;
    }
}







//All of this needs to come from data base
const ProductData = [
]