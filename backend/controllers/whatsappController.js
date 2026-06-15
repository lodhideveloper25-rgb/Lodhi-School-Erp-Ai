const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let client;
let qrCodeData = null;
let status = 'Disconnected';

const initializeWhatsApp = () => {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ['--no-sandbox'],
    }
  });

  client.on('qr', (qr) => {
    qrCodeData = qr;
    status = 'QR_READY';
    console.log('QR RECEIVED', qr);
  });

  client.on('ready', () => {
    status = 'Connected';
    qrCodeData = null;
    console.log('WhatsApp Client is ready!');
  });

  client.on('disconnected', () => {
    status = 'Disconnected';
    qrCodeData = null;
    console.log('WhatsApp Client disconnected');
  });

  client.initialize();
};

const getStatus = (req, res) => {
  res.json({ status, qr: qrCodeData });
};

const initWhatsApp = async (req, res) => {
  try {
    if (!client || status === 'Disconnected') {
      initializeWhatsApp();
      return res.json({ message: 'WhatsApp initialization started', status: 'Initializing' });
    }

    res.json({ message: 'WhatsApp already initialized', status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { number, message } = req.body;
  if (status !== 'Connected') {
    return res.status(400).json({ message: 'WhatsApp not connected' });
  }

  try {
    const formattedNumber = number.includes('@c.us') ? number : `${number}@c.us`;
    await client.sendMessage(formattedNumber, message);
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initializeWhatsApp,
  getStatus,
  initWhatsApp,
  sendMessage
};
