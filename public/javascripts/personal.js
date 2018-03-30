/*user页面的显示跟隐藏*/

$('.biaoti').click(function (e) {
    let dianjishumu = $(this).index();
    $('.pay').eq(dianjishumu - 1).fadeIn().siblings().fadeOut()
    $('.biaoti').eq(dianjishumu - 1).addClass('pc_active').siblings().removeClass('pc_active');
})

/*页面加载时调用*/
$(function () {
    getuser()
    getaddress()
    getorder()
})

/*头像更换预览*/
function preview2(file) {
    var prevDiv = document.getElementById('avatar');
    if (file.files && file.files[0]) {
        var filename = file.value;
        var index = filename.lastIndexOf('.');
        var suffix = filename.substring(index);
        $("#suffix").val(suffix)
        var reader = new FileReader();
        reader.onload = function (evt) {
            $("#imgdata").val(evt.target.result)
            prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
        }
        reader.readAsDataURL(file.files[0]);
    } else {
        prevDiv.innerHTML = '<img style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'">';
    }
}

/*获取当前登陆个人信息*/
function getuser() {
    $.get('/personal/user', function (data) {
        if (data.status == 1) {
            let user = data.result;
            $('#email').text(user.email);
            $('#nickname').text(user.nickname);

            if (user.sex == 1) {
                $('#sex1').text("男");
            } else {
                $('#sex1').text("女");
            }
            $('#phone').text(user.phone);
            if (user.avatar) {
                var html = '';
                html += '<img src="/uploads/' + user.avatar + '" alt="">'
                $('#avatar').html(html);
            } else {
                var html = '';
                html += '<img src="/images/man.svg" alt="">'
                $('#avatar').html(html);
            }
            $('#phone1').text(user.phone);
            $('#newnickname').val(user.nickname);
            $('#newsex input:radio:checked').val(user.sex);
            $('#phone').val(user.phone);
        }
        else {
            console.log(data.status)
        }
    })
}

/*更新个人信息*/
function update() {
    var imgdata = $("#imgdata").val();
    var suffix = $("#suffix").val();
    var nickname = $('#newnickname').val();
    var newsex = $('#newsex input:radio:checked').val();
    var phone = $('#phone').val();
    $.post('/personal/user', {
        nickname: nickname,
        newsex: newsex,
        phone: phone,
        imgdata: imgdata,
        suffix: suffix
    }, function (data) {
        if (data.status == 1) {
            layer.msg(data.msg);
            getuser();
        } else {
            layer.msg(data.msg);
        }
    })
}

/*修改当前密码*/

function updatepassword() {
    var password = $('#password').val();
    var repassword = $('#repassword').val();
    var newpassword = $('#newpassword').val();
    if (newpassword != repassword) {
        layer.msg('两次密码输入不一致！请重新输入')
    }
    else if (password == '') {
        layer.msg('原密码不能为空！')
    }
    else if (newpassword == '') {
        layer.msg('新密码不能为空！')
    }
    else {
        $.post('/personal/updatewd', {
            password: password,
            newpassword: newpassword
        }, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                setTimeout("location.href='/login';", 1000);
            }
            else {
                layer.msg(data.msg);
            }

        })
    }

}

/*获取所有收货地址*/

