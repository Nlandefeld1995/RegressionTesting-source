function hotfixRunAll() {
    // blank any incase test is re-run
    document.getElementById("hotfix_run_all_status").name = "0"
    document.getElementById("hotfix_run_all_success").innerText = ""
    document.getElementById("regression_run_all_success").innerText = ""
    let tests = hotfix_tests ;
    document.getElementById("hotfix_run_all_status").innerText = `Running 0/${hotfix_total_tests}`
    lastTest = false;
    run_all_clicked = 'hotfix'
    hotfix_pass_count =0
    hotfix_fail_count = 0
    regression_pass_count =0
    regression_fail_count = 0
    
    console.log(`hotfix_fail ${hotfix_fail_count}`)
    console.log(`hotfix_success ${hotfix_pass_count}`)
    console.log(`regression_fail ${regression_fail_count}`)
    console.log(`regression_pass ${regression_pass_count}`)
    hotfix_runTests(0)
}

function regressionRunAll() {
    // blank any incase test is re-run
    document.getElementById("regression_run_all_status").name = "0"
    document.getElementById("regression_run_all_success").innerText = ""
    document.getElementById("hotfix_run_all_success").innerText = ""
    let tests = regression_tests
    document.getElementById("regression_run_all_status").innerText = `Running 0/${regression_total_tests}`
    lastTest = false;
    run_all_clicked = 'regression'
    hotfix_pass_count =0
    hotfix_fail_count = 0
    regression_pass_count =0
    regression_fail_count = 0
    console.log(`hotfix_fail ${hotfix_fail_count}`)
    console.log(`hotfix_success ${hotfix_pass_count}`)
    console.log(`regression_fail ${regression_fail_count}`)
    console.log(`regression_pass ${regression_pass_count}`)
    regression_runTests(0)
}