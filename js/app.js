getData()


document.addEventListener("scroll", throttle(function() {
  if (window.pageYOffset > window.screen.height - 464) {
      sitename.classList.add('sitename-transform');
      motto.classList.add('finish');

  } else {
        sitename.classList.remove('sitename-transform');
      motto.classList.remove('finish');

  }
},50),{passive: true});

function init(obj){
for (let i = obj.length - 1; i >= 0; i--) {

  var pattern = Trianglify({
    width: 500,
    height: 800,
    variance:Math.random()+1,
    cell_size:Math.random()*180 + 20
  });


  var ele = document.createElement('div');
      ele.innerHTML = '<div class="text">'+marked(obj[i].body)+'</div>';
      ele.className = 'filter';
      ele.appendChild(pattern.canvas());

  var li = document.createElement('div');
	li.className = 'part'
	li.appendChild(ele)




  container.appendChild(li);

}
}





menuBtn.addEventListener('click', function() {
    if (getComputedStyle(nav).opacity == 0) {
        topRect.classList.add('top-drop')
        bottomRect.classList.add('bottom-drop')
        nav.classList.add('nav-open')
        //container.classList.add('body-move')
        menuBtn.classList.add('menu-move')


        setTimeout(function() {
            document.body.addEventListener('click', function(e) {
            	console.log(e.target)
                if (e.target.nodeName === 'BODY') {
                    closeNav()
                    document.body.removeEventListener('click', arguments.callee)
                }
            })
        }, 0)
    } else {
        closeNav()
    }

})


function badNetwork(){
	alert('网络貌似不太好，请刷新重试');
}		

function closeNav() {
	topRect.classList.remove('top-drop')
    bottomRect.classList.remove('bottom-drop')
    nav.classList.remove('nav-open')
    //container.classList.remove('body-move')
    menuBtn.classList.remove('menu-move')
}

//发布
 function post() {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.github.com/repos/HTML50/tinyLog/issues/1/comments');
            xhr.setRequestHeader("Authorization", "Basic " + btoa('4bt:000666999bt'))
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  if(xhr.status === 201){
                    editor.style.display = 'none';
                    alert('发布成功');
                  }
                    
                    if(xhr.status === 401){
                      alert('重试：网络状态不好');
                    }
                }

            };
            xhr.send(JSON.stringify({ "body": markdown.value }));
        }

//新建内容
      document.getElementById('new').addEventListener('click', function() {
            editor.style.display = 'block';
        })

        submitBtn.addEventListener('click', function() {
          if(markdown.value === ''){
            alert('想好写什么了吗？');
            return;
          }

            submitBtn.style.opacity = 0.3;
            post();
        })

        closeBtn.addEventListener('click', function() {
            editor.style.display = 'none';
        })

        markdown.addEventListener('keyup', function() {
            preview.innerHTML = marked(markdown.value);
            setTimeout(function() {
                if(markdown.selectionStart === markdown.textLength)
                    preview.scrollTop = preview.scrollHeight;
            }, 100)
        })
//获取内容
    function getData() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/repos/HTML50/tinyLog/issues/1/comments?per_page=30');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                clearTimeout(timeout);
                init(JSON.parse(xhr.response))
                loading.style.opacity = 0;
                document.getElementsByTagName('header')[0].style.background = "#0000"

                setTimeout(function(){
                  loading.style.display = 'none'
                },1000)

                setTimeout(function(){
                  sitename.classList.remove('finish')
                },1500)
              
               setTimeout(function(){
                  motto.classList.remove('finish')
                },2000)


            }
        };
        xhr.send();
        timeout = setTimeout(badNetwork,5000);
    }


//节流函数
function throttle(func, wait) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
      previous = new Date();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = new Date();
      if (!previous) previous = now;
      // remaining time
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
     if (remaining <= 0 || remaining > wait) {
         if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };