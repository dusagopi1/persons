var a=require('fs');
var b=require('os');
var user=b.userInfo();
console.log(user.username);

//using fs

a.appendFile('greeting.txt','hi'+user.username+'&&\n',()=>{console.log('file is created')});
//()=>{file creatted}  ----> this is used to call callback wehn the programmed runned succesfully