//Ex10-클릭한 컬럼을 기준으로 레코드 정렬하기 #1
window.addEventListener("load",function(){
    var notice = [
        {id:1,title:"퐈이야~~",regDate:"2020-10-28",writerId:"ttt",hit:2},
        {id:2,title:"하이야~~",regDate:"2020-10-28",writerId:"yyy",hit:0},
        {id:3,title:"하이야~~",regDate:"2020-10-28",writerId:"yyy",hit:0},
        {id:4,title:"하이야~~",regDate:"2020-10-28",writerId:"yyy",hit:0},
        {id:5,title:"하이야~~",regDate:"2020-10-28",writerId:"yyy",hit:0}
    ];

    var section = document.querySelector("#section10");

    var noticeList = section.querySelector(".notice-list");
    var titIdTd = section.querySelector(".title");
    var tbodyNode = noticeList.querySelector("tbody");

    var bindData = function(){

        var template = section.querySelector("template");

        for(var i =0;i<notice.length;i++){

            var cloneNode = document.importNode(template.content, true);
            var tds = cloneNode.querySelectorAll("td"); //td 5개짜리 
            tds[0].textContent = notice[i].id;
            //tds[1].innerHTML = '<a href="'+notice[0].id+'">'+ notice[0].title+'</a>';
    
            var aNode = tds[1].children[0];
            aNode.href= notice[i].id;
            aNode.textContent = notice[i].title;
    
    
            tds[2].textContent = notice[i].regDate;
            tds[3].textContent = notice[i].writerId;
            tds[4].textContent = notice[i].hit;
    
    
            tbodyNode.append(cloneNode);
        };
    };

    bindData();

    var titleSorted = false;

    titIdTd.onclick = function(){

        tbodyNode.innerHTML=""; //빈문자

        if(!titleSorted)
        notice.sort(function(a,b){

            titleSorted = true;

                if(a.title < b.title)
                    return -1;
                else if(a.title > b.title)
                    return 1;
                else
                    return 0;
        });
        else
            notice.reverse(); //뒤집기

        bindData();//화면을 바꿔줌

        

    };
});

//Ex9-다중 노드선택 방법과 일괄삭제, 노드의 자리바꾸기
window.addEventListener("load",function(){
    var section = document.querySelector("#section9");

    var noticeList = section.querySelector(".notice-list");
    var tbody = noticeList.querySelector("tbody");
    var allCheckBox = section.querySelector(".overall-checkbox");
    var delBtn = section.querySelector(".del-button");
    var swapBtn = section.querySelector(".swap-button");

    allCheckBox.onchange = function(){
        //allCheckBox.value;//on 초기값'

        var inputs = tbody.querySelectorAll("input[type='checkbox']");
        for(var i=0;i<inputs.length;i++)
            inputs[i].checked =  allCheckBox.checked;
       
    };

    delBtn.onclick = function(){
        var inputs = tbody.querySelectorAll("input[type='checkbox']:checked");//체크된녀석만 가지옴 

        //if(inputs[0].checked)

        for(var i = 0;i<inputs.length; i++)
            inputs[i].parentElement.parentElement.remove(); //tr을 삭제 
    }

    swapBtn.onclick = function(){
        var inputs = tbody.querySelectorAll("input[type='checkbox']:checked");//체크된녀석만

        if(inputs.length!=2){
            alert("엘리먼트는 2개를 선택해야만 합니다");
            return;
        }

        var trs = [];
        for(var i =0;i<inputs.length;i++)
            trs.push(inputs[i].parentElement.parentElement);
        
        var cloneNode = trs[0].cloneNode(true);//노드 복사
        trs[1].replaceWith(cloneNode);
        trs[0].replaceWith(trs[1]);
    }
    
})

//Ex8-노드 삽입과 바꾸기
window.addEventListener("load",function(){
    var section = document.querySelector("#section8");

    var noticeList = section.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("tbody");
    var upBtn = section.querySelector(".up-button");
    var downBtn = section.querySelector(".down-button");

    var currentNode = tbodyNode.firstElementChild;//children[0]

    downBtn.onclick = function(){
        var nextNode =  currentNode.nextElementSibling;

        if(nextNode==null){
            alert("더 이상 이동할 수 없습니다");
            return;
        }

        //tbodyNode.removeChild(nextNode);
        //tbodyNode.insertBefore(nextNode,currentNode);
        currentNode.insertAdjacentElement("beforebegin",nextNode);//더 직관적임. 내앞으로 와라
    }

    upBtn.onclick = function(){
        var preNode =  currentNode.previousElementSibling;

        if(preNode==null){
            alert("더 이상 이동할 수 없습니다");
            return;
        }

        //tbodyNode.removeChild(currentNode);//떼어내고
        //tbodyNode.insertBefore(currentNode,preNode);//붙이고
        currentNode.insertAdjacentElement("afterend",preNode);
    }

})

