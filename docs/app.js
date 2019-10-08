var run_all_clicked;

document.addEventListener('DOMContentLoaded', function () {
    // functions to run
    createIndex();
    $.getJSON('../config/config.json', function (data) {

        config = data;
        buildFunctions()
        menuItems();
        regressionTests();
        hotfixTests();
    })
}, false);


function createIndex() {
    let b = document.getElementsByTagName("BODY")[0]
    b.appendChild(document.createElement('title'))
    let title_div = document.createElement('div')
    title_div.id = 'title_div'
    let title_h3 = document.createElement('h3')
    title_h3.id = 'title'
    title_h3.className = 'title_bar'
    title_div.appendChild(title_h3)
    let title_p = document.createElement('p')
    title_p.id = "description"
    title_p.className = 'title_bar'
    title_div.appendChild(title_p)
    b.appendChild(title_div)
    let status_div = document.createElement('div')
    status_div.id = 'status'
    b.appendChild(status_div)
    let navbar_div = document.createElement('div')
    navbar_div.id = 'navbar'
    b.appendChild(navbar_div)
    let runall_div = document.createElement('div')
    runall_div.id = 'run_all_div'
    b.appendChild(runall_div)
    let hotfix_tests_div = document.createElement('div')
    hotfix_tests_div.id = 'hotfix_tests'
    b.appendChild(hotfix_tests_div)
    let regression_tests_div = document.createElement('div')
    regression_tests_div.id = 'regression_tests'
    b.appendChild(regression_tests_div)
    let manual_tests_div = document.createElement('div')
    manual_tests_div.id = 'manual_tests'
    b.appendChild(manual_tests_div)
    log_els_div = document.createElement('div')
    log_els_div.id = 'log_els'
    b.appendChild(log_els_div)

}



var hotfix_total_tests;
var regression_total_tests;
var hotfix_pass_count=0;
var hotfix_fail_count=0;
var regression_pass_count=0;
var regression_fail_count=0;
var log_el_array = [];
var config = {};
var current_run;
var lastTest;
var hotfix_tests = []
var regression_tests = []
// on document ready



// build functions. grabbing data from config manifest to create tests and functions
function buildFunctions() {
    // update the title
    document.getElementById("title").innerText = config.name;
    // update the description
    document.getElementById("description").innerText = config.description;
}




// adding menu items
function menuItems() {
    let men = document.getElementById("navbar");
    let nav = document.createElement('div');
    nav.className = "navbar"
    men.appendChild(nav);
    let b1 = document.createElement('a')
    b1.className = "dropbtn"
    b1.text = "Hotfix Tests"
    b1.addEventListener("click", hotfixTests);

    let b2 = document.createElement('a')
    b2.className = "dropbtn"
    b2.text = "Regression Tests"
    b2.addEventListener("click", regressionTests)

    let b3 = document.createElement('a')
    b3.className = "dropbtn"
    b3.text = "Logs"
    b3.id = "log_els_button"
    b3.addEventListener("click", log_els);

    let b4 = document.createElement('a')
    b4.className = "dropbtn"
    b4.text = "Manual Tests"
    b4.id = "manual_button"
    b4.addEventListener("click", manual_Tests);
    // b2.whenClicked = employees()
    nav.appendChild(b1)
    nav.appendChild(b2)
    nav.appendChild(b4)
    nav.appendChild(b3)

    let tests = config.test_functions;
    regression_total_tests = 0;
    hotfix_total_tests = 0;
    for (let j = 0; j < tests.length; j++) {
        if (tests[j].testType == "regression" || tests[j].testType == "both") {
            regression_total_tests++
            regression_tests.push(tests[j])
        }
        if (tests[j].testType == "hotfix" || tests[j].testType == "both") {
            hotfix_total_tests++
            hotfix_tests.push(tests[j])
        }
    }


    let main = document.getElementById("run_all_div")
    main.innerHTML = ''
    // create div to house run all button
    let run_div = document.createElement('div');
    run_div.id = "run_div"
    // create button

    let clearall = document.createElement('BUTTON')
    clearall.innerText = "Clear All Tests"
    clearall.id = "clear_all"
    clearall.addEventListener("click", clearAll);
    run_div.appendChild(clearall)


    main.appendChild(run_div);

    var addclass = 'activeclass';
    $('.dropbtn').first().addClass(addclass)
    var $cols = $('.dropbtn').click(function (e) {
        $cols.removeClass(addclass);
        $(this).addClass(addclass);
    });
}



