async function hotfixTests() {
    if (document.getElementById('regression_run_all_button')) {
        document.getElementById('regression_run_all_button').style.display = "none"
        document.getElementById('regression_run_all_success').style.display = "none"
        document.getElementById('regression_run_all_status').style.display = "none"
    }
    if (document.getElementById('manual_run_all_status')) {
        document.getElementById('manual_run_all_success').style.display = "none"
        document.getElementById('manual_run_all_status').style.display = "none"
    }
    if (document.getElementById('hotfix_run_all_button')) {
        document.getElementById('hotfix_run_all_button').style.display = "block"
        document.getElementById('hotfix_run_all_success').style.display = "block"
        document.getElementById('hotfix_run_all_status').style.display = "block"
    }
    else {
        let run_div = document.getElementById('run_div')
        let hotfix_run_button = document.createElement('BUTTON')
        hotfix_run_button.innerText = "Hotfix Run All"
        hotfix_run_button.name = "hotfixRunAllTests"
        hotfix_run_button.id = "hotfix_run_all_button"
        hotfix_run_button.style.cssFloat = "left"
        hotfix_run_button.addEventListener("click", hotfixRunAll);
        let hotfix_stat = document.createElement("h3")
        hotfix_stat.className = 'run_div_align'
        hotfix_stat.name = "hotfix_run_all_status"
        hotfix_stat.id = "hotfix_run_all_status"
        hotfix_stat.innerText = "Not Run"
        let hotfix_success_condition = document.createElement('h3')
        hotfix_success_condition.className = 'run_div_align'
        hotfix_success_condition.id = "hotfix_run_all_success"
        hotfix_success_condition.name = "hotfix_run_all_success"

        run_div.appendChild(hotfix_run_button)
        run_div.appendChild(hotfix_stat)
        run_div.appendChild(hotfix_success_condition)
    }

    let main = document.getElementById("hotfix_tests")
    main.innerHTML = ''
    document.getElementById("regression_tests").style.display = "none"
    document.getElementById("log_els").style.display = "none"
    document.getElementById("manual_tests").style.display = "none"
    main.style.display = "block"

    let scroll_table= document.createElement('div')
    scroll_table.className = 'table_div'
    // create div to house status of all tests
    //let status_div = document.createElement('div');
    //status_div.id = "hotfix_status_div"

    // create list of functions and current status
    let list = document.createElement('table');
    let list2 = document.createElement('table');
    let tBody = document.createElement('tbody')
    let tHead = document.createElement('thead')
    tHead.id = "testThead"
    let trh = document.createElement('tr');
    let th1 = document.createElement('th')
    th1.innerText = "Run Individualy"
    th1.width = '20%'
    let th2 = document.createElement('th')
    th2.innerText = "Test Name"
    th2.width = '50%'
    let th3 = document.createElement('th')
    th3.innerText = "Status"
    th3.width = '30%'
    trh.appendChild(th1)
    trh.appendChild(th2)
    trh.appendChild(th3)
    tHead.appendChild(trh)
    list.appendChild(tHead)
    list.id = "hotfix_status_table"
    let tests = hotfix_tests
    for (let i = 0; i < tests.length; i++) {
        if (tests[i].testType == "hotfix" || tests[i].testType == "both") {
            let ele = JSON.stringify(tests[i])
            let tr = document.createElement('tr');
            tr.id=`hotfix_test_row__${tests[i].test_function}`
            let td1 = document.createElement('td');
            let run_t = document.createElement('BUTTON')
            run_t.id = `${tests[i].test_function}_hotfix_button`
            run_t.innerText = "Run"
            run_t.addEventListener("click", function () {
                if (tests[i].testType == "hotfix" || tests[i].testType == "both") {
                    let val;
                    if (document.getElementById("hotfix_run_all_status").name) {
                        val = document.getElementById("hotfix_run_all_status").name
                    } else {
                        val = 0
                    }
                    val = parseInt(val)

                    if (val) {
                    }
                    else { val = 0 }
                    document.getElementById("hotfix_run_all_status").innerText = `Running ${val}/${hotfix_total_tests}`
                    document.getElementById("hotfix_run_all_status").name = val;
                    lastTest = true;
                    document.getElementById(`hotfix_${tests[i].test_function}`).innerText = "Running"

                    let test = eval(`${tests[i].test_function}(${ele},${i})`);
                }

            });
            // updateStatus(test,i)
            td1.appendChild(run_t)
            td1.width='20%'
            let td2 = document.createElement('td');
            td2.width='50%'
            let td3 = document.createElement('td');
            td3.width='30%'
            td3.id = `hotfix_${tests[i].test_function}`
            let t2 = document.createTextNode(tests[i].test_name);
            let t3 = document.createTextNode(tests[i].status);

            //td1.appendChild(t1);
            td2.appendChild(t2);
            td3.appendChild(t3);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            let final_tr = document.createElement('tr')
            final_tr.style.color = '#555'
            tr.appendChild(final_tr)
            tBody.appendChild(tr);
        }
    }
    // append list to div
    list2.appendChild(tBody)
    //status_div.appendChild(list)
    // append div to main
    main.appendChild(list)
    scroll_table.appendChild(list2)
    main.appendChild(scroll_table)
}


