$(function() {
    checklocalstorage()
    renderMenus()

    var set1 =
        `<option value="1">1. 芝士煙肉意粉</option>
    <option value="2">2. 英式肉醬意粉</option>
    <option value="3">3. 夏威夷豬扒焗飯</option>
    <option value="4">4. 白汁雞皇焗飯</option>
    <option value="5">5. 吞拿魚蘑菇意粉</option>
    <option value="6">6. 開心套餐-是日薄餅一件+炸雞一件+脆薯皇+炸洋蔥圈兩件</option>`

    var set2 =
        `<option value="1">1. 芝士煙肉意粉</option>
    <option value="2">2. 英式肉醬意粉</option>
    <option value="3">3. 白汁魚柳意粉</option>
    <option value="4">4. 墨西哥雞扒飯</option>
    <option value="5">5. 洋蔥豬扒飯</option>
    <option value="6">6. 開心套餐-是日薄餅一件+炸雞一件+脆薯皇+炸洋蔥圈兩件</option>`

    var set3 =
        `<option value="1">1. 芝士煙肉意粉</option>
    <option value="2">2. 英式肉醬意粉</option>
    <option value="3">3. 白汁煙鴨胸意粉</option>
    <option value="4">4. 咖哩豬扒焗飯</option>
    <option value="5">5. 香草烤雞焗飯</option>
    <option value="6">6. 開心套餐-是日薄餅一件+炸雞一件+脆薯皇+炸洋蔥圈兩件</option>`

    var set4 =
        `<option value="1">1. 芝士煙肉意粉</option>
    <option value="2">2. 英式肉醬意粉</option>
    <option value="3">3. 黑椒雞扒飯</option>
    <option value="4">4. 咖哩魚柳飯</option>
    <option value="5">5. 茄汁豬柳飯</option>
    <option value="6">6. 開心套餐-是日薄餅一件+炸雞一件+脆薯皇+炸洋蔥圈兩件</option>`


    var todayset = set1;
    var today = new Date().getDate()

    if (today >= 1 && today <= 7) {
        todayset = set1
    } else if (today >= 8 && today <= 14) {
        todayset = set2
    } else if (today >= 15 && today <= 22) {
        todayset = set3
    } else if (today >= 23) {
        todayset = set4
    }

    $('.menu-num').html(todayset)
    //submit
    $('.submit').on('click', function() {

        var num = $('.menu-num :selected').val();
        var item = $('.7dollars :selected').text();
        var drink = $('.menu-drink').val();

        var price = 31

        if (item == '唔加') {
            item = '';
        } else {
            item = ',加' + item;
            price += 7
        }




        var menu = {
            'obejct': 'Yes',
            'num': num,
            'item': item,
            'drink': drink,
            'price': price

        }


        var savearr = getMenus()


        savearr.push(menu)
        console.log(savearr)
        localStorage.setItem("chubbymenus", JSON.stringify(savearr));


        $('#addMenuPanel').fadeOut(200);

        $('.gp-soup').fadeIn(200)
        $('.menu-num ').val(1);
        $('.7dollars ').val("唔加");


        renderMenus()

    });

    //bind event 



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
        window.open("https://api.whatsapp.com/send?phone=85253937702&text=" +
            arr.join('%0A') + '%0A' +
            '地點:' + place +
            '%0A' +
            '時間' + time, '_blank');
    })
    $('.clear').on('click', function() {
        localStorage.removeItem('chubbymenus')
        renderMenus()
    })


    //function
    function getMenus() {
        menus = JSON.parse(localStorage.getItem("chubbymenus"));
        var savearr = []
        if (menus != null) {
            for (i = 0; i < menus.length; i++) {

                savearr.push(menus[i])
            }

        }

        return savearr
    }


    function checklocalstorage() {

        var str = localStorage.getItem("chubbymenus");

        if (str != null) {
            str.indexOf("obejct") == -1 ? localStorage.removcousinme : console.log('checklocalstorage success')
        }


    }


    function renderMenus() {

        var menus = getMenus()

        $('.row').html('')


        for (var i = 0; i < menus.length; i++) {

            var num = i + 1




            $('.row').append("<p class='finished-menu'data-num='" + i + "'><b>" + num + " : </b><label class='output-data'>" +
                menus[i].num + '號餐' +
                menus[i].item +
                ',' + menus[i].drink

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
            localStorage.setItem("chubbymenus", JSON.stringify(menus));

            $(this).parent().remove()

            renderMenus()
        })
    }


})