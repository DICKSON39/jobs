const core = require('@actions/core');
const exec = require('@actions/exec');

function run() {
    //Get Inputs
    const bucket = core.getInput('bucket', { required: true });

    const region = core.getInput('region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });
    //Upload files
    const s3URI = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${region}`)
    `aws s3 folder1 s3://dicksonndumia --region us-east-1`;
    //get url
    const websiteURL = `http://${bucket}.s3-website-${region}.amazonaws.com`;
    //http://dicksonndumia.s3-website-us-east-1.amazonaws.com
    core.setOutput('website-url', websiteURL);
}

run()