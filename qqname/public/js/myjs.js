var biaotili=document.querySelectorAll('#biaoti li');
// console.log(biaotili);
for(var i=0;i<biaotili.length;i++){
    biaotili[i].onmouseover=function(){

        for(var i=0;i<biaotili.length;i++){
            this.style.background="rgb(14, 229, 236)";
            


        }

    }
    biaotili[i].onmouseout=function(){

        for(var i=0;i<biaotili.length;i++){
       
            this.style.background="pink";

        }

    }
}

var contenterli=document.querySelectorAll('#contenter li');

// console.log(contenterli);
// for(var j=0;j<10;j++){
//     //rgb格式随机数
//     var r=Math.floor(Math.random()*256);
//     var g=Math.floor(Math.random()*256);
//     var b=Math.floor(Math.random()*256);
//     // console.log(r);
// }
// contenterli.style.background="rgb('+r+','+g+','+b+')";
// contenterli.style.background="pink";
for(var i=0;i<contenterli.length;i++){
    contenterli[i].onmouseover=function(){
       
      
        this.style.background="pink";
        
        }

   
    contenterli[i].onmouseout=function(){

        for(var i=0;i<contenterli.length;i++){
       
            this.style.background="#fff";

        }

    }
}