function getaddress() {
    $.get('/personal/address', function (data) {
        if (data.status == 1) {
            var address = data.result.address;
            var html = '';
            for (var i = 0; i < address.length; i++) {
                html += '<tr>'
                if (address[i].name) {
                    html += '<td>' + address[i].name + '</td>'
                }
                else {
                    html += '<td>无</td>'
                }
                if (address[i].address) {
                    html += '<td>' + address[i].address + '</td>'
                } else {
                    html += '<td>无</td>'
                }
                if (address[i].address) {
                    html += '<td>' + address[i].address + '</td>'
                } else {
                    html += '<td>无</td>'
                }
                html += '<td>110045</td>'
                if (address[i].phone) {
                    html += '<td>' + address[i].phone + '</td>'
                }
                else {
                    html += '<td>无</td>'
                }

                html += '<td><a href="" onclick="editaddress(\'' + i + '\')" data-toggle="modal" data-target="#xinzengdizhi">修改</a>/<a href="javascript:;" onclick="delete_address(\'' + i + '\')">删除</a></td>'
                if (address[i].default == 1) {
                    html += '<td>\n' +
                        '            <button class="btn btn1"\n' +
                        '                >默认地址\n' +
                        '                </button>\n' +
                        '                </td>'
                }
                else {
                    html += ' <td>\n' +
                        '                            <button class="btn btn2" onclick="Moren(\'' + i + '\')" \n' +
                        '                            >设为默认\n' +
                        '                            </button>\n' +
                        '                        </td>'
                }

                html += '</tr>'
            }
            $('#address').html(html);

        }
        else {
            layer.msg(data.msg);
        }
    })
}

$("#xinzeng").click(function () {
    $('#id').val();
    $('#address_dizhi').val('');
    $('#address_phone').val('');
    $('#address_name').val('');
})

/*保存跟修改地址*/
function addDress() {
    let index = $('#id').val();
    let name = $('#address_name').val();
    let phone = $('#address_phone').val();
    let address = $('#address_dizhi').val();
    if (index) {
        $.post('/personal/update', {
            index: index,
            name: name,
            phone: phone,
            address: address
        }, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                getaddress();
            } else {
                layer.msg(data.msg);
            }
        })
    }
    else {
        $.post('/personal/add_address', {
            name: name,
            phone: phone,
            address: address
        }, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                getaddress();
            } else {
                layer.msg(data.msg);
            }
        })
    }

}

/*获取地址详情*/

function editaddress(e) {
    $('#id').val(e);
    let id = e;
    $.get('/personal/get_address',
        {id: id}, function (data) {
            if (data.status == 1) {
                $('#address_name').val(data.result.name);
                $('#address_phone').val(data.result.phone);
                $('#address_dizhi').val(data.result.address);
            } else {
                console.log(data.msg);
            }
        })
}

/*删除地址*/
function delete_address(a) {
    let index = a;
    layer.confirm('是否删除？', {
        btn: ['是', '否']
    }, function () {
        $.post('/personal/del', {
            index: index
        }, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                getaddress();
            } else {
                layer.msg(data.msg);
            }
        })
    })

}

/*设置默认地址*/
function Moren(r) {
    let index = r;
    $.get('/personal/moren', {
        index: index
    }, function (data) {
        if (data.status == 1) {
            layer.msg(data.msg);
            getaddress();
        } else {
            layer.msg(data.msg);
        }
    })
}

/*获取订单信息*/
function getorder() {
    $.get('/personal/order', function (data) {
        if (data.status == 1) {
            let orderlist = data.result;
            let html = ''
            for (var i = 0; i < orderlist.length; i++) {
                if (orderlist[i].status == 1) {
                    html += '<tr>'
                    html += '<td>' + orderlist[i].order_num + '</td>'
                    html += '<td>' +orderlist[i].book[0].name+'</td>'
                    html += '  <td>' + orderlist[i].total_price + '</td>'
                    html += '<td>' + orderlist[i].create_at + '</td>'

                    html += '<td>未付款</td>'
                    html += '<td>未完成</td>'
                    html += '<td><button class="btn-danger btn" onclick="pay(\''+ orderlist[i].order_num +'\')">付款</button>\n' +
                        '                <p class="text-muted">取消订单</p>\n' +
                        '                <p class="text-danger">查看</p>\n' +
                        '                </td>\n' +
                        '                </tr>'
                }
            }
            $('#order').html(html);


        } else {

        }
    })
}

function pay(a) {
    $('#myneedorder').show();
    $('#myorder').hide();
    let order_num=a;
    $.post('/personal/pay_order',{
        order_num:order_num
    },function (data) {

    })
}