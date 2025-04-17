const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const bucket = core.getInput('bucket');
    const distFolder = core.getInput('dist-folder');
    const region = core.getInput('bucket-region');



    // AWS CLI command: aws s3 sync
    await exec.exec(`aws s3 sync ${distFolder} s3://${bucket} --region ${region} --delete`);

    // Set the output for the GitHub Action
    const websiteUrl = `http://${bucket}.s3-website-${region}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
