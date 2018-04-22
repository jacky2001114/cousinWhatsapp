$(function() {
    checklocalstorage()
    renderMenus()

    $('.4dollars').val('b')
    $('.6dollars').val('a')
    //4蚊餸
    $('.4dollars').on('change', function() {
        console.log($(this).val())
        $('.4dollars-output').append("<li ><span class=" + "4dollars-item" + ">" + $(this).val() + "</span>  <button class='4item-remove'>取消</button></li>")
        $(this).val('')


        $('.4item-remove').on('click', function() {


            $(this).parent().remove()


        })
    })
    $('.6dollars').on('change', function() {
        console.log($(this).val())
        $('.6dollars-output').append("<li ><span class=" + "6dollars-item" + ">" + $(this).val() + "</span>  <button class='6item-remove'>取消</button></li>")
        $(this).val('select')

        $('.6item-remove').on('click', function() {


            $(this).parent().remove()


        })
    })
    //submit
    $('.submit').on('click', function() {

        var num = $('.menu-num :selected').val();
        var soup = $('.menu-soup').val();
        var fourItems = []
        var sixItems = []
        var spicy = $('.menu-spicy').val();

        var other = $('.menu-other').val();
        var drink = $('.menu-drink').val();

        var price = 0
        if (num < 7) {
            price += 24
            soup = '湯底:' + soup + ','
        } else {
            price += 23
            soup = ''
        }

        other == '' ? other : other = ',' + other

        //if 加底
        if ($("#checkbox1").prop('checked')) {
            other += ',加底'
            price += 8
        }

        for (var i = 0; i < $('.4dollars-item').length; i++) {

            fourItems.push($('.4dollars-item').eq(i).html())
            price += 4

        }
        for (var i = 0; i < $('.6dollars-item').length; i++) {

            sixItems.push($('.6dollars-item').eq(i).html())
            price += 6
        }



        var menu = {
            'obejct': 'Yes',
            'num': num,
            'soup': soup,
            'fourItems': fourItems,
            'sixItems': sixItems,
            'spicy': spicy,
            'other': other,
            'drink': drink,
            'price': price,

        }


        var savearr = getMenus()


        savearr.push(menu)
        console.log(savearr)
        localStorage.setItem("cousinmenus", JSON.stringify(savearr));


        $('#addMenuPanel').fadeOut(200);

        $('.menu-num').val(1);
        $('.menu-soup').val('清湯');
        $('.menu-spicy').val('唔辣');
        $("#checkbox1").prop("checked", false);
        $('.menu-other').val('');
        $('.menu-drink').val('菊花茶')
        $('.gp-soup').fadeIn(200)
        $('.6dollars-output').empty()
        $('.4dollars-output').empty()
        renderMenus()

    });

    //bind event 
    $('.menu-num').on('click', function() {
        if ($(this).val() > 6) {
            $('.gp-soup').fadeOut(200)
        } else {
            $('.gp-soup').fadeIn(200)
        }
    })


    $('.btn-info').on('click', function() {

        $('#addMenuPanel').fadeIn(200)
        $('.gp-soup').fadeIn(100)

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

        window.open("https://api.whatsapp.com/send?phone=85267325159&text=" +
            arr.join('%0A') + '%0A' +
            '地點:' + place +
            '%0A' +
            '時間' + time, '_blank');
    })


    $('.clear').on('click', function() {
        localStorage.removeItem('cousinmenus')
        renderMenus()
    })


    //function
    function getMenus() {
        menus = JSON.parse(localStorage.getItem("cousinmenus"));
        var savearr = []
        if (menus != null) {
            for (i = 0; i < menus.length; i++) {

                savearr.push(menus[i])
            }

        }
        return savearr
    }


    function checklocalstorage() {

        var str = localStorage.getItem("cousinmenus");

        if (str != null) {
            str.indexOf("obejct") == -1 ? localStorage.removcousinme : console.log('checklocalstorage success')
        }


    }


    function renderMenus() {

        var menus = getMenus()

        $('.row').html('')


        for (var i = 0; i < menus.length; i++) {

            var num = i + 1
            var items = []
            if (menus[i].fourItems.length == 0 && menus[i].sixItems.length == 0) {
                items = '唔要餸';
            } else {

                items.push(menus[i].fourItems)
                items.push(menus[i].sixItems)
            }




            $('.row').append("<p class='finished-menu'data-num='" + i + "'><b>" + num + " : </b><label class='output-data'>" +
                menus[i].num + '號餐' + ', ' +
                menus[i].soup +
                items + ',' +
                menus[i].spicy +
                menus[i].other +
                ',飲' + menus[i].drink

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
            localStorage.setItem("cousinmenus", JSON.stringify(menus));

            $(this).parent().remove()

            renderMenus()
        })
    }


})