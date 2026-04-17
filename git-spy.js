const fs = require('fs');
const { execSync } = require('child_process');

try {
  const result = execSync('git ls-files', { encoding: 'utf-8' });
  fs.writeFileSync('git-files.txt', result);
} catch (e) {
  fs.writeFileSync('git-files.txt', e.message);
}
