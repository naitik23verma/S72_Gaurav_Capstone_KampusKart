import { execSync } from 'child_process';
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'pipe' });
  console.log("Install succeeded?");
} catch (e) {
  const errText = e.stderr.toString();
  const match = errText.match(/notarget No matching version found for ([^\n]+)/);
  if (match) {
    console.log("FAILED PACKAGE:", match[1]);
  } else {
    console.log("COULD NOT FIND PACKAGE NAME. Here is the start of stderr:");
    console.log(errText.substring(0, 1000));
  }
}
