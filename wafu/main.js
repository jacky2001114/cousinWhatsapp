$(function() {
    checklocalstorage()
    renderMenus()

    var set1 =
    `
    <option value="A">A.黃金蟹子蔥花炒</option>
    <option value="B">B.日式鷄扒拼炸帶子飯</option>
    <option value="C">C.印度咖哩吉列豬扒飯</option>
    <option value="D">D.燒汁香草鷄扒拼漢堡扒飯</option>
    <option value="E">E.卡邦尼芝士煙肉火腿燴意粉</option>
    <option value="F">F.椒鹽豬扒條飯</option>
    <option value="1">1.焗芝士茄茸豬扒飯</option>
    <option value="2">2.焗芝士肉醬意粉</option>`

    var set2 =
    `
    <option value="A">A.蒜香煙鴨胸火腿粒炒飯</option>
    <option value="B">B.日式鷄扒拼金菇肥牛卷飯</option>
    <option value="C">C.印度咖哩薯仔鷄球飯</option>
    <option value="D">D.黑椒汁西冷牛扒飯</option>
    <option value="E">E.香草忌廉蜆肉虾仔燴意粉</option>
    <option value="F">F. XO醬豉汁涼瓜肉排飯</option>`

    var set3 =
    `
    <option value="A">A.欖菜火腿鷄粒炒飯</option>
    <option value="B">B.日式鷄扒拼豬肉漢堡扒飯</option>
    <option value="C">C.日式咖哩薯仔牛腩飯</option>
    <option value="D">D.黑椒汁豬頸肉腸仔飯</option>
    <option value="E">E.卡邦尼芝士煙肉火腿燴意粉</option>
    <option value="F">F.椒鹽豬扒條飯</option>
    <option value="G">G.焗白汁忌廉蚧柳雞皇飯</option>
    <option value="H">H.日式鰻魚配肥牛飯</option>`

    var setAllDay = 
    `
    <option value="湯一">湯一，牛腩.名門卷.配菜湯米線</option> 
    <option value="湯二">湯二，雞肉.名門卷.配菜湯烏冬</option>
    <option value="湯三">湯三，肥牛名.門卷.配菜湯烏冬</option>
    <option value="撈四">撈四，辣炸醬.肥牛.撈紅薯粉</option>`

    var todayset = set1;
    var today = new Date().getDay()

    if (today == 1 || today == 3) {
        todayset = set1
    } else if (today == 2 || today == 4) {
        todayset = set2
    } else if (today == 5) {
        todayset = set3
    } else {
        todayset = set1
    }
    todayset += setAllDay

    $('.menu-num').html(todayset)

    $('.3dollars').val('唔飲野');
   

    //submit
    $('.submit').on('click', function() {

        var num = $('.menu-num :selected').val();      
        var drink = $('.3dollars :selected').val();
        var price = 25

      
        var menu = {
            'obejct': 'Yes',
            'num': num,      
            'drink': drink,
            'price': price
        }
        //console.log(menu)

        var savearr = getMenus()

        savearr.push(menu)
        //console.log(savearr)
        localStorage.setItem("wafumenus", JSON.stringify(savearr));

        $('#addMenuPanel').fadeOut(200);

        $('.menu-num ').val(1);
        $('.3dollars').val('none');
        $('.4dollars').val('none');
        $('.drink-remove').remove()
        $('.3dollars').val('唔飲野');
       
        renderMenus()

    });

    //bind event 
    //飲品
    // $('.3dollars').on('change', function() {
        
    //     $('.drink-output').html("<li ><span class=" + "drink-item"  + " data-price='3' >" + $('.3dollars :selected').text() + "</span><button class='drink-remove'>取消</button></li>")
    //     $('.4dollars').val('')


    //     $('.drink-remove').on('click', function() {


    //         $(this).parent().html("<span class='drink-item'>唔飲野</span>")


    //     })
    // })
    // $('.4dollars').on('change', function() {
        
    //     $('.drink-output').html("<li ><span class=" + "drink-item" + " data-price='4'>" + $('.4dollars :selected').text() + "</span><button class='drink-remove'>取消</button></li>")
    //     $('.3dollars').val('')


    //     $('.drink-remove').on('click', function() {


    //         $(this).parent().html("<span class='drink-item'>唔飲野</span>")


    //     })
    // })
    

    $('.btn-info#addBtn').on('click', function() {

        $('#addMenuPanel').fadeIn(200)


    })

    $('.back').on('click', function() {
        $('#addMenuPanel').fadeOut(200);
    })



    //send
    $('.finish').on('click', function() {

        var arr = []
        var place = $('.place').val()
        var time = $('.time').val()
        for (var i = 0; i < $('.output-data').length; i++) {
            arr.push($('.output-data').eq(i).text())
        }
        window.open("https://api.whatsapp.com/send?phone=85293886637&text=" +
            arr.join('%0A') + '%0A' +
            '地點:' + place +
            '%0A' +
            '時間' + time, '_blank');
    })
    $('.clear').on('click', function() {
        localStorage.removeItem('wafumenus')
        renderMenus()
    })


    //function
    function getMenus() {
        menus = JSON.parse(localStorage.getItem("wafumenus"));
        var savearr = []
        if (menus != null) {
            for (i = 0; i < menus.length; i++) {

                savearr.push(menus[i])
            }

        }

        return savearr
    }


    function renderMenus() {

        var menus = getMenus()

        $('.row').html('')

        for (var i = 0; i < menus.length; i++) {

            var num = i + 1

            $('.row').append("<p class='finished-menu'data-num='" + i + "'><b>" + num + " : </b><label class='output-data'>" +
                menus[i].num + '號餐, ' + 
                menus[i].drink +
                "</label><label class='price'>" /*+ menus[i].price + */ + '</label>' +
                "<button class='btn btn-danger menu-remove'>取消</button></p>"
            )

        }
        /*
        var total_price = 0;
        for (var i = 0; i < $('.finished-menu .price').length; i++) {
            //console.log('t',parseInt($('.finished-menu .price').eq(i).text()))

            total_price = total_price + parseInt($('.finished-menu .price').eq(i).text())
            //console.log(total_price)
        }

        $('.total-price').text(total_price)
*/
        $('.menu-remove').on('click', function() {

            var menus = getMenus()
            var num = $(this).parent().attr('data-num')
            // console.log(num)
            // console.log(menus)

            if (num == 0) {
                menus = menus.slice(1)
                //   console.log('slice')

            } else {
                menus.splice(num, 1)
                // console.log('splice')
            }




            console.log(menus)
            localStorage.setItem("wafumenus", JSON.stringify(menus));

            $(this).parent().remove()

            renderMenus()
        })
    }


    $('#toSJACSbtn').click(function() {
        $('.place').val('聖若瑟英文中學');
        $('.time').val('12:05');
    })

    $('#toSYSSbtn').click(function() {
        $('.place').val('聖言中學');
        $('.time').val('12:55');
    })




    
    function checklocalstorage() {

        var str = localStorage.getItem("wafumenus");

        if (str != null) {
            str.indexOf("obejct") == -1 ? localStorage.removcousinme : console.log('checklocalstorage success')
        }


    }

})