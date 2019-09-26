

document.addEventListener('DOMContentLoaded', function() {
    // functions to run
    createIndex();
    $.getJSON('../config/config.json',function(data){
        
        config = data;
        buildFunctions()
        menuItems();
        tests();
    })
}, false);


function createIndex(){
    let b = document.getElementsByTagName("BODY")[0]
    b.appendChild(document.createElement('title'))
    let title_div =document.createElement('div')
    title_div.id='title_div'
    let title_h3 = document.createElement('h3')
    title_h3.id='title'
    title_h3.className = 'title_bar'
    title_div.appendChild(title_h3)
    let title_p = document.createElement('p')
    title_p.id="description"
    title_p.className='title_bar'
    title_div.appendChild(title_p)
    b.appendChild(title_div)
    let status_div = document.createElement('div')
    status_div.id='status'
    b.appendChild(status_div)
    let navbar_div = document.createElement('div')
    navbar_div.id='navbar'
    b.appendChild(navbar_div)
    let runall_div = document.createElement('div')
    runall_div.id='run_all_div'
    b.appendChild(runall_div)
    let tests_div = document.createElement('div')
    tests_div.id='tests'
    b.appendChild(tests_div)
    let logs_div = document.createElement('div')
    logs_div.id='logs'
    b.appendChild(logs_div)
   
}



var total_tests;
var pass_count;
var fail_count;
var log_array =[];
var config = {};
var current_run;
var lastTest;
// on document ready



// build functions. grabbing data from config manifest to create tests and functions
function buildFunctions(){
    // update the title
    document.getElementById("title").innerText = config.name;
    // update the description
    document.getElementById("description").innerText = config.description;
}




