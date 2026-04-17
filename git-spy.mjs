import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

try {
  const result = execSync('git ls-files', { encoding: 'utf-8' });
  writeFileSync('git-files.txt', result);
} catch (e) {
  writeFileSync('git-files.txt', e.message);
}
