gsap.registerPlugin(Flip);


async function flipTransition(data){
  var myFace = data.current.container.querySelector('#myFace');
  var myFaceAgain = data.next.container.querySelector('#myFace');
  var littleDescripton = data.current.container.querySelector('#headingOne')
  var littleDescriptonAgain = data.next.container.querySelector('#headingOne')

  data.next.container.classList.add("overlap_feature")

  // var myFaceParentDiv = myFace.parentElement
  var myFaceAgainParentDiv = myFaceAgain.parentElement
  var littleDescriptonParent = littleDescripton.parentElement
  var littleDescriptonAgainParent = littleDescriptonAgain.parentElement


  var firstState= Flip.getState(myFace);
  var anotherFirstState= Flip.getState(littleDescripton);
  myFaceAgain.remove();
  littleDescriptonAgain.remove();

  myFaceAgainParentDiv.append(myFace);
  littleDescriptonAgainParent.append(littleDescripton);


  await Promise.all([
    Flip.from(firstState, {
      scale: true, duration: 0.7, ease: "power4.easeInOut",
      onComplete: ()=>{
           data.next.container.classList.remove("overlap_feature")
          }
     }),
     Flip.from(anotherFirstState, {
      scale:true, duration: 0.7, ease: "power4.easeInOut"
     }),
  ])
}
async function flipTransitionReverse(data){
  var myFace = data.current.container.querySelector('#myFace');
  var myFaceAgain = data.next.container.querySelector('#myFace');
  var littleDescripton = data.current.container.querySelector('#headingOne')
  var littleDescriptonAgain = data.next.container.querySelector('#headingOne')

  data.next.container.classList.add("overlap_feature")

  // var myFaceParentDiv = myFace.parentElement
  var myFaceAgainParentDiv = myFaceAgain.parentElement
  var littleDescriptonParent = littleDescripton.parentElement
  var littleDescriptonAgainParent = littleDescriptonAgain.parentElement


  var firstState= Flip.getState(myFace);
  var anotherFirstState= Flip.getState(littleDescripton);
  

  myFaceAgain.remove();
  littleDescriptonAgain.remove();

  myFaceAgainParentDiv.append(myFace);
  littleDescriptonAgainParent.append(littleDescripton);

  await Promise.all([
      Flip.from(firstState, {
        scale: true, duration: 0.7, ease: "power4.easeInOut",
        onComplete: ()=>{
             data.next.container.classList.remove("overlap_feature")
            }
       }),
       Flip.from(anotherFirstState, {
        scale:true, duration: 0.7, ease: "power4.easeInOut"
       }),
    ]) 
  
}


const loaderOverlay = document.querySelector(".loader")

barba.hooks.beforeEnter((data)=>{
      console.log(data.next.namespace)
      var loaderOverlayy =data.next.container.querySelector(".loader")
      if (loaderOverlayy.style.display = "flex") {
        loaderOverlayy.style.display= "none"
      }
});

barba.init({

  sync: true,

  transitions: [
    {
      name: 'opacity-transition',
      async leave(data) {
         await gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.5,
          });
        },
      enter(data) {
         gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.5,
          });
        },
    },
  
    {
      name: 'specific-page-transition',

      from: {
        namespace: [
          "index"
        ]
      },

      to: {
        namespace: [
          "aboutMe"
        ]
      }, 

  
     async enter(data) {
       await flipTransition(data);
      }
    },

    {
      name: 'reverse-transition',

      from: {
        namespace: [
          "aboutMe"
        ]
      },

      to: {
        namespace: [
          "index"
        ]
      }, 

      enter(data) {
         flipTransitionReverse(data)
        
      }
    },

    {
      name: 'specific-style-transition',

      to: {
        namespace: [
          "index"
        ]
      },

      beforeOnce(){
        gsap.set(".img", {xPercent:60})
        gsap.set(".my_nickname", {xPercent:40})
        gsap.set(".my_nickname", {xPercent:40})
        gsap.set(".my_nickname span", {yPercent:100})
        gsap.set(".text-mask",{right: "0%"})
        gsap.set("p",{opacity:0})
        gsap.set(loaderOverlay, {display: "flex"})
      },

      async once(){
        window.addEventListener('load', () => {
          // loaderOverlay.style.display= "none"
          gsap.timeline()
          .fromTo(loaderOverlay, {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 0% 50%, 0% 50%, 0% 50%)"}, {
            clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 100% 50%, 100% 50%, 0% 50%)", duration:1.5, ease: "power4.out"
          })
          .to(loaderOverlay, {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%, 0% 0%)", duration: 2, ease: "power4.out"})
        });
        
        await gsap.timeline().to(".img",{xPercent: 0, duration:1.5, delay: 2, ease:"power2.out"})
                             .to(".my_nickname",{xPercent: 0, duration:1.5, delay:-2, ease:"power2.out"})
                             .to(".my_nickname div",{width: "100%", duration:1, delay:-1.2, ease:"power2.out"})
                             .to(".text-mask",{right: "100%", duration:0.8, delay:-1.3, ease:"power2.out"})
                             .to(".my_nickname span", {yPercent: 0, duration:0.5, delay: 0.3, ease: "expo1.out"})
                             .to(".my_nickname div",{left: "100%", duration:1, ease:"power2.out"}) //power2.in was also a nice one, but not fot this element
        // data.next.container.style.backgroundColor ="white"
                             .to("p", {opacity:1, duration: 0.4})
      }
    },
    {
      name: 'reload-transition',

      to: {
        namespace: [
         "aboutMe", "myPortfolio", "contactMe"
        ]
      },

      beforeOnce(){
        gsap.set(loaderOverlay, {display: "flex"})
      },

      async once(){
        window.addEventListener('load', () => {
          // loaderOverlay.style.display= "none"
          gsap.timeline()
          .fromTo(loaderOverlay, {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 0% 50%, 0% 50%, 0% 50%)"}, {
            clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 100% 50%, 100% 50%, 0% 50%)", duration:1.5, ease: "power4.out"
          })
          .to(loaderOverlay, {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%, 0% 0%)", duration: 2, ease: "power4.out"})
        });
      }
    },
    
    {
      name: "reveal_transition",
      to: {
        namespace: [
          "myPortfolio"
        ]
      },
      enter(data){        
        var projects =document.querySelectorAll('.move');
        var arrow = document.getElementById('nav-1');
        var overlayPage= document.querySelector('.project-description');
        projects.forEach(project=>{
          project.addEventListener('click', ()=>{

            var detailedSection = project.querySelector(".detailed-section").cloneNode(true)
            // originalParent= project;
            
            if (overlayPage.querySelector('.detailed-section')){
              overlayPage.removeChild(overlayPage.querySelector('.detailed-section'))
              console.log('it is already there')
              // overlayPage.innerHTML=''
            }
            overlayPage.appendChild(detailedSection)

            gsap.timeline()
                  .fromTo(".portfolio_grid", {filter: "blur(0px)", pointerEvents:'none'}, {filter: "blur(5px)", duration:1})
                  .to('.project-description', {x: 0, duration:0.5, ease:"power2.inOut", onComplete: ()=>{
                    gsap.to(".portfolio_grid", {filter: "blur(0px)", pointerEvents:'all'})
                  }})
          })

          project.addEventListener("mousemove", (e)=> {
            var movedX = e.clientX
            var movedY = e.clientY
            // console.log(`${movedX}px`)

            var rect = project.getBoundingClientRect();
            
            // document.querySelector(".see-more").style.opacity='1'
            project.querySelector(".see-more").style.left = movedX - rect.left - (project.querySelector(".see-more").clientWidth/2) +'px'
            project.querySelector(".see-more").style.top = movedY- rect.top - (project.querySelector(".see-more").clientHeight/2) +'px'
            project.querySelector(".see-more").style.opacity='1'
            // document.querySelector(".target").style.left = `${movedX-15}px`
            // document.querySelector(".target").style.top = `${movedY-15}px`
          })

          project.addEventListener('mouseenter', ()=>{
            console.log(document.querySelector(".see-more"))
          })
          project.addEventListener('mouseleave', ()=>{
            project.querySelector(".see-more").style.opacity='0'
            project.querySelector(".see-more").style.left = '0'
            project.querySelector(".see-more").style.top =  '0'
          })
        })

        arrow.addEventListener('click', ()=>{

          var detailedSection =overlayPage.querySelector(".detailed-section") 

          gsap.timeline()
                  .to(".portfolio_grid", {filter: "blur(5px)", pointerEvents:'none', duration:0.1})
                  .to('.project-description', {x: "-100%", duration:0.8, delay:0.5, ease:"power2.inOut",
                  onComplete: ()=>{
                    // detailedSection.innerHTML=''
                    overlayPage.removeChild(detailedSection)
                    gsap.to(".portfolio_grid", {filter: "blur(0px)", pointerEvents:'all'})
                    }})
                  .fromTo(".portfolio_grid", {filter: "blur(5px)"}, {filter: "blur(0px)", duration:0.1})
        })
       
        gsap.timeline()
        .fromTo(data.current.container, {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 51%, 0% 51%, 0% 49%, 0% 49%)"}, {
          clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 51%, 100% 51%, 100% 49%, 0% 49%)", duration:2, ease: "power4.out"
        })
        .to(data.current.container, {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%, 0% 0%)", duration:3, ease: "power4.out"})
        data.next.container.classList.add("overlap_feature")      

       
        return gsap.timeline()
        .fromTo(data.next.container, {clipPath: "polygon(0% 49%, 0% 49%, 0% 51%, 0% 51%)"}, {clipPath: "polygon(0% 49%, 100% 49%, 100% 51%, 0% 51%)", duration:2, ease: "power4.out"})
        .to(data.next.container, {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration:3, ease: "power4.out",
        onComplete: ()=>{
          data.next.container.classList.remove("overlap_feature")
         }})

      }


    },
    {
      name: "transition_to_contact",
      // from: {
      //   namespace: [
      //     "index"
      //   ]
      // },
      to: {
        namespace: [
          "contactMe"
        ]
      },

      enter(data) {
        const transMask = data.current.container.querySelector(".transition-mask");
        // const transMaskTwo = data.next.container.querySelector(".transition-mask");
        // console.log(transMask)
        gsap.to( transMask, {top: "100%", duration: 2, ease: "power4.inOut"})
        
       gsap.timeline()
        // .to( transMask, {width: "100%", duration: 0.7, ease: "power1.out"})
        .fromTo(data.current.container, {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, {
          clipPath:"polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration:2, ease: "power4.inOut"
        })
        data.next.container.classList.add("overlap_feature")
        return gsap.timeline()
          .fromTo(data.next.container, {clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}, {
            clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:2, ease: "power4.inOut", 
            onComplete: ()=>{
              data.next.container.classList.remove("overlap_feature")
             }
          })
          // .to(transMaskTwo, {width: "0%", duration: 0.7, ease: "power1.out"})
          
      },
      
    },
    {
      name: "transition_from_contact",
      // from: {
      //   namespace: [
      //     "index"
      //   ]
      // },
      from: {
        namespace: [
          "contactMe"
        ]
      },

      enter(data) {
        const transMask = data.current.container.querySelector(".transition-mask");
        const transMaskTwo = data.next.container.querySelector(".transition-mask");
        // console.log(transMask)
        gsap.set(transMaskTwo, {width: "100%"})
        gsap.to( transMask, {bottom: "100%", duration: 2, ease: "power4.inOut"})
        gsap.timeline()
        .fromTo(data.current.container, {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, {
          clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration:2, ease: "power4.inOut"
        })
        data.next.container.classList.add("overlap_feature")
        return gsap.timeline()
          .fromTo(data.next.container, {clipPath:"polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"}, {
            clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:2, ease: "power4.inOut"
          })
          .to(transMaskTwo, {width: "0%", duration: 0.7, ease: "power1.out",
          onComplete: ()=>{
            data.next.container.classList.remove("overlap_feature")
           }
          })
          
      },
      
    },

  ],
  views: [

    {
    namespace: "aboutMe",

    beforeEnter() {
      gsap.set(".v-line", {width: "0%", height: "0.5px", opacity:1})     
      gsap.set(".about_me_area .orbytal", {yPercent:100, opacity:0})
      gsap.set(".text-portion", {height:"2%"})
      gsap.set(".text-portion p", {opacity:0})
      gsap.set(".button_area", {xPercent:100, opacity:0})
    },

    async beforeLeave(data){
      if (data.next.namespace === "index") {
        await Promise.all([
          gsap.fromTo(".image", {filter: "grayscale(0%) brightness(60%)"}, {filter: "grayscale(100%) brightness(60%)", duration:3.6}),
  
          document.getElementById("orbytal").classList.add("click_feature"),
      
         gsap.timeline()
          .to(".text-mask",{yPercent:100, opacity:0, duration:0.5, ease: "power1.out"})
          .to(".button_area",{xPercent:100, opacity:0, duration:0.8, ease: "power1.inOut"})
          .to(".v-line", {opacity:0.041, duration:0.5, delay: -0.5, ease: "power4.out"})
          .to(".v-line", { height:"0.5px", duration: 0.5, color:"white", opacity:0.41, ease: "power1.out"})
          .to(".text-portion",{height:"2%", duration: 0.5, delay: -0.5, ease: "power1.out"})
          .to(".text-portion p",{opacity: 0, duration: 0.5, delay: -0.5, ease: "power1.out"})
          .to(".v-line", {width: "0%", opacity:1, duration:1.5, ease: "power4.out"})
        ])
      }
      else if(data.next.namespace === "contactMe"){
        await gsap.to( ".transition-mask", {width: "100%", duration: 0.7, delay: 1, ease: "power1.out"})
      } else{
        return;
      }
      
    }, 

    afterEnter(){
      document.getElementById("orbytal").classList.add("click_feature")
      const aboutMetL= gsap.timeline();
      aboutMetL.to(".v-line", {width: "90%", height:"0.5px", duration: 0.7, delay:0.5, color:"white", opacity: 0.41, ease: "power1.out"})
      aboutMetL.to(".text-portion",{height:"auto", duration: 1.8, ease: "power1.out"})
      .to(".text-portion p",{opacity: 1, duration: 0.5, delay: -1.8, ease: "power1.out"})
      aboutMetL.to(".v-line", {height: "100%", duration: 1, delay:-1.8, color:"white", opacity: 0.041, ease: "power4.out"})
      aboutMetL.to(".v-line", {opacity:0, duration:0.5, delay:-1.1, ease: "power4.out"})
      aboutMetL.to(".button_area",{xPercent:0, opacity:1, delay: -1, duration:0.8, ease: "expo.out"})
      aboutMetL.to(".orbytal",{yPercent:0, opacity:1, duration:0.5, ease: "power1.out",
        onComplete: ()=>{
        document.getElementById("orbytal").classList.remove("click_feature")
        }})
      aboutMetL.play()
    }
  },

  {
    namespace: "index",

    async beforeLeave(data){
      if (data.next.namespace === "aboutMe") {
        await Promise.all([
          gsap.fromTo(".img", {filter: "grayscale(100%) brightness(60%)"}, {filter: "grayscale(0%) brightness(60%)", duration:1.5}),

          document.getElementById("nav").classList.add("click_feature"),
          gsap.timeline().to(".hero_section nav",{width:"50%", duration:0.5, ease:"power1.out"})
                      .to(".hero_section nav",{xPercent:150, duration:1, ease:"power4.out",
                      onComplete: ()=>{
                          document.getElementById("nav").classList.remove("click_feature")
                          }
                        })
        ])
      } else if (data.next.namespace === "contactMe"){
        await gsap.timeline().to(".hero_section nav",{width:"50%", duration:0.5, ease:"power1.out"})
                             .to(".hero_section nav",{xPercent:150, duration:1, ease:"power4.out",
                                onComplete: ()=>{
                                document.getElementById("nav").classList.remove("click_feature")
                                }
                                })
                             .to( ".transition-mask", {width: "100%", duration: 0.7, ease: "power1.out"})
      }
      else{
        document.getElementById("nav").classList.add("click_feature"),
        await gsap.timeline().to(".hero_section nav",{width:"50%", duration:0.5, ease:"power1.out"})
                      .to(".hero_section nav",{xPercent:150, duration:1, ease:"power4.out",
                      onComplete: ()=>{
                          document.getElementById("nav").classList.remove("click_feature")
                          }
                        })
      }
    },
    beforeEnter(){
      gsap.set(".hero_section nav",{xPercent:100, opacity:0})
    },
    afterEnter(){
      gsap.to(".hero_section nav",{xPercent:0, opacity:1, duration:1, ease:"power4.out"})
    },
  },

  {
    namespace: "myPortfolio",
    afterEnter(){
      console.log("na wa")

        //for opening details on projects in portfolio page. I put it both in here an din the enter hook, so that one can quickly access the detailed contents of each project in the portfolio
        var projects =document.querySelectorAll('.move');
        var arrow = document.getElementById('nav-1');
        var overlayPage= document.querySelector('.project-description');
  
        projects.forEach(project=>{
          project.addEventListener('click', ()=>{

            var detailedSection = project.querySelector(".detailed-section").cloneNode(true)
            // originalParent= project;
            
            if (overlayPage.querySelector('.detailed-section')){
              overlayPage.removeChild(overlayPage.querySelector('.detailed-section'))
              console.log('it is already there')
              // overlayPage.innerHTML=''
            }
            overlayPage.appendChild(detailedSection)

            gsap.timeline()
                  .fromTo(".portfolio_grid", {filter: "blur(0px)", pointerEvents:'none'}, {filter: "blur(5px)", duration:1})
                  .to('.project-description', {x: 0, duration:0.5, ease:"power2.inOut", onComplete: ()=>{
                    gsap.to(".portfolio_grid", {filter: "blur(0px)", pointerEvents:'all'})
                  }})
          })

          project.addEventListener("mousemove", (e)=> {
            var movedX = e.clientX
            var movedY = e.clientY
            // console.log(`${movedX}px`)

            var rect = project.getBoundingClientRect();
            
            // document.querySelector(".see-more").style.opacity='1'
            project.querySelector(".see-more").style.left = movedX - rect.left - (project.querySelector(".see-more").clientWidth/2) +'px'
            project.querySelector(".see-more").style.top = movedY- rect.top - (project.querySelector(".see-more").clientHeight/2) +'px'
            project.querySelector(".see-more").style.opacity='1'
            // document.querySelector(".target").style.left = `${movedX-15}px`
            // document.querySelector(".target").style.top = `${movedY-15}px`
          })

          project.addEventListener('mouseenter', ()=>{
            console.log(document.querySelector(".see-more"))
          })
          project.addEventListener('mouseleave', ()=>{
            project.querySelector(".see-more").style.opacity='0'
            project.querySelector(".see-more").style.left = '0'
            project.querySelector(".see-more").style.top =  '0'
          })
        })

        arrow.addEventListener('click', ()=>{

          var detailedSection =overlayPage.querySelector(".detailed-section") 

          gsap.timeline()
                  .to(".portfolio_grid", {filter: "blur(5px)", pointerEvents:'none', duration:0.1})
                  .to('.project-description', {x: "-100%", duration:0.8, delay:0.5, ease:"power2.inOut",
                  onComplete: ()=>{
                    // detailedSection.innerHTML=''
                    overlayPage.removeChild(detailedSection)
                    gsap.to(".portfolio_grid", {filter: "blur(0px)", pointerEvents:'all'})
                    }})
                  .fromTo(".portfolio_grid", {filter: "blur(5px)"}, {filter: "blur(0px)", duration:0.1})
        })
       
        
      // function arrangeGrids();
      // gsap.to(".portfolio_grid .a",{gridColumn: "1/4", duration:1, ease:"power4.out" })
    }
  },
  {
    namespace: "contactMe",
    // beforeEnter(){
     
    //   // gsap.set(".form-area", {yPercent:100, opacity:0})
    // },
    afterEnter(){
      gsap.timeline()
        // .to(".form-area", {yPercent:0, opacity:1, duration:0.5, ease: "expo.out" })
          .to(".transition-mask", {width: "0%", duration: 0.7, ease: "power1.out"})
          // .to(".form-area", { opacity: 1, duration:0.8, ease: "expo.out"})
          .to("h1", {yPercent: 0, duration:0.5, ease: "power4.out"})
          .to(".button_area", {width: "70%", opacity: 1, duration:0.8, delay:-0.3,  ease: "expo.out"})
          .to(".orbytal", { yPercent: 0, duration:0.5, delay:-0.4, ease: "power1.out"})
          .to("#myCanvasContainer", { opacity: 1, duration:1.5,  ease: "power1.in"})

          
    },
    async beforeLeave(){
      await gsap.timeline()
          .to(".transition-mask", {width: "100%", duration: 0.7, ease: "power1.in"})
    },
    beforeEnter() {
      gsap.set(".orbytal", { yPercent:100})
      gsap.set("h1", { yPercent:100})
      gsap.set("#myCanvasContainer", { opacity: 0})

      window.addEventListener("load", rollIt() )
      
      function rollIt() {
        try{
          TagCanvas.Start('myCanvas', 'tags', {
            textColour: '#ffffffa9',
            textHeight: 10,
            outlineColour: '#ffffff',
            outlineMethod: 'colour',
            textFont: 'Fredoka',
            reverse: true,
            depth: 0.5,
            dragControl: true,
            freezeDecel: true,
            frontSelect: true,
            radiusX: 0.9,
            radiusY: 0.9,
            radiusZ: 0.9,
            maxSpeed: 0.06,
            minSpeed: 0.005,
            minTags: 40,
            pinchZoom: true,
            // repeatTags: 2,
            zoomMax: 1.5,
        });
        } 
        catch(e) {
          document.getElementById("tags").style.display= "none"
        }
      }    
            

    }
  }
  ]
});





// FOR THREE JS

// var scene= new THREE.Scene();
var sceneTwo= new THREE.Scene();
// var camera= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

var cameraTwo= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
// cameraTwo.position.z = 1;
// cameraTwo.rotation.x = Math.PI/2;

// var myGlobe= document.querySelector(".three_js_corner")
var myGalaxy= document.querySelector(".background_dots")

// var renderer= new THREE.WebGLRenderer({antialias: true, alpha: true});
var rendererTwo= new THREE.WebGLRenderer({antialias: true});
//renderer.setClearColor(0xEEEEEE);
// renderer.setSize(window.innerWidth,window.innerHeight);
rendererTwo.setSize(window.innerWidth,window.innerHeight);

// myGlobe.appendChild(renderer.domElement)
myGalaxy.appendChild(rendererTwo.domElement)

var starGeo = new THREE.BufferGeometry();
var starGeoCount = 800;
var starPositions = [], starVelocities=[];

for(var i=0; i<starGeoCount; i++){
  starPositions.push (
    (Math.random()-0.5)* 100,
    (Math.random()-0.5)* 100,
    (Math.random()-0.5)* 100,
  )
  starVelocities.push(
    (Math.random())* 0.5,
  )
}

starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
starGeo.setAttribute('velocity', new THREE.Float32BufferAttribute(starVelocities, 1))

