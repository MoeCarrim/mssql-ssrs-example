const ssrs = require('mssql-ssrs');
var fs = require('fs');
async function main() {
    try {

        // Server URL 
        const url = 'http://ec2-3-0-89-160.ap-southeast-1.compute.amazonaws.com/ReportServer';
        // Window server user allocated for SSRS
        const config = { username: "tom", password: "123456Qwerty" };
        
        // Start the SRRS
        await ssrs.start(url, config, null, null);

        // Define parameters
        const reportPath = '/ReportProjectTest/SumBillsRPT';
        const fileType = 'PDF';
        const parameters = {
            billID: 1956947,
        };

        // Rendering the report based on the required report type
        const report = await ssrs.reportExecution.getReport(reportPath, fileType, parameters);
        
        // Writing to local file / or send the reponse to API 
        fs.writeFileSync('reports/report.pdf', report.Result, "base64");

        console.log("Process Complete");
    } catch (err) {
        console.error(err);
    }
}
main();