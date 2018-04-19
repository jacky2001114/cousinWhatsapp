$(function(){
    localStorage.removeItem('menus')
renderMenus()
  $('#addMenuPanel').css('display','none')

  $('.4dollars').val('b')
  $('.6dollars').val('a')

    //4蚊餸
    $('.4dollars').on('change',function(){
        console.log($(this).val())
        $('.4dollars-output').append("<li ><span class="+"4dollars-item"+">"+$(this).val()+"</span>  <button class='4item-remove'>取消</button></li>")
        $(this).val('')
        
        
        $('.4item-remove').on('click',function(){
        
        
            $(this).parent().remove()
                
        
        })
    })
    $('.6dollars').on('change',function(){
        console.log($(this).val())
        $('.6dollars-output').append("<li ><span class="+"6dollars-item"+">"+$(this).val()+"</span>  <button class='6item-remove'>取消</button></li>")
        $(this).val('select')
        
        $('.6item-remove').on('click',function(){
         
        
           $(this).parent().remove()
               
          
       })
      })

    

    //submit
    $('.submit').on('click',function(){
      
        var num = $('.menu-num :selected').val();
        var fourItems = []
        var sixItems = []
        var spicy=$('.menu-spicy').val();
        var other =$('.menu-other').val();
        var drink=$('.menu-drink').val();

        var price = 0
        num<7?price+=24:price+=23
       
        other==''?other:other=','+other
        
        
        for(var i=0;i<$('.4dollars-item').length;i++){

            fourItems.push($('.4dollars-item').eq(i).html())
            price+=4

        }
        for(var i=0;i<$('.6dollars-item').length;i++){

            sixItems.push($('.6dollars-item').eq(i).html())
            price+=6
        }
        



        var menu = {
            'num':num,
            'fourItems':fourItems,
            'sixItems':sixItems,
            'spicy':spicy,
            'other':other,
            'drink':drink,
            'price':price,

        }

      
        

     

        
    var savearr=getMenus()
     
    
     savearr.push(menu)
     console.log(savearr)
     localStorage.setItem("menus", JSON.stringify(savearr));

        
     $('#addMenuPanel').css('display','none')
     
     $('.menu-num').val(1);
     $('.menu-spicy').val('唔辣');
     $('.menu-other').val('');
     $('.menu-drink').val('菊花茶')

     $('.6dollars-output').empty()
     $('.4dollars-output').empty()
     renderMenus()

    });

    //bind btn click function
    $('.back').on('click',function(){
        $('#addMenuPanel').css('display','none')
    })
    $('.btn-info').on('click',function(){
        $('#addMenuPanel').css('display','block')
    })


    //send
    $('.finish').on('click',function(){
        var arr=[]
        for(var i=0;i<$('.output-data').length;i++){
            arr.push($('.output-data').eq(i).text())
        }
      window.open("https://api.whatsapp.com/send?phone=85267325159&text="
      +arr.join('%0A')+'%0A'+'地點:聖若瑟英文中學','_blank');
    })
    $('.clear').on('click',function(){
        localStorage.removeItem('menus')
        renderMenus()
     })

   
    //function
    function getMenus(){
        menus = JSON.parse(localStorage.getItem("menus"));
        var savearr = []
        if(menus!=null){
           for(i=0;i<menus.length;i++){
   
               savearr.push(menus[i])
            }
           
        }
       
        return savearr
    }
    function renderMenus(){

        var menus = getMenus()
        
        $('.row').html('')


        for(var i=0;i<menus.length;i++){
            
            var num=i+1
            var items=[]
           if(menus[i].fourItems.length==0&&menus[i].sixItems.length==0){
                items='唔要餸';
           }else{
               
               items.push(menus[i].fourItems)
               items.push(menus[i].sixItems)
           }

           


            $('.row').append("<p class='finished-menu'data-num='"+i+"'><b>"+num+" : </b><label class='output-data'>"
            +menus[i].num+'號餐'+', '
            +items+','
            +menus[i].spicy
            +menus[i].other
            +',飲'+menus[i].drink
            
            +"</label><span>$:<label class='price'>"+ menus[i].price +'</label></span>'
            +"<button class='btn btn-danger menu-remove'>取消</button></p>"
        )

        }
        var total_price = 0;
        for(var i=0;i<$('.finished-menu .price').length;i++){
            //console.log('t',parseInt($('.finished-menu .price').eq(i).text()))
            
            total_price=total_price+parseInt($('.finished-menu .price').eq(i).text())
            //console.log(total_price)
        }
        
        $('.total-price').text(total_price)

        $('.menu-remove').on('click',function(){
         
            var menus = getMenus()     
            var num= $(this).parent().attr('data-num')
            // console.log(num)
            // console.log(menus)
            
            if(num==0){
              menus=menus.slice(1)
            //   console.log('slice')

            }else{
                menus.splice(num,1)
                // console.log('splice')
            }
               
               
            
           
              
            console.log(menus)
            localStorage.setItem("menus",JSON.stringify(menus));
    
            $(this).parent().remove()
        
           renderMenus()
        })
    }

   
  })