//Ex7-노드 복제와 템플릿 태그
window.addEventListener("load",function(){
    var notice = [
        {id:5,title:"퐈이야~~",regDate:"2020-10-28",writerId:"ttt",hit:2},
        {id:6,title:"하이야~~",regDate:"2020-10-28",writerId:"yyy",hit:0}
    ];

    var section = document.querySelector("#section7");

    var noticeList = section.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("tbody");

    var cloneBtn = section.querySelector(".clone-button");
    var templateBtn = section.querySelector(".template-button");

    cloneBtn.onclick = function(){
        var trNode = noticeList.querySelector("tbody tr"); //tbody중에 tr 하나만 가져옴
        var cloneNode = trNode.cloneNode(true);
        var tds = cloneNode.querySelectorAll("td"); //td 5개짜리 
        tds[0].textContent = notice[0].id;
        tds[1].innerHTML = '<a href="'+notice[0].id+'">'+ notice[0].title+'</a>';
        tds[2].textContent = notice[0].regDate;
        tds[3].textContent = notice[0].writerId;
        tds[4].textContent = notice[0].hit;


        tbodyNode.append(cloneNode);
    }


    //html에 복제할 표본이 없을 때 화면에 보이지 않는 template을 만들어 놓고 가져와 쓴다.
    var cnt = 0;
    templateBtn.onclick = function(){
        cnt++;
        if(cnt===1){
            for(var i=0;i<notice.length;i++){

                var template = section.querySelector("template");
                var cloneNode = document.importNode(template.content, true);
                var tds = cloneNode.querySelectorAll("td"); //td 5개짜리 
                tds[0].textContent = notice[i].id;
                //tds[1].innerHTML = '<a href="'+notice[0].id+'">'+ notice[0].title+'</a>';
        
                var aNode = tds[1].children[0];
                aNode.href= notice[i].id;
                aNode.textContent = notice[i].title;
        
        
                tds[2].textContent = notice[i].regDate;
                tds[3].textContent = notice[i].writerId;
                tds[4].textContent = notice[i].hit;
        
        
                tbodyNode.append(cloneNode);
            }
        }else{
            alert("불러올 데이터가 없습니다.")
        }

    }

})

//Ex6-노드조작 : 메뉴추가(createTextNode,Element)
window.addEventListener("load",function(){
    var section6 = document.querySelector("#section6");

    var titleInput = section6.querySelector(".title-input");
    var menuList = section6.querySelector(".menu-list");
    var addBtn = section6.querySelector(".add-button");
    var delBtn = section6.querySelector(".del-button");

    addBtn.onclick = function(){
        var title = titleInput.value;

        var html = '<a hrf="">'+title+'</a>';
        var li = document.createElement("li");
        li.innerHTML = html;

        //menuList.appendChild(li);

        menuList.append(li); //텍스트노드를 생성하지 않고 직접 어펜드 할수 있다.
       

        /*
        var title = titleInput.value;
        var txtNode = document.createTextNode(title);

        var aNode = document.createElement("a");
        aNode.href="";
        aNode.appendChild(txtNode);

        var liNode = document.createElement("li");
        liNode.appendChild(aNode);

        menuList.appendChild(liNode);
        */

        /*
        var title = titleInput.value;
        var txtNode = document.createTextNode(title);
        menuList.appendChild(txtNode);
        */
    };

    delBtn.onclick = function(){
       // var txtNode = menuList.childNodes[0]; //모든 노드의 0번째
        var liNode = menuList.children[0]; //엘리먼트 노드의 0번째
        //menuList.removeChild(liNode);
        liNode.remove();
    };

    });

//Ex5 : 엘리먼트 노드의 속성 변경 & css 속성 변경
window.addEventListener("load",function(){
    var section5 = document.querySelector("#section5");
    var srcInput = document.querySelector(".src-input");
    var imgSelect = document.querySelector(".img-select");
    var changeBtn = document.querySelector(".change-button");
    var img = document.querySelector(".img");
    var colorInput = document.querySelector(".color-input");

    changeBtn.onclick = function(){
        img.src = "imges/"+srcInput.value;
        //img.src = "imges/"+imgSelect.value;

        //img.style["border-color"]=colorInput.value;
        img.style.borderColor = colorInput.value;
    };
});

//Ex4 : childeNodes를 이용한 노드 선택
window.addEventListener("load",function(){
    var section4 = document.querySelector("#section4");
    var box = document.querySelector(".box");

    var input1 = box.children[0];//childNodes[0];
    var input2 = box.children[1];

    input1.value = "hello";
    input2.value = "okay";
})

//Ex3 : Seletors API Level1
window.addEventListener("load",function(){
    var section3 = document.getElementById("section3");
    var txtX = section3.querySelector("input[name='x']");
    var txtY = section3.querySelector(".txt-y");
    var btnAdd = section3.querySelector(".btn-add");
    var txtSum = section3.querySelector(".txt-sum");

    btnAdd.onclick = function(){
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    }
});

//Ex2 : 엘리먼트 선택방법 개선하기
window.addEventListener("load",function(){
    var section2 = document.getElementById("section2");
    var txtX = section2.getElementsByClassName("txt-x")[0];
    var txtY = section2.getElementsByClassName("txt-y")[0];
    var btnAdd = section2.getElementsByClassName("btn-add")[0];
    var txtSum = section2.getElementsByClassName("txt-sum")[0];


    /*
    var inputs = section2.getElementsByTagName("input");

    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];
    */

    btnAdd.onclick = function(){
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    }
});

//Ex1 : 계산기프로그램
window.addEventListener("load",function(){
    var txtX = document.getElementById("txt-x");
    var txtY = document.getElementById("txt-y");
    var btnAdd = document.getElementById("btn-add");
    var txtSum = document.getElementById("txt-sum");

    btnAdd.onclick = function(){
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    }
});