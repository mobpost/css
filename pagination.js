var perPage=3;

    var numPages=3;
    var firstText ='First';
    var lastText ='Last';
    var prevText ='Prev';
    var nextText ='Next';
    var urlactivepage=location.href;
    var home_page="/";

      if(typeof firstText=="undefined")firstText="First";
      if(typeof lastText=="undefined")lastText="Last";

    var noPage; var currentPage; var currentPageNo; var postLabel; pagecurrentg();
    function looppagecurrentg(pageInfo) {
       var html='';
         pageNumber=parseInt(numPages / 2);

         if(pageNumber==numPages-pageNumber) {
           numPages=pageNumber*2+1
         }

         pageStart=currentPageNo-pageNumber;

         if(pageStart<1)pageStart=1;
           lastPageNo=parseInt(pageInfo / perPage)+1;

         if(lastPageNo-1==pageInfo / perPage)lastPageNo=lastPageNo-1;
           pageEnd=pageStart+numPages-1;

         if(pageEnd>lastPageNo)pageEnd=lastPageNo;
           html+="<span class='pagenumber'>Page "+currentPageNo+' of '+lastPageNo+"</span>";

       var prevNumber=parseInt(currentPageNo)-1;

         if(currentPageNo>1){
           if(currentPage=="page"){
             html+='<span class="pagers firstpage"><a href="'+home_page+'">'+firstText+'</a></span>'
           } else {
             html+='<span class="display firstpage"><a href="/search/label/'+postLabel+'?&max-results='+perPage+'">'+firstText+'</a></span>'
           }
          }
          
         if(currentPageNo>2){
         if(currentPageNo==3){
           if(currentPage=="page"){
             html+='<span class="pagers"><a href="'+home_page+'">'+prevText+'</a></span>'
           } else {
             html+='<span class="display"><a href="/search/label/'+postLabel+'?&max-results='+perPage+'">'+prevText+'</a></span>'
             }
           } else {

           if(currentPage=="page"){
             html+='<span class="display"><a href="#" onclick="redirectpage('+prevNumber+');return false">'+prevText+'</a></span>'
           } else {
             html+='<span class="display"><a href="#" onclick="redirectlabel('+prevNumber+');return false">'+prevText+'</a></span>'
             }
           }
         }
         
         if(pageStart>1){
           if(currentPage=="page"){
             html+='<span class="display"><a href="'+home_page+'">1</a></span>'
           } else {
             html+='<span class="display"><a href="/search/label/'+postLabel+'?&max-results='+perPage+'">1</a></span>'
             }
           }
           
          if(pageStart>2){
            html+=' ... '
          }
          
          for(var jj=pageStart;jj<=pageEnd;jj++){
            if(currentPageNo==jj){
              html+='<span class="activepage">'+jj+'</span>'
            } else if(jj==1){

            if(currentPage=="page"){
              html+='<span class="display"><a href="'+home_page+'">1</a></span>'
            } else {
              html+='<span class="display"><a href="/search/label/'+postLabel+'?&max-results='+perPage+'">1</a></span>'
              }
            } else {
            if(currentPage=="page"){
              html+='<span class="display"><a href="#" onclick="redirectpage('+jj+');return false">'+jj+'</a></span>'
            } else {
              html+='<span class="display"><a href="#" onclick="redirectlabel('+jj+');return false">'+jj+'</a></span>'
              }
            }
          }
          
          if(pageEnd<lastPageNo-1){
            html+='...'
          }

          if(pageEnd<lastPageNo){
            if(currentPage=="page"){
              html+='<span class="display"><a href="#" onclick="redirectpage('+lastPageNo+');return false">'+lastPageNo+'</a></span>'
            } else {
              html+='<span class="display"><a href="#" onclick="redirectlabel('+lastPageNo+');return false">'+lastPageNo+'</a></span>'
              }
            }
            
       var nextnumber=parseInt(currentPageNo)+1;
         if(currentPageNo<(lastPageNo-1)){
           if(currentPage=="page"){
             html+='<span class="display"><a href="#" onclick="redirectpage('+nextnumber+');return false">'+nextText+'</a></span>'
           } else {
             html+='<span class="display"><a href="#" onclick="redirectlabel('+nextnumber+');return false">'+nextText+'</a></span>'
             }
           }
           
         if(currentPageNo<lastPageNo){
           if(currentPage=="page"){
             html+='<span class="display lastpage"><a href="#" onclick="redirectpage('+lastPageNo+');return false">'+lastText+'</a></span>'
           } else {
             html+='<span class="display lastpage"><a href="#" onclick="redirectlabel('+lastPageNo+');return false">'+lastText+'</a></span>'
             }
           }

    var pageArea=document.getElementsByName("blockPage");
    var blogPager=document.getElementById("blog-pager");
      for(var p=0;p<pageArea.length;p++){
        blockPage[p].innerHTML=html
      }
         
      if(blockPage&&blockPage.length>0){
        html=''
      }
         
      if(blogPager){
        blogPager.innerHTML=html
      }
    }

