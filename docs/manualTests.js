var manualTests = []
var manual_total_tests;
var manual_pass_count;
var manual_fail_count;
function manual_Tests() {
    manualTests = []
    manual_pass_count= 0;
    manual_fail_count = 0;
    if(document.getElementById('manual_run_all_status')){
        document.getElementById('manual_run_all_success').style.display = "block"
        document.getElementById('manual_run_all_status').style.display = "block"

    } else {
        let run_div = document.getElementById('run_div')

        let manual_stat = document.createElement("h3")
    
        manual_stat.name = "manual_run_all_status"
        manual_stat.id = "manual_run_all_status"
        manual_stat.className = 'run_div_align'
        manual_stat.innerText = "Not Run"
    
        let manual_success_condition = document.createElement('h3')
        manual_success_condition.id = "manual_run_all_success"
        manual_success_condition.name = "manual_run_all_success"
        manual_success_condition.className = 'run_div_align'
    
        run_div.appendChild(manual_stat)
        run_div.appendChild(manual_success_condition)
    
        
        document.getElementById("regression_tests").style.display = "none"
        document.getElementById("hotfix_tests").style.display = "none"
        document.getElementById("log_els").style.display = "none"
        
    
    
    }
    if (document.getElementById('hotfix_run_all_button')) {
        document.getElementById('hotfix_run_all_button').style.display = "none"
        document.getElementById('hotfix_run_all_success').style.display = "none"
        document.getElementById('hotfix_run_all_status').style.display = "none"
    }
    if (document.getElementById('regression_run_all_button')) {
        document.getElementById('regression_run_all_button').style.display = "none"
        document.getElementById('regression_run_all_success').style.display = "none"
        document.getElementById('regression_run_all_status').style.display = "none"
    }


    let main = document.getElementById("manual_tests")
        main.innerHTML = ''
        main.style.display = "block"
    //let manual_status_div = document.createElement('div');
    //manual_status_div.id = "manual_status_div"

    // create list of functions and current status
    let list = document.createElement('table');
    let tBody = document.createElement('tbody')
    let tHead = document.createElement('thead')
    tHead.id = "testThead"
    let trh = document.createElement('tr');
    let th1 = document.createElement('th')
    th1.innerText = "Test Name"
    th1.width = '60%'
    let th2 = document.createElement('th')
    th2.innerText = "Status"
    th2.width = '20%'
    let th3 = document.createElement('th')
    th3.innerText = "Open Test"
    th3.width = '20%'
    trh.appendChild(th1)
    trh.appendChild(th2)
    trh.appendChild(th3)
    tHead.appendChild(trh)
    list.appendChild(tHead)
    list.id = "manual_status_table"


    let tests = config.test_functions
    manual_total_tests = 0
    tests.forEach(test => {
        if (test.testType == "manual") {
    
            manualTests.push(test)
            manual_total_tests++
    
        }
    });
    for (let i = 0; i < manualTests.length; i++) {
        let test = manualTests[i]

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td')
        td2.id = `manual_${test.test_function}_status`
        let td3 = document.createElement('td')
        td3.style.textAlign = "center"
        let t1 = document.createTextNode(test.test_name)
        let t2 = document.createTextNode(test.status)

        let manual_test_drop = document.createElement('i')
        manual_test_drop.id = `manual_test_drop_${test.test_function}`
        manual_test_drop.className = 'arrow right'
        manual_test_drop.addEventListener("click", function () {
            var x = document.getElementById(`${test.test_function}_div`);
            var y = document.getElementById(`${test.test_function}_buttons`)
            if (x.style.display === "none") {

                x.style.display = "block";
                y.style.display = "block";
                manual_test_drop.className = 'arrow down'
                let ele = JSON.stringify(test)
                x.innerHTML = ""
                create_buttons(test, i)
                eval(`${test.test_function}(${ele},${i})`)
            } else {

                x.style.display = "none";
                y.style.display = "none";

                manual_test_drop.className = 'arrow right'
            }
        })
        td1.appendChild(t1);
        td2.appendChild(t2);
        td3.appendChild(manual_test_drop)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        let tr11 = document.createElement('div')
        let tr2 = document.createElement('div')
        tr2.className = 'manualTestDrop'
        tr11.id = `${test.test_function}_button_div`
        tr2.id = `${test.test_function}_div`
        tr2.style.display = "none"
        tr2.className = "log_textArea"
        let tr3 = document.createElement('div')
        tr3.id = `${test.test_function}_buttons`
        tr3.style.display = "none"
        let trbtn1 = document.createElement('BUTTON')
        trbtn1.id = `${test.test_function}_button_pass`
        trbtn1.innerText = "Pass"
        trbtn1.addEventListener("click", function () {
            var x = document.getElementById(`${test.test_function}_div`);
            var y = document.getElementById(`${test.test_function}_buttons`)

            x.style.display = "none";
            y.style.display = "none";

            manual_test_drop.className = 'arrow right'
            manual_pass(test, i)
        })
        let trbtn2 = document.createElement('BUTTON')
        trbtn2.id = `${test.test_function}_button_fail`
        trbtn2.innerText = "Fail"
        trbtn2.addEventListener("click", function () {
            var x = document.getElementById(`${test.test_function}_div`);
            var y = document.getElementById(`${test.test_function}_buttons`)

            x.style.display = "none";
            y.style.display = "none";

            manual_test_drop.className = 'arrow right'
            manual_fail(test, i)
        })
        let trbtn3 = document.createElement('BUTTON')
        trbtn3.id = `${test.test_function}_button_cancel`
        trbtn3.innerText = "Cancel"
        trbtn3.addEventListener("click", function () {
            var x = document.getElementById(`${test.test_function}_div`);
            var y = document.getElementById(`${test.test_function}_buttons`)

            x.style.display = "none";
            y.style.display = "none";

            manual_test_drop.className = 'arrow right'
        })
        tr3.appendChild(trbtn1)
        tr3.appendChild(trbtn2)
        tr3.appendChild(trbtn3)
        tr11.appendChild(tr2)
        //tr11.appendChild(tr3)
        
        tBody.appendChild(tr);
        tBody.appendChild(tr11);

    }
    // append list to div
    list.appendChild(tBody)
    //manual_status_div.appendChild(list)
    // append div to main
    main.appendChild(list);
}


function create_buttons(test, i) {
    let manual_test_drop = document.getElementById(`manual_test_drop_${test.test_function}`)
    var x = document.getElementById(`${test.test_function}_button_div`)
    let tr3 = document.createElement('div')
    tr3.id = `${test.test_function}_buttons`

    let trbtn1 = document.createElement('BUTTON')
    trbtn1.id = `${test.test_function}_button_pass`
    trbtn1.innerText = "Pass"
    trbtn1.addEventListener("click", function () {
        var x = document.getElementById(`${test.test_function}_button_div`);
        var y = document.getElementById(`${test.test_function}_buttons`)

        x.style.display = "none";
        y.style.display = "none";
        test.status = 'Pass'
        test.success = true
        manual_test_drop.className = 'arrow right'
        manual_test_result(test, i)
    })
    let trbtn2 = document.createElement('BUTTON')
    trbtn2.id = `${test.test_function}_button_fail`
    trbtn2.innerText = "Fail"
    trbtn2.addEventListener("click", function () {
        var x = document.getElementById(`${test.test_function}_button_div`);
        var y = document.getElementById(`${test.test_function}_buttons`)

        x.style.display = "none";
        y.style.display = "none";
        test.status = 'Fail'
        test.success = false
        manual_test_drop.className = 'arrow right'
        manual_test_result(test, i)
    })
    let trbtn3 = document.createElement('BUTTON')
    trbtn3.id = `${test.test_function}_button_cancel`
    trbtn3.innerText = "Cancel"
    trbtn3.addEventListener("click", function () {
        var x = document.getElementById(`${test.test_function}_button_div`);
        var y = document.getElementById(`${test.test_function}_buttons`)

        x.style.display = "none";
        y.style.display = "none";

        manual_test_drop.className = 'arrow right'
    })
    tr3.appendChild(trbtn1)
    tr3.appendChild(trbtn2)
    tr3.appendChild(trbtn3)
    x.appendChild(tr3)

}

function manual_test_result(test, i) {
    
    
    document.getElementById(`manual_${test.test_function}_status`).textContent = test.status
    if (test.success = true) {
        manual_pass_count++
    } else if (test.success = false) {
        manual_fail_count++
    }
    updateManualStatus(test, i)
}

function updateManualStatus(test, i) {
    var val
    if (document.getElementById("manual_run_all_status").name) {
        val = document.getElementById("manual_run_all_status").name
    } else { val = 0 }

    if (i == 0) {
        val = 0
    }
    else { val = parseInt(val) }



    if (val >= manual_total_tests) { }
    else { val++ }
    document.getElementById("manual_run_all_status").innerText = `Running ${val}/${manual_total_tests}`
    document.getElementById("manual_run_all_status").name = val;


    // if running count is = total then update run_all_success with complete fail/pass
    if (val == manual_total_tests) {
        document.getElementById("manual_run_all_status").innerText = `Finished ${val}/${manual_total_tests}`
        console.log(manual_pass_count)
        console.log(manual_fail_count)
        if (manual_pass_count == manual_total_tests) {
            document.getElementById("manual_run_all_success").innerText = "Pass"
        } else {
            document.getElementById("manual_run_all_success").innerText = "Fail"
        }
    }

}