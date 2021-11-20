import { execa } from "execa";
import * as fs from 'fs';

(async () => {
  let exitCode = 0;
  try {
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");
    await execa("npm", ["run", "build"]);
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rmdir", ["/s", "/q", folderName]);
    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    exitCode = 1;
  } finally {
    await execa("git", ["checkout", "-f", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
  }
  process.exit(exitCode);
})();