// adding menu items
function menuItems(){
    let men = document.getElementById("navbar");
    let nav = document.createElement('div');
    nav.className="navbar"
    men.appendChild(nav);
    let b1 = document.createElement('a')
    b1.className = "dropbtn"
    // b1.href="#index.html"
    b1.text="Tests"
    
    b1.addEventListener("click", tests);
    // b1.whenClicked = home();
    let b2 = document.createElement('a')
    b2.className = "dropbtn"
    b2.href = '#'
    b2.text ="Logs"
    b2.id = "logs_button"
    b2.addEventListener("click", logs);
    // b2.whenClicked = employees()
    nav.appendChild(b1)
    nav.appendChild(b2)

    // set main to null to hide logs show tests
    console.log(config)
    console.log(config.test_functions)
    total_tests= config.test_functions.length;
    
    let main = document.getElementById("run_all_div")
    main.innerHTML = ''
    // create div to house run all button
    let run_div = document.createElement('div');
    run_div.id="run_div"
    // create button
    let run_button = document.createElement('BUTTON')
    run_button.innerText = "Run All"
    run_button.name = "RunAllTests"
    run_button.id ="run_all_button"
    run_button.addEventListener("click", runAll);
    // append button to div
    run_div.appendChild(run_button)
    // Create overal status 
    let stat = document.createElement("h3")
    stat.innerText = "Not Run"
    stat.id = "run_all_status"
  


    // append status to div
    run_div.appendChild(stat)
    
    // create pass/fail obj
    let success_condition = document.createElement('h3')
    success_condition.id="run_all_success"
    success_condition.name = "run_all_success"
    // append pass/fail to div
    run_div.appendChild(success_condition)
    // append div to main

    let clearall = document.createElement('BUTTON')
    clearall.innerText = "Clear tests"
    clearall.id="clear_all"
    clearall.addEventListener("click",clearAll);
    run_div.appendChild(clearall)
    main.appendChild(run_div);

    var addclass = 'activeclass';
    $('.dropbtn').first().addClass(addclass)
    var $cols = $('.dropbtn').click(function(e) {
        $cols.removeClass(addclass);
        $(this).addClass(addclass);
    });
  }
  
  


  // test home screen
  async function tests(){
    let main = document.getElementById("tests")
     main.innerHTML = ''
     document.getElementById("logs").style.display = "none"
     main.style.display = "block"

    // create div to house status of all tests
    let status_div = document.createElement('div');
    status_div.id="status_div"

    // create list of functions and current status
    let list = document.createElement('table');
    let tBody = document.createElement('tbody')
    let tHead = document.createElement('thead')
    tHead.id="testThead"
    let trh = document.createElement('tr'); 
    let th1 = document.createElement('th')
    th1.innerText = "Run Individualy"
    th1.width = '30%'
    let th2 = document.createElement('th')
    th2.innerText = "Test Name"
    th2.width = '30%'
    let th3 = document.createElement('th')
    th3.innerText = "Status"
    th3.width = '40%'
    trh.appendChild(th1)
    trh.appendChild(th2)
    trh.appendChild(th3)
    tHead.appendChild(trh)
    list.appendChild(tHead)
    list.id="status_table"
    let tests = config.test_functions
    for(let i=0;i<total_tests; i++){
        total_tests= tests.length;
        
        let ele = JSON.stringify(tests[i])
        let tr = document.createElement('tr'); 
        let td1 = document.createElement('td');
        let run_t =document.createElement('BUTTON')
        run_t.id = `${tests[i].test_function}_button`
        run_t.innerText = "Run"
        run_t.addEventListener("click", function() {let val = document.getElementById("run_all_status").name;
        val = parseInt(val)
       
        if(val){
           
        }
        else { val = 0}
        document.getElementById("run_all_status").innerText = `Running ${val}/${total_tests}`
        document.getElementById("run_all_status").name = val;
        lastTest = true;
        console.log(tests[i])
        document.getElementById(`${tests[i].test_function}`).innerText = "Running"
    
        let test = eval(`${tests[i].test_function}(${ele},${i})`); 
       });
        // updateStatus(test,i)
        td1.appendChild(run_t)
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td3.id=`${tests[i].test_function}`
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
    list.appendChild(tBody)
    status_div.appendChild(list)
    // append div to main
    main.appendChild(status_div);
}




  // run all function
    function runAll(){
      // blank any incase test is re-run
      document.getElementById("run_all_status").name = "0"
     total_tests = 0;
     pass_count = 0;
     fail_count = 0;
     document.getElementById("run_all_success").innerText = ""
     //log_array = [];

     // get tests
    let tests = config.test_functions
    total_tests= tests.length;
    
    // update the status
    document.getElementById("run_all_status").innerText = `Running 0/${total_tests}`
    
        lastTest = false;
        
        runTests(0)

        // when function is finsihed it will update the app
        //updateStatus(test,i)
  }

function updateStatus(test,i){
    console.log(test);
    console.log(`i: ${i}`)
    // update config
    let tests = config.test_functions
    tests[i].status=test.status


    // update list with test status
    if(document.getElementById(test.test_function)){
        document.getElementById(test.test_function).innerText = test.status;
        
    }
    // update the run_all_status with howmany are done. when all are done mark according
    let val = document.getElementById("run_all_status").name;
    val = parseInt(val)
    if(val >= total_tests){

    }
    else {
        val ++
    }
  
    document.getElementById("run_all_status").innerText = `Running ${val}/${total_tests}`
    document.getElementById("run_all_status").name = val;
    // incriment pass/fail counter
    if(test.success === true){
        pass_count ++
    } else if(test.success === false){
        fail_count ++
    }


    // add data to logs
    var st; 
    if(test.success == true) {
        st= 'Success'
    } else { st= 'Fail'} 
    let log = {
        "name":test.test_name,
        "stat": st,
        "msg":test.status_msg
    }
    log_array.push(log);
    update_logs()
    // if running count is = total then update run_all_success with complete fail/pass
    if(val == total_tests){
        document.getElementById("run_all_status").innerText = `Finished ${val}/${total_tests}`
        if(pass_count == total_tests){
            document.getElementById("run_all_success").innerText = "Pass"
        } else {
            document.getElementById("run_all_success").innerText = "Fail"
        }
    }

    console.log(tests)
    if(lastTest == false){runTests(i+1) }
    

}
// log screen
function logs(){
     // set main to null to hide logs show tests

     let main = document.getElementById("logs")
     main.innerHTML = ''

     

     document.getElementById("tests").style.display = "none"
     main.style.display = "block"
     update_logs()
   

}
function update_logs(){
    let main = document.getElementById("logs")
    main.innerHTML = ''
    if(log_array.length > 0){

    
        // create div to house status of all logs
        let log_div = document.createElement('div');
        log_div.id="log_div"

        // create list of functions and current status
        let list = document.createElement('table');
        let tBody = document.createElement('tbody')
        let tHead = document.createElement('thead')
        let th1 = document.createElement('th')
        th1.innerText = "Test Name"
        th1.width = '30%'
        let th2 = document.createElement('th')
        th2.innerText = "Status"
        th2.width = '20%'
        let th3 = document.createElement('th')
        th3.innerText = "Message"
        th3.width = '50%'
        tHead.appendChild(th1)
        tHead.appendChild(th2)
        tHead.appendChild(th3)
        list.appendChild(tHead)
        list.id="log_table"
        log_array.forEach(element => { 
            let tr = document.createElement('tr'); 
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let t1 = document.createTextNode(element.name);
            let t2 = document.createTextNode(element.stat);
            let t3 = document.createTextNode(element.msg);
            td1.appendChild(t1);
            td2.appendChild(t2);
            td3.appendChild(t3);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tBody.appendChild(tr);

        });
        list.appendChild(tBody)

        // append list to div
        log_div.appendChild(list)
        // append div to main
        main.appendChild(log_div);
    } else {
        main.innerText = "No Logs Yet. Please run test to get logs"
    }
}

function clearAll(){
    // reset main config file
    let tests = config.test_functions
    tests.forEach(element => {
        element.status = "Not Run"
        element.success = false
        element.status_msg = ""
        // reset test table
        document.getElementById(`${element.test_function}`).innerText = "Not Run"
    });
    

    // reset status
    document.getElementById("run_all_status").innerText = `Not Run`
    document.getElementById("run_all_status").name = 0;
    document.getElementById("run_all_success").innerText = ""
    // clear logs
    log_array = []
    update_logs();
    console.log(tests)
    

}

function runTests(i){
    let tests = config.test_functions
    total_tests= tests.length;
    
    console.log(`i: ${i} total tests: ${total_tests}`)
    if(i < total_tests){
        let ele = JSON.stringify(tests[i])
        let fun = `${tests[i].test_function}(${ele}, ${i})`
        // run each function
        document.getElementById(`${tests[i].test_function}`).innerText = "Running"
    console.log(`${tests[i]}`)
        eval(fun)
    }
    
}