function updateStatus(tests, i) {
    // update config
    

    
    

    // update list with test status
    if (document.getElementById(`hotfix_${tests.test_function}`)) {
        document.getElementById(`hotfix_${tests.test_function}`).innerText = tests.status;

    }
    if (document.getElementById(`regression_${tests.test_function}`)) {
        document.getElementById(`regression_${tests.test_function}`).innerText = tests.status;

    }
    var log_el;
    // update the run_all_status with howmany are done. when all are done mark according
    if (tests.testType == 'hotfix') {
        hotfixTests[i]=tests
        var val
        if (document.getElementById("hotfix_run_all_status").name) {
            val = document.getElementById("hotfix_run_all_status").name
        } else { val = 0 }
        val = parseInt(val)
        if (val >= hotfix_total_tests) { }
        else { val++ }
        document.getElementById("hotfix_run_all_status").innerText = `Running ${val}/${hotfix_total_tests}`
        document.getElementById("hotfix_run_all_status").name = val;
        // incriment pass/fail counter
        if (tests.success === true) { hotfix_pass_count++ } else if (tests.success === false) { hotfix_fail_count++ }
        // add data to log_els
        var st;
        if (tests.success == true) {
            st = 'Success'
        } else { st = 'Fail' }
        log_el = {
            "name": tests.test_name,
            "stat": st,
            "msg": tests.log
        }
        log_el_array.push(log_el);
        update_logs_el()
        // if running count is = total then update run_all_success with complete fail/pass
        if (val == hotfix_total_tests) {
            document.getElementById("hotfix_run_all_status").innerText = `Finished ${val}/${hotfix_total_tests}`
            if (hotfix_pass_count == hotfix_total_tests) {
                document.getElementById("hotfix_run_all_success").innerText = "Pass"
            } else {
                document.getElementById("hotfix_run_all_success").innerText = "Fail"
            }
        }
        hotfix_tests[i]=tests
    } else if (tests.testType == 'regression') {
        var val
        if (document.getElementById("regression_run_all_status").name) {
            val = document.getElementById("regression_run_all_status").name
        } else { val = 0 }
        val = parseInt(val)
        if (val) {
        }
        else { val = 0 }
        if (val >= regression_total_tests) { }
        else { val++ }
        document.getElementById("regression_run_all_status").innerText = `Running ${val}/${regression_total_tests}`
        document.getElementById("regression_run_all_status").name = val;
        // incriment pass/fail counter
        if (tests.success === true) { regression_pass_count++ } else if (tests.success === false) { regression_fail_count++ }
        // add data to log_els
        var st;
        if (tests.success == true) {
            st = 'Success'
        } else { st = 'Fail' }
        log_el = {
            "name": tests.test_name,
            "stat": st,
            "msg": tests.log
        }
        log_el_array.push(log_el);
        update_logs_el()
        // if running count is = total then update run_all_success with complete fail/pass
        if (val == regression_total_tests) {
            document.getElementById("regression_run_all_status").innerText = `Finished ${val}/${regression_total_tests}`
            if (regression_pass_count == regression_total_tests) {
                document.getElementById("regression_run_all_success").innerText = "Pass"
            } else {
                document.getElementById("regression_run_all_success").innerText = "Fail"
            }
        }
        regression_tests[i]=tests
    } else if (tests.testType == 'both') {
        hotfix()
        regression()
        function hotfix() {
            var val
            if (document.getElementById("hotfix_run_all_status").name) {
                val = document.getElementById("hotfix_run_all_status").name
            } else { val = 0 }
            val = parseInt(val)
            if (val) {
            }
            else { val = 0 }
            if (val >= hotfix_total_tests) { }
            else { val++ }
            document.getElementById("hotfix_run_all_status").innerText = `Running ${val}/${hotfix_total_tests}`
            document.getElementById("hotfix_run_all_status").name = val;
            if (tests.success === true) { hotfix_pass_count++ } else if (tests.success === false) { hotfix_fail_count++ }
            // add data to log_els
            var st;
            if (tests.success == true) {
                st = 'Success'
            } else { st = 'Fail' }
            log_el = {
                "name": tests.test_name,
                "stat": st,
                "msg": tests.log
            }
            log_el_array.push(log_el);
            update_logs_el()
            // if running count is = total then update run_all_success with complete fail/pass
            if (val == hotfix_total_tests) {
                document.getElementById("hotfix_run_all_status").innerText = `Finished ${val}/${hotfix_total_tests}`
                if (hotfix_pass_count == hotfix_total_tests) {
                    document.getElementById("hotfix_run_all_success").innerText = "Pass"
                } else {
                    document.getElementById("hotfix_run_all_success").innerText = "Fail"
                }
            }
            for(let j=0; j<hotfix_tests.length; j++){
                if(tests.test_function == hotfix_tests[j].test_function){
                    hotfix_tests[j]=tests
                }
            }
        }
        // regression
        function regression() {
            var val
            if (document.getElementById("regression_run_all_status").name) {
                val = document.getElementById("regression_run_all_status").name
            } else { val = 0 }

            val = parseInt(val)
            if (val) {
            }
            else { val = 0 }
            if (val >= regression_total_tests) { }
            else { val++ }
            document.getElementById("regression_run_all_status").innerText = `Running ${val}/${regression_total_tests}`
            document.getElementById("regression_run_all_status").name = val;
            // incriment pass/fail counter
            if (tests.success === true) { regression_pass_count++ } else if (tests.success === false) { regression_fail_count++ }
            // add data to log_els
            var st;
            if (tests.success == true) {
                st = 'Success'
            } else { st = 'Fail' }
            log_el = {
                "name": tests.test_name,
                "stat": st,
                "msg": tests.log
            }
            
            
            // if running count is = total then update run_all_success with complete fail/pass
            if (val == regression_total_tests) {
                document.getElementById("regression_run_all_status").innerText = `Finished ${val}/${regression_total_tests}`
                if (regression_pass_count == regression_total_tests) {
                    document.getElementById("regression_run_all_success").innerText = "Pass"
                } else {
                    document.getElementById("regression_run_all_success").innerText = "Fail"
                }
            }
            for(let j=0; j<regression_tests.length; j++){
                if(tests.test_function == regression_tests[j].test_function){
                    regression_tests[j]=tests
                }
            }
        }
    }







    if (lastTest == false && run_all_clicked == 'hotfix') { hotfix_runTests(i + 1) }
    if (lastTest == false && run_all_clicked == 'regression') { regression_runTests(i + 1) }


}
// log_el screen


function clearAll() {
    location.reload(true);
}



