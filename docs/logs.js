function log_els() {
    // set main to null to hide log_els show tests

    let main = document.getElementById("log_els")
    main.innerHTML = ''



    document.getElementById("hotfix_tests").style.display = "none"
    document.getElementById("regression_tests").style.display = "none"
    document.getElementById("manual_tests").style.display = "none"
    main.style.display = "block"
    update_logs_el()
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
    if (document.getElementById('manual_run_all_status')) {
        document.getElementById('manual_run_all_success').style.display = "none"
        document.getElementById('manual_run_all_status').style.display = "none"
    }
}
function update_logs_el() {
    let main = document.getElementById("log_els")
    main.innerHTML = ''
    let scroll_table= document.createElement('div')
    scroll_table.className = 'table_div'
    if (log_el_array.length > 0) {


        // create div to house status of all log_els
        //let log_el_div = document.createElement('div');
        //log_el_div.id = "log_el_div"

        // create list of functions and current status
        let list = document.createElement('table');
        let list2 = document.createElement('table');
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
        th3.width = '40%'
        let th4 = document.createElement('th')
        th4.innerText = ""
        th4.width = '10%'
        tHead.appendChild(th1)
        tHead.appendChild(th2)
        tHead.appendChild(th3)
        tHead.appendChild(th4)
        list.appendChild(tHead)
        list.id = "log_el_table"
        
        log_el_array.forEach(element => {
            let tr = document.createElement('tr');
            tr.id=`log_test_row__${element.test_function}`
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            td4.style.textAlign = "center"
            let t1 = document.createTextNode(element.name);
            let t2 = document.createTextNode(element.stat);
            if(element.stat == "Success"){
                tr.style.backgroundColor = "#a6f5be"
           } else if(element.stat == "Fail"){
                tr.style.backgroundColor = "#ff6054"
           }
            let t3 = document.createTextNode(JSON.stringify(element.msg).replace('[','').replace(']','').replace('"',''));
            let log_drop = document.createElement('i');
            log_drop.id=`log_${element.name}`
            log_drop.className = 'arrow right'
            log_drop.addEventListener("click", function () {
                var x = document.getElementById(`textArea_${element.name}`);
                if (x.style.display === "none") {
                  x.style.display = "block";
                  log_drop.className = 'arrow down'
                } else {
                  x.style.display = "none";
                  log_drop.className = 'arrow right'
                }
            })
            td4.appendChild(log_drop)
            td1.appendChild(t1);
            td2.appendChild(t2);
            td3.appendChild(t3);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            td4.appendChild(log_drop)
            tr.appendChild(td4)
            
            let tr2 = document.createElement('div')
            tr2.className = 'textDrop'
            tr2.id=`textArea_${element.name}`
            tr2.style.display = "none"
            tr2.className = "log_textArea"
            let q = element.msg
            q.forEach(l => {
                let p = document.createElement('p')
                p.innerText = l
                tr2.appendChild(p)
            });
            
            
            tBody.appendChild(tr);
            scroll_table.appendChild(tr2);
            
        });
        list2.appendChild(tBody)

        // append list to div
        //log_el_div.appendChild(list)
        // append div to main
        main.appendChild(list);
        scroll_table.appendChild(list2)
        main.appendChild(scroll_table)
        
    } else {
        main.innerText = "No logs Yet. Please run test to get logs"
    }
}