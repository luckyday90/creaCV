import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'components', 'ui');
const destDir = path.join(process.cwd(), 'src', 'components', 'ui-lib');

if (fs.existsSync(srcDir)) {
  fs.renameSync(srcDir, destDir);
  console.log('Moved ui to ui-lib successfully.');
} else {
  console.log('Source directory does not exist.');
}