var loader=new THREE.TextureLoader();
var circleShape=loader.load("./assets/images/disc.png")

var starMaterial = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 0.2,
  map: circleShape,
  transparent: true
})

var stars  = new THREE.Points(starGeo,starMaterial)
sceneTwo.add(stars)
 
rendererTwo.render(sceneTwo,cameraTwo)

function animate(){
  for(var j=0; j<starGeoCount*3; j+=3){
    starGeo.attributes.position.array[j]+=0
    starGeo.attributes.position.array[j+1]+=0
    starGeo.attributes.position.array[j+2]+=0.02

    if(starGeo.attributes.position.array[j+2] > 30){
      starGeo.attributes.position.array[j+2]= -80
    }
  }
  // stars.rotation.z+=0.0009

  starGeo.attributes.position.needsUpdate= true
  rendererTwo.render(sceneTwo,cameraTwo)
  requestAnimationFrame(animate)
}

animate()

// var ambientLight = new THREE.AmbientLight(0x0c0c0c);
// scene.add(ambientLight);

// var spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 5, 5, 10 );
// scene.add( spotLight );

/*var planeGeometry = new THREE.PlaneGeometry(6,4,1,1);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);

plane.position.z = -12;
plane.position.y = -3;
plane.rotation.x = -1;
plane.rotation.y = 0;
plane.rotation.z = -0.25;*/
 

// var geometry =new THREE.SphereGeometry(3,50,20);
// var material =new THREE.PointsMaterial({color:0xffffff, size: 0.05});
// var globe =new THREE.Points(geometry,material);
// scene.add(globe);

// globe.position.z = -10;
// globe.rotation.x = 10;
// globe.rotation.y = -5;
 

// renderer.render(scene,camera);

// var step=0;

// var animation = function(){
//   //step+=0.06;
//   //cube.position.y = (Math.abs(Math.sin(step)));

//   globe.rotation.y += 0.01;
//   renderer.render(scene,camera);
//   requestAnimationFrame(animation)
// }

// animation();



