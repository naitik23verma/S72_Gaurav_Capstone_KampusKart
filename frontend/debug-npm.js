import { exec } from 'child_process';
exec('npm install --legacy-peer-deps', (error, stdout, stderr) => {
  const all = stdout + '\n' + stderr;
  const match = all.match(/npm error code ETARGET[\s\S]*?(?=npm error A complete log)/);
  if (match) {
    console.log(match[0]);
  } else {
    console.log(stderr.substring(0, 500));
  }
});