async function regressionTests() {
    if (document.getElementById('hotfix_run_all_button')) {
        document.getElementById('hotfix_run_all_button').style.display = "none"
        document.getElementById('hotfix_run_all_success').style.display = "none"
        document.getElementById('hotfix_run_all_status').style.display = "none"
    }
    if (document.getElementById('manual_run_all_status')) {
        document.getElementById('manual_run_all_success').style.display = "none"
        document.getElementById('manual_run_all_status').style.display = "none"
    }
    if (document.getElementById('regression_run_all_button')) {
        document.getElementById('regression_run_all_button').style.display = "block"
        document.getElementById('regression_run_all_success').style.display = "block"
        document.getElementById('regression_run_all_status').style.display = "block"
    }
    else {
        let run_div = document.getElementById('run_div')
        let regression_run_button = document.createElement('BUTTON')
        regression_run_button.innerText = "Regression Run All"
        regression_run_button.name = "regressionRunAllTests"
        regression_run_button.id = "regression_run_all_button"
        regression_run_button.style.cssFloat = "left"
        regression_run_button.addEventListener("click", regressionRunAll);
        let regression_stat = document.createElement("h3")
        regression_stat.name = "regression_run_all_status"
        regression_stat.id = "regression_run_all_status"
        regression_stat.className = 'run_div_align'
        regression_stat.innerText = "Not Run"

        let regression_success_condition = document.createElement('h3')
        regression_success_condition.id = "regression_run_all_success"
        regression_success_condition.name = "regression_run_all_success"
        regression_success_condition.className = 'run_div_align'

        run_div.appendChild(regression_run_button)
        run_div.appendChild(regression_stat)
        run_div.appendChild(regression_success_condition)
    }



    let main = document.getElementById("regression_tests")
    main.innerHTML = ''
    let scroll_table= document.createElement('div')
    scroll_table.className = 'table_div'
    document.getElementById("hotfix_tests").style.display = "none"
    document.getElementById("log_els").style.display = "none"
    document.getElementById("manual_tests").style.display = "none"
    main.style.display = "block"

    // create div to house status of all tests
    //let status_div = document.createElement('div');
    //status_div.id = "regression_status_div"

    // create list of functions and current status
    let list = document.createElement('table');
    let list2 = document.createElement('table');
    let tBody = document.createElement('tbody')
    let tHead = document.createElement('thead')
    tHead.id = "testThead"
    let trh = document.createElement('tr');
    let th1 = document.createElement('th')
    th1.innerText = "Run Individualy"
    th1.width = '20%'
    let th2 = document.createElement('th')
    th2.innerText = "Test Name"
    th2.width = '50%'
    let th3 = document.createElement('th')
    th3.innerText = "Status"
    th3.width = '30%'
    trh.appendChild(th1)
    trh.appendChild(th2)
    trh.appendChild(th3)
    tHead.appendChild(trh)
    list.appendChild(tHead)
    list.id = "status_table"
    let tests = regression_tests
    
    for (let i = 0; i < tests.length; i++) {
            let ele = JSON.stringify(tests[i])
            let tr = document.createElement('tr');
            tr.id=`regression_test_row__${tests[i].test_function}`
            let td1 = document.createElement('td');
            let run_t = document.createElement('BUTTON')
            run_t.id = `${tests[i].test_function}_regression_button`
            run_t.innerText = "Run"
            
            run_t.addEventListener("click", function () {
                
                    let val;
                    if (document.getElementById("regression_run_all_status").name) {
                        val = document.getElementById("regression_run_all_status").name
                    } else {
                        val = 0
                    }
                    val = parseInt(val)

                    if (val) {
                    }
                    else { val = 0 }
                    document.getElementById("regression_run_all_status").innerText = `Running ${val}/${regression_total_tests}`
                    document.getElementById("regression_run_all_status").name = val;
                    lastTest = true;
                    document.getElementById(`regression_${tests[i].test_function}`).innerText = "Running"
                    let test = eval(`${tests[i].test_function}(${ele},${i})`);
               
            });
            // updateStatus(test,i)
            td1.appendChild(run_t)
            td1.width='20%'
            let td2 = document.createElement('td');
            td2.width='50%'
            let td3 = document.createElement('td');
            td3.width='30%'
            td3.id = `regression_${tests[i].test_function}`
            let t2 = document.createTextNode(tests[i].test_name);
            let t3 = document.createTextNode(tests[i].status);

            //td1.appendChild(t1);
            td2.appendChild(t2);
            td3.appendChild(t3);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tBody.appendChild(tr);
        
    }
    // append list to div
    list2.appendChild(tBody)
    //status_div.appendChild(list)
    // append div to main
    main.appendChild(list)
    scroll_table.appendChild(list2)
    main.appendChild(scroll_table)
}


function hotfix_runTests(i) {
    let tests = hotfix_tests

    if (i < hotfix_total_tests) {
        let ele = JSON.stringify(tests[i])
        let fun = `${tests[i].test_function}(${ele}, ${i})`
        // run each function
        document.getElementById(`hotfix_${tests[i].test_function}`).innerText = "Running"
        eval(fun)
    }

}

function regression_runTests(i) {
    let tests = regression_tests

    if (i < regression_total_tests) {
        let ele = JSON.stringify(tests[i])
        let fun = `${tests[i].test_function}(${ele}, ${i})`
        // run each function
        document.getElementById(`regression_${tests[i].test_function}`).innerText = "Running"
        eval(fun)
    }

}