$(function(){
    renderMenus()
  $('#addMenuPanel').css('display','none')

    //4蚊餸
    $('.4dollars').on('change',function(){
      console.log($(this).val())
      $('.4dollars-output').append("<li ><span class="+"4dollars-item"+">"+$(this).val()+"</span>  <button class='4item-remove'>取消</button></li>")
      $('.4item-remove').on('click',function(){
       
      
         $(this).parent().remove()
             
        
     })
    })
    $('.6dollars').on('change',function(){
        console.log($(this).val())
        $('.6dollars-output').append("<li ><span class="+"6dollars-item"+">"+$(this).val()+"</span>  <button class='6item-remove'>取消</button></li>")
        $('.6item-remove').on('click',function(){
         
        
           $(this).parent().remove()
               
          
       })
      })

    

    //sumbit
    $('.submit').on('click',function(){
      
        var num = $('.menu-num').val();
        var spicy=$('.menu-spicy').val();
        var other =$('.menu-other').val();
        var drink=$('.menu-drink').val();

        var items = []
        
        for(var i=0;i<$('.4dollars-item').length;i++){

            items.push($('.4dollars-item').eq(i).html())

        }
        for(var i=0;i<$('.6dollars-item').length;i++){

            items.push($('.6dollars-item').eq(i).html())

        }
        if(items.length>0){
            items= ',餸 : '+items
        }else{
           items='唔要餸'
        }


        var menu=
                num
                +'號餐 '
                +items             
                +" , "
                +spicy
                +" , "
                +other
                +' 飲'
                +drink

     

        
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
      window.open("https://api.whatsapp.com/send?phone=85267325159&text="
      +getMenus().join('%0A')+'%0A'+'地點:聖若瑟英文中學','_blank');
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
        if(menus[0]==null){
            delete menus[0]
        }
        $('.row').html('')
        for(var i=0;i<menus.length;i++){
            
            var num=i+1

            $('.row').append("<p class='finished-menu'data-num='"+i+"'>"+num+' : '
            +menus[i]
            +"<button class='btn btn-danger menu-remove'>取消</button></p>"
        )
        }
        
     

        $('.menu-remove').on('click',function(){
         
            var menus = getMenus()     
            var num= $(this).parent().attr('data-num')
            console.log(num)
            console.log(menus)
            
            if(num==0){
              menus=menus.slice(1)
              console.log('slice')

            }else{
                menus.splice(num,1)
                console.log('splice')
            }
               
               
            
           
              
            console.log(menus)
            localStorage.setItem("menus",JSON.stringify(menus));
    
            $(this).parent().remove()
        
           renderMenus()
        })
    }

   
  })

