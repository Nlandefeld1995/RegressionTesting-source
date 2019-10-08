This framework is designed to allow for quicker regression app deployment. It will allow for apps to always function in the same manner. Creating smoke tests from these apps should be the same for all apps built from this frame work. 


Config:
To configure your app navigate to config > config.json
Change the Name and Description to fit your app. 
Add a new object to the "test_functions" array for any tests you would like to run. 

The object needs to look similar to the following
{
    "test_name":"Example Test",
    "test_function":"example_function",
    "status":"Not Run",
    "success":false,
    "status_msg":""
}
test_name > update to your specific test's Name
test_function > you will write your test in a function. This is the function name, if needed use a controller function to call other functions. DO NOT add "()" this will cause the app to fail.
status > When creating the object this should always be set to "Not Run".
success > When creating the object this should always be set to "false".
status_msg > When creating the object this should remain a blank string.


After configuring your config.js file you will need to create your functions you specified in your "test_function"
By default, there is a "functions.js" file that you can write these in. Please note if you decide to write functions in their own js file please ensure to add it to the index.html file. 
Your function that defined in the manifest needs to take an object in as a parameter and return an object as well. The object that is passed is your specific test object that you set up in the config.js file. 

Throughout your function you will need to:
    pass in element and i. I.E.: function myTest(element,i){}
    update the status to "complete-{pass/fail}" When it is done running
    update the success to "true/false" true = successful test, false is an unsuccessful test.
    update the status_msg. It is recommended to pass the failure message in this for logging purpose. 
    Once you are done updating the element you need to call the function updateStatus and pass your element and i. I.E.: updateStatus(element,i)

An example function would look similar to: 
function myTest(element,i){
        try{
        // do something
        element.status = "Complete"
        element.success = true;
        element.log.push("Complete-pass")
        updateStatus(element,i)
    }catch(e){
        element.status = "Complete"
        element.success = false;
        element.log.push(e)
        updateStatus(element,i)
    }
    
}



SMOKE TESTS
There is a file "pytonOutline.py" it contains a template of smoke tests for this framework. 
The only changes needed is on line 11 update what the test will do and how to manually test. Line 54, You will need to update the card name with your card name. 
  #  test_cards = test_runner.search.searchCards('<YOUR KPI NAME GOES HERE>') #change to your card name
No other changes are needed.

LOGGING:
A key to automated testing is being able to see what the test was actually doing and what the results were. 
Keeping a log is a great way to do this. Log what your testing, what if()/case statements you are doing. What you expect and what you actually get. 
To log push text to the element.log object. 
Example: 
element.log.push("Testing if domo delete works")
domo.delete(<id>).then(function(){
    element.log.push("domo.delete successfuly delete id " + <id>)
}).catch(function(error){
    element.log.push("domo.delete failed deleting id " + <id>)
    element.log.push("domo.delete error message")
    element.log.push(error)
})