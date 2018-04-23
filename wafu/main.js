$(function() {
    checklocalstorage()
    renderMenus()

    var set1 =
   `<option value="A">A. 蒜香煙鴨胸火腿粒炒飯</option>
    <option value="B">B. 日式雞扒拼燒豬頸肉飯</option>
    <option value="C">C. 印度咖哩薯仔豬扒飯</option>
    <option value="D">D. 黑椒汁西冷牛扒腸仔飯</option>
    <option value="E">E. 卡邦尼煙肉火腿燴意粉</option>
    <option value="F">F. 京都豬扒飯</option>
    <option value="1">1. 焗芝士鮮茄豬片飯</option>
    <option value="2">2. 焗芝士肉醬腸片意粉</option>`

    var set2 =
   `<option value="A">A. 揚州炒飯</option>
    <option value="B">B. 日式雞扒拼金菇肥牛卷飯</option>
    <option value="C">C. 印度咖哩薯仔牛腩飯</option>
    <option value="D">D. 燒汁香草雞扒拼漢堡扒飯</option>
    <option value="E">E. 意式茄茸火腿肉醬燴意粉</option>
    <option value="F">F. 椒鹽豬扒飯</option>
    <option value="1">1. 焗芝士鮮茄豬片飯</option>
    <option value="2">2. 焗芝士肉醬腸片意粉</option>`

    var set3 =
   `<option value="A">A. XO醬菠蘿雞粒炒飯</option>
    <option value="B">B. 日式和風牛柳粒飯</option>
    <option value="C">C. 印度咖哩吉列豬扒飯</option>
    <option value="D">D. 台式肉燥蛋雞扒飯</option>
    <option value="E">E. 香草忌廉芝士海鮮燴意粉</option>
    <option value="F">F. 京都豬扒飯</option>
    <option value="1">1. 焗芝士鮮茄豬片飯</option>
    <option value="2">2. 焗芝士肉醬腸片意粉</option>`



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

    $('.menu-num').html(todayset)

    $('.3dollars').val('none');
    $('.4dollars').val('none');

    //submit
    $('.submit').on('click', function() {

        var num = $('.menu-num :selected').val();      
        var drink = $('.drink-item').html();
        var price = 25

        if (drink == '唔飲野') {
            drink = ',唔飲野';
        } else {
            drink = ',飲:' + drink;
            price += parseInt($('.drink-item').attr('data-price'));
        }
        
        var menu = {
            'obejct': 'Yes',
            'num': num,      
            'drink': drink,
            'price': price

        }
        console.log(menu)

        var savearr = getMenus()


        savearr.push(menu)
        console.log(savearr)
        localStorage.setItem("wafumenus", JSON.stringify(savearr));


        $('#addMenuPanel').fadeOut(200);

        $('.menu-num ').val(1);
        $('.3dollars').val('none');
        $('.4dollars').val('none');
        $('.drink-remove').remove()
        $('.drink-item').text('唔飲野');
       


           


     

        renderMenus()

    });

    //bind event 
    //飲品
    $('.3dollars').on('change', function() {
        
        $('.drink-output').html("<li ><span class=" + "drink-item"  + " data-price='3' >" + $('.3dollars :selected').text() + "</span><button class='drink-remove'>取消</button></li>")
        $('.4dollars').val('')


        $('.drink-remove').on('click', function() {


            $(this).parent().html("<span class='drink-item'>唔飲野</span>")


        })
    })
    $('.4dollars').on('change', function() {
        
        $('.drink-output').html("<li ><span class=" + "drink-item" + " data-price='4'>" + $('.4dollars :selected').text() + "</span><button class='drink-remove'>取消</button></li>")
        $('.3dollars').val('')


        $('.drink-remove').on('click', function() {


            $(this).parent().html("<span class='drink-item'>唔飲野</span>")


        })
    })
    

    $('.btn-info').on('click', function() {

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
                menus[i].num + '號餐'       
                + menus[i].drink
                +
                "</label><span>$:<label class='price'>" + menus[i].price + '</label></span>' +
                "<button class='btn btn-danger menu-remove'>取消</button></p>"
            )

        }
        var total_price = 0;
        for (var i = 0; i < $('.finished-menu .price').length; i++) {
            //console.log('t',parseInt($('.finished-menu .price').eq(i).text()))

            total_price = total_price + parseInt($('.finished-menu .price').eq(i).text())
            //console.log(total_price)
        }

        $('.total-price').text(total_price)

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




    
    function checklocalstorage() {

        var str = localStorage.getItem("wafumenus");

        if (str != null) {
            str.indexOf("obejct") == -1 ? localStorage.removcousinme : console.log('checklocalstorage success')
        }


    }

})