   (function(w,d,video){
   "use strict";

  var player = document.getElementById('player') ?? false,calcTime = (n) =>{
     let c = {
      hours: Math.floor(n / 3600) ?? false,
      minutes: Math.floor(n / 60) % 60,
      seconds: Math.floor(n % 60),
     },cv = new Intl.NumberFormat(undefined,{minimumIntegerDigits:0x2});
     return !c["hours"] ? c["minutes"]+":"+cv.format(c["seconds"]):c["hours"]+":"+c["minutes"]+":"+cv.format(c["seconds"]);
    }, _ = {
      Cinematic: function(){
        var cinematic = this.Qr("ytm-cinematic-container-renderer");
        var canvas = document.querySelector("canvas")
        var sc  = document.querySelector(".ytp-cued-thumbnail-overlay-image");
        var layout = canvas.getContext("2d");
        var image = new Image();

        image.src = sc.style["background-image"].slice(5, -2);

        image.onload = function(){
         layout.fillStyle = "rgb(15, 15, 15)";
         layout.fillRect(0,0,200,200);
         layout.filter = 'blur(6px)';
         layout.globalAlpha = 0.5;
         layout.drawImage(image,15,12,80,50);
        }
        this.X(w, "scroll",()=>{
        let scrollY =self.pageYOffset || (document.body.scrollTop+document.documentElement.scrollTop);
   
         if (scrollY > 195){
          cinematic.classList.add("fade-out");
         } else if (scrollY < 200){
          cinematic.classList.remove("fade-out");
         }
       });
      },
      Ren: function(v,e){
       if(e){
        e["innerHTML"]+=v
       }
      },
      Bf: (n,q) => {
        return Math.max(n,q)
      },
      Be: (q) =>{
        return Math.min(q);
      },
      Gt: (e,o)=> {
        if (!e) return;
        Object.assign(e.style,o);
      },
      Qr: (q)=>{
       return d.querySelector(q)
     },
      X: (e,t,f)=>{
        if(e == null) return false;
        e.addEventListener(t,f)
     },
     Crw: function(e,a,c,p){
    let cr = document.createElement(e)
    if(typeof a == "object"){
      Object.keys(a).forEach(v => {
       cr["setAttribute"](v,a[v])
      })
    }

    if (c!=undefined && c!=false){
     cr["appendChild"](c)
    }//else this.Sl("ytm-single-column-watch-next-results-renderer")["appendChild"](cr)
  
    if (p!=undefined && p!=false) {
     p["appendChild"](cr)
    }

    return cr;
  },SA: function(e,t,v){
   e["setAttribute"](t,v)
  },RA: function(a){
   e.removeAttribute(a)
  },
  plyspi: function(i){

        var s = this.Crw("div", {class: "spiner"}), e = this.Qr(".player-controls-middle"), ks = this.Qr("#player-control-overlay"), t = _.Qr(".player-controls-background");

        if (i) {
          e.innerHTML="";
          t.removeEventListener("touchstart",ffad)
          ks.classList.add("fadein")
          
          
          e["appendChild"](s)
          return !0;
        }
        this.X(t, "touchstart", ffad)
        var n = this.Crw("button", {class: "icon-button icon-disable"},this.Crw("c3-icon"),e),
        u = this.Crw("button", {class: "icon-button player-control-play-pause-icon", "arial-pressed": true},this.Crw("c3-icon"),e),
        k = this.Crw("button", {class: "icon-button icon-disable"},this.Crw("c3-icon"),e)
        this.Ren(`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M19,6L9,12l10,6V6L19,6z M7,6H5v12h2V6z"></path>
        </svg>`,n.firstChild)
        this.Ren(`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" enable-background="new 0 0 24 24">
              <path d="M9,19H7V5H9ZM17,5H15V19h2Z"></path>
            </svg>`,u.firstChild)
        this.Ren(`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z"></path></svg>`,k.firstChild)

        this.X(u, "click", function(b){
          switch(PR(this)){
           case "true":
           this.setAttribute("arial-pressed", "false");
           _.videoPause(this);
           break;
           case "false":
           this.setAttribute("arial-pressed", "true");
           _.videoPlay(this);
           break;
         }
         b.stopPropagation();

         function PR(e){
          return (e.attributes["arial-pressed"].value);
         }
       })

       setTimeout(function(){
         ks.classList.remove("fadein")
       },2500)

      },  
      videoPlay: function(e){
      if (e != 0) e.lastElementChild.lastElementChild.innerHTML = "<path d='M9,19H7V5H9ZM17,5H15V19h2Z'></path>";
      document.querySelector(".ytp-cued-thumbnail-overlay").style['display'] = 'none';
       try {
        let v = video.play()
       }catch(e){
        console.warn(e)
       }
      },
      videoPause: function(e){
       e.lastElementChild.lastElementChild.innerHTML = "<g><path d='M6,4l12,8L6,20V4z'></path></g>";
       video.pause();
      }
    }, a = {
      C: function(x){
        d.querySelector(".progress-bar-playhead-wrapper").style.setProperty("--progress-wrapper", x.zd);
        video.currentTime = x.ca
      },
      Rz: ()=>{
      //1920 x 1080 / 1280 x 720 / 640 x 360  -> height: 232px
      //640 x 480 / 480 x 360  -> hight: 309px
      //360 x 360 -> hight: 412px
      //640 x 272

      //screen just
      //361 x 203
      //428 x 241
      //default quality
      var wd = screen.width + "px";
      var he;
      var t = [video.videoWidth,video.videoHeight]
      var scrennDev = {
        428: "241px",
        414: "233px",
        412: "232px",
        390: "219px",
        361: "203px",
        360: "203px",
        384: "216px",
        375: "211px",
      }[screen.width] ?? false;
      he = scrennDev;
        if ( (t[0] * t[1]) === 172800 || (t[0] * t[1]) === 163200) {

          _.Gt(video,{width: "412px",height: "309px",top: "0px", left: "0px"}); 
          _.Gt(video.parentNode, {height: "309px",top:"0px"})
          _.Gt(player, {paddingBottom: "309px"})
          _.Gt(_.Qr("ytm-watch").firstElementChild,{paddingBottom: "309px"})
          _.Gt(_.Qr("ytm-cinematic-container-renderer"),{paddingBottom: "309px"})

        } else if( (t[0] * t[1]) <= 129600){
          _.Gt(player, {paddingBottom: "412px"})
          _.Gt(_.Qr("ytm-watch").firstElementChild,{paddingBottom: "412px"})
          _.Gt(_.Qr("ytm-cinematic-container-renderer"),{paddingBottom: "412px"})
          _.Gt(video.parentNode, {height: "412px",top:"0px"})
          _.Gt(video,{width: "412px",height: "412px",top: "0px",left: "0"});
          _.X(w,"scroll",xscroll)
        } else  _.Gt(video,{width: wd, height: he,top: "0px",left: "0px"}); //default W: 412px H:232px
       return !1;
      }
    }

  player.addEventListener("mouseover",()=>{
      _.Gt(_.Qr(".ytp-large-play-button-bg"),{
        fill: "red",
        fillOpacity: "1"
      })
  });
  player.addEventListener("mouseout",()=>{
      _.Gt(_.Qr(".ytp-large-play-button-bg"),{
        fill: "#212121",
        fillOpacity: ".8"
      })
  });



const ctl = function(){
  _.Qr("ytm-custom-control").innerHTML =
   `<div id="player-control-overlay" class="new-controls bigbar medium-modification animation-enabled enable-fullscreen-controls fs-watch-system">
     <div class="player-controls-content">
      <div class="player-controls-background-container">
        <div class="player-controls-background">
        </div>
      </div>
      <div class="">
        <div class="player-controls-middle center">
          <button class="icon-button icon-disable">
            <c3-icon><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19,6L9,12l10,6V6L19,6z M7,6H5v12h2V6z"></path></svg></c3-icon>
          </button>
          <button class="icon-button player-control-play-pause-icon" arial-pressed="true">
            <c3-icon>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" enable-background="new 0 0 24 24">
              <path d="M9,19H7V5H9ZM17,5H15V19h2Z"></path>
            </svg>
          </c3-icon>
          </button>
          <button class="icon-button icon-disable">
            <c3-icon><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z"></path></svg></c3-icon>
          </button>
        </div>
      </div>
      <div class="">
       <div class="player-controls-bottom cbox">
        <div class="ytm-time-display">
         <div class="time-display-content cbox">
          <span class="time-first">0:00</span>
          <span class="time-delimiter">/</span>
          <span class="time-second">0:00</span>
         </div>
        </div>
        <button class="icon-button fullscreen-icon icon-disable">
          <c3-icon><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><path d="M7,11H6V6h5v1H7V11z M18,6h-5v1h4v4h1V6z M18,13h-1v4h-4v1h5V13z M11,17H7v-4H6v5h5V17z"></path></svg></c3-icon>
        </button>
       </div>
      </div>
      <div class="">
       <div class="player-controls-pb cbox">
     <div class="ytm-progress-bar">
      <div class="progress-bar-line">
        <div class="progress-bar-background"></div>
        <div class="progress-bar-loaded"></div>
        <div class="progress-bar-played"></div>
      </div>
      <div class="progress-bar-playhead-wrapper">
        <div class="progress-bar-playhead">
         <div class="progress-bar-playhead-dot"></div>
        </div>
      </div>
     </div>
       </div>
     </div>
     </div>
    </div>`;
}


  //dbclick
_.X(player, "dbclick", ()=>{

  console.log("db clci")

})


_.X(video,"waiting", function(e){
  console.log("waiting")
  _.plyspi(true);
})
_.X(video, "progress", function(){
  //Not implement function now
})
_.X(video, "ended", function(){
  //Not implement function now
})

const _pclk = async () =>{
var pl = _.Qr(".player-controls-pb");
 await video.play()
  

  _.X(_.Qr(".player-controls-background"),"touchstart",ffad);
  _.X(video,"play",ffad);

  _.X(pl, "touchmove",thmv);
  _.X(pl, "touchend",function(e){
  video.play();
  let f = this.getBoundingClientRect();
  let s = _.Be(_.Bf(0,e.changedTouches[0].clientX - f.x),f.width) / f.width

  video.currentTime = s * video.duration
  document.querySelector(".progress-bar-played").style.setProperty("--progress-played",s);
  document.querySelector(".progress-bar-playhead-wrapper").style.setProperty("--progress-wrapper", s);
  })

  //The function fullscreen undefined now, but coming son!!
  _.X(_.Qr(".fullscreen-icon"), "click", function(e){
    video.requestFullscreen();
/*
    //player container
    var ply = _.Qr("#player-container-id")
    //body
    _.SA(_.Qr("body"), "faux-fullscreen", true);

    if (ply.classList[1]) {
      ply.classList.remove("sticky-player")
    }
    
    _.Gt(ply.childNodes[1].firstElementChild, {
      transform: "scale(1)",
      transition: "all 0.2s ease 0s"
    })

    _.X(w, "orientationchange", function(){
      //angle > 0
      if (screen.orientation.angle === 0) {
        console.log("orientare")
      _.Gt(video,{
        width: "736px",
        height: "414px",
        left: "91px",
        top: "0px"
       })

       _.X(_.Qr("#player-control-overlay"), "click", function(){
          ffad()
       })
      } else {
      console.log("exit")
      _.Gt(video,{
       width: "414px",
       height: "233px",
       left: "0px",
       top: "242px"
      })
     }
    })

    */
   
    e.stopPropagation();
  })

}, thmv = function(e){
  e.preventDefault();
  e.stopPropagation();
   if (video.duration && Math.abs(e.touches[0].clientX)) {
     e = e.touches[0].clientX;
    var f = this.getBoundingClientRect();
    video.pause();

    a.C({
      ca: _.Be(_.Bf(0, e - f.x),f.width) / f.width * video.duration,
      zd: _.Be(_.Bf(0, e - f.x),f.width) / f.width
    });
  }
}, ffad = function(c){
    var controloverlay =_.Qr("#player-control-overlay") ?? false;
    if(!controloverlay) return  !1;

    if(c.type == "touchstart"){
     _.Gt(_.Qr("#movie_player"),{
       transition: "",
       transformOrigen: ""
     });

     controloverlay.classList.toggle("fadein");
    }

    if ( c.type === "play" && controloverlay.classList[6] === "fadein") {

     var cz = setTimeout(()=>{
        if (controloverlay.classList[6] == "fadein") controloverlay.classList.remove("fadein");
        clearTimeout(this)
      },2500);

    }

    c.stopPropagation();
}


const only = (x)=>{
 _.Gt(_.Qr(".ytp-cued-thumbnail-overlay").childNodes[1],{display: "none"}) || ctl() || _.plyspi(true) && _.Cinematic();

 if (video.duration > 0 || video.aredyState > 2) {
     _pclk();
   }

  _pclk();
  player.removeEventListener("click", this)
  x.stopPropagation();
}

_.X(video, "loadeddata", function(){
 _.X(player, "click", only)
})
_.X(player, "click", only)

_.X(video,"timeupdate",function(){
  a.Rz()
  var tmd = (_.Qr(".time-display-content")) ?? false;
   if (!tmd) return !1;

  var z = _.Qr(".player-controls-middle");
  if (z.childNodes.length < 2) {
    _.Gt(_.Qr(".ytp-cued-thumbnail-overlay"),{display: "none"})
     z.removeChild(z.firstChild)
     _.plyspi(false)
  }

  tmd.lastElementChild.textContent = calcTime(video.duration)

  tmd.firstElementChild.textContent = calcTime(video.currentTime)

  var cal = (video.currentTime / video.duration);
  
  document.querySelector(".progress-bar-played").style.setProperty("--progress-played",cal);
  document.querySelector(".progress-bar-playhead-wrapper").style.setProperty("--progress-wrapper",cal);
});
//For video: https://www.youtube.com/watch?v=ZeNyjnneq_w

//add width to video
/*
_.Gt(video,{
  top: "-232px",
  left: "0px",
  width: "412px",
  height: "232px"
})
*/
}(window, document, document.querySelector("video")));
