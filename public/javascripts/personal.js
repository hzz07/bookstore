
$(function () {
    getuser()
})



function getuser(){
    $.get('/personal/user',{},function (data) {
        if(data.status==1){
            let user=data.result;
            console.log(user)
        }
        else{
            console.log(data.status)
        }
    })
}
