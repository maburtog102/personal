(function($) {
    "use strict";   
    var removeAllDigits = function($element) {
        $element.removeClass("digit0 digit1 digit2 digit3 digit4 digit5 digit6 digit7 digit8 digit9");
    };
    
    var setItem = function(_el, _n) {
        var id=$(_el).attr('id');
        var token = `#${id} :first-child`;
        var $element = $(token).next(); // second child
    
        removeAllDigits($element);
        $element.addClass("digit" + _n);
    };
    
    
    var init = function(_el,_n) {
       setItem(_el,_n);
    };
    
    var switchItem = function( _el,_n, capacity,obj_vel, stopIn, ultimo=false, sound) {
         
        sound.pause();
        sound.volume = 0.02;
        sound.currentTime = 0;
        sound.play();
        
        if(obj_vel.cancelado)
        {
            $(_el).remove();
            return;
        }
        var nextDigit = (_n === 0) ? capacity : (_n - 1);
    
        //$("#log2").text("digit" + digit + ", next digit: " + nextDigit);
        var id=$(_el).attr('id');
        var token = `#${id} :first-child`;
        var $element = $(token).next(); // second child
    
        removeAllDigits($element);
        $element.addClass("digit" + _n);
        $element.after('<div class="digit digit' + nextDigit + '" style="margin-top: 165px"></div>');
    
        var $newElement = $element.next();
        
        $element.animate({
            "margin-top": -165
        }, obj_vel._v, !ultimo?"linear": 'easeOutQuart'/*window.modoAnim */, function () { 
           
           if(!ultimo) 
           {
            $element.remove(); 
            checkA( _el,_n,obj_vel,stopIn, sound);
           }
           
        });
    
        $newElement.animate({
            "margin-top": 0
        }, obj_vel._v, !ultimo?"linear": 'easeInOutBounce' /*window.modoAnim */, function(){
            if(!ultimo) 
            checkB( _el,_n,obj_vel,stopIn, sound);
           // else
           //lastBounce($newElement);
        });


        if(ultimo)
        {
            const baseUri = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');

           var ultimoaudio=   new Audio(baseUri +'/sounds/s2.mp3');
           ultimoaudio.volume = 0.4;
           ultimoaudio.play(); 
           window.Detenidos++;
            if(window.Detenidos>= window.Digitos)
            { 
        window.Corriendo =false;
        window.UserStop=false;
        $('#btnPlay').show();
        $('#btnStop').hide();
        $('#btnDeteniendo').hide();

        MostrarGanador();
        }
    }
    };

    function lastBounce($element)
    {
$($element).animate({'margin-top':'-20px'},20,'linear',function(){
 
    $($element).animate({'margin-top':'0px'},'slow','easeOutBounce',function(){

    });

});
    }
    var chka=false;
    var chkb=false;
     function checkA( _el,_n,obj_vel,stopIn, sound){
        chka=true;
        if(chka && chkb)
        {
            chka=false;
            chkb=false; 
            tick( _el,_n,obj_vel, stopIn,sound);
        }
     }
     function checkB( _el,_n,obj_vel,stopIn, sound){
        chkb=true;
        if(chka && chkb)
        {
            chka=false;
            chkb=false; 
            tick( _el,_n,obj_vel,stopIn, sound);
        }
    }
    
    var tick = function(_el,_n,obj_vel,stopIn, sound)
    { 
        var limite = _n-1;
        if(limite == -1) limite = 9;

        if ( $(_el).hasClass('stoped') && stopIn==limite) 
        {  
            _n--;
            if(_n==-1)
            _n=9; 
          switchItem(_el,_n, 9,obj_vel, stopIn, true,sound);
          return;
        };

        _n--;
        if(_n==-1)
        _n=9; 
        switchItem(_el,_n, 9,obj_vel, stopIn,false, sound);
        
     
    };
    $.fn.Stop = function() {  
    
    this.remove();

    }; 
    $.fn.CounterInit = function(start,stopIn, StartVelocity, sound) {    
        //iniciar con 1000   bajar a 10 y regresar a 1000
        var t=window.segundosEspera;
        var velocidad = StartVelocity;
       var _el = this;
       stopIn++;
       if(stopIn==10)
       stopIn=0;

       var obj_vel = { _v : velocidad};

       $(_el).removeClass('stoped');

       var _n = start;  
       var stop=false;      
        init(_el,_n);        
        tick(_el,_n,obj_vel, stopIn,sound); 
  
          var v=obj_vel._v ;
          var cuarto=Math.round( t/4);
          var t1=cuarto;    
          var t2=t1+cuarto; 
          var t3=t;
          var paso = Math.trunc(1100/cuarto);
          var i=0;
          var handle =  setInterval(function(){  //cada x segundos
            if(i!=t2 || window.UserStop)
            {
              /***********************/
           if(i!=0)
           {      
            if(i<=t1) //primer cuarto, aumento de velocidad
            {
            v=obj_vel._v - paso;  
            if(v<150) 
               v= 80;
            obj_vel._v = v;  
            }
            else if(i>t2&&i<=t3)
            {
                v=obj_vel._v + paso;  
            if(v>1000) 
               v= 1000;
            obj_vel._v = v;  
            }
            else if(i>t3)
              {
                clearInterval(handle);
                $(_el).addClass('stoped');
              }
            }
            //Detener incremento hasta que se de click al boton Stop
            i++;
        }
            /*************************/
          }, 1000);
          window.Procesando.push(handle);
          /*
          setTimeout(() => { //Una vez
            clearInterval(handle);
             $(_el).addClass('stoped');
            }, t*1000);  
            */
            return obj_vel;
    };
    })(jQuery);
    