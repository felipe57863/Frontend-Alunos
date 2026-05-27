const os = require('os');
const { spawn } = require('child_process');

const PORT = 4200;

function isPrivateIPv4(ip) {
  return (
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)
  );
}

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  const candidates = [];

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      const isIPv4 = net.family === 'IPv4' || net.family === 4;

      if (isIPv4 && !net.internal) {
        candidates.push({
          name,
          address: net.address,
        });
      }
    }
  }

  const privateIp = candidates.find((item) => isPrivateIPv4(item.address));

  if (privateIp) {
    return privateIp.address;
  }

  return candidates[0]?.address || 'localhost';
}

const ip = getLocalIp();

console.log('\nAGRUPA iniciado para acesso em rede local:');
console.log(`Local: http://localhost:${PORT}`);
console.log(`Rede:  http://${ip}:${PORT}`);
console.log('\nUse o endereço de rede para gerar QR Code acessível pelo celular.\n');

const ng = spawn(
  'npx',
  ['ng', 'serve', '--host', '0.0.0.0', '--port', String(PORT)],
  { stdio: 'inherit', shell: true }
);

ng.on('close', (code) => process.exit(code));