function countdata(root){
  var feed=root.feed;
  var totaldata=parseInt(feed.openSearch$totalResults.$t,10);
    looppagecurrentg(totaldata)
}

function pagecurrentg(){
  var thisUrl=urlactivepage;
    if(thisUrl.indexOf("/search/label/")!=-1){
      if(thisUrl.indexOf("?updated-max")!=-1){
        postLabel=thisUrl.substring(thisUrl.indexOf("/search/label/")+14,thisUrl.indexOf("?updated-max"))
      } else {
        postLabel=thisUrl.substring(thisUrl.indexOf("/search/label/")+14,thisUrl.indexOf("?&max"))
        }
      }
      
      if(thisUrl.indexOf("?q=")==-1&&thisUrl.indexOf(".html")==-1){
        if(thisUrl.indexOf("/search/label/")==-1){
          currentPage="page";
            if(urlactivepage.indexOf("#PageNo=")!=-1){
              currentPageNo=urlactivepage.substring(urlactivepage.indexOf("#PageNo=")+8,urlactivepage.length)
            } else {
              currentPageNo=1
              }
              document.write("<script src=\""+home_page+"feeds/posts/summary?max-results=1&alt=json-in-script&callback=countdata\"><\/script>")
              } else {
              currentPage="label";
                if(thisUrl.indexOf("&max-results=")==-1){
                  perPage=20
                }
                
                if(urlactivepage.indexOf("#PageNo=")!=-1){
                  currentPageNo=urlactivepage.substring(urlactivepage.indexOf("#PageNo=")+8,urlactivepage.length)
                } else {
                  currentPageNo=1
                  }
                  document.write('<script src="'+home_page+'feeds/posts/summary/-/'+postLabel+'?alt=json-in-script&callback=countdata&max-results=1" ><\/script>')
            }
        }
      }

function redirectpage(numberpage){
  jsonstart=(numberpage-1)*perPage;noPage=numberpage;

  var nameBody=document.getElementsByTagName('head')[0];
  var newInclude=document.createElement('script');
    newInclude.type='text/javascript';
    newInclude.setAttribute("src",home_page+"feeds/posts/summary?start-index="+jsonstart+"&max-results=1&alt=json-in-script&callback=postdate");
    nameBody.appendChild(newInclude)
}

function redirectlabel(numberpage){
  jsonstart=(numberpage-1)*perPage;noPage=numberpage;

  var nameBody=document.getElementsByTagName('head')[0];
  var newInclude=document.createElement('script');
    newInclude.type='text/javascript';
    newInclude.setAttribute("src",home_page+"feeds/posts/summary/-/"+postLabel+"?start-index="+jsonstart+"&max-results=1&alt=json-in-script&callback=postdate");
    nameBody.appendChild(newInclude)
}

function postdate(root){
  post=root.feed.entry[0];

  var timestamp1=post.published.$t.substring(0,19)+post.published.$t.substring(23,29);
  var timestamp=encodeURIComponent(timestamp1);

  if(currentPage=="page"){
    var pAddress="/search?updated-max="+timestamp+"&max-results="+perPage+"#PageNo="+noPage
  } else {
    var pAddress="/search/label/"+postLabel+"?updated-max="+timestamp+"&max-results="+perPage+"#PageNo="+noPage
  }
  location.href=pAddress
}

//

$(document).ready(function(){$(".footer").load("https://cdn.rawgit.com/mobpost/css/html/page.html");});
