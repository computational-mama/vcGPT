

var loader = document.getElementById("lds-ellipsis");
var readmore = document.getElementById("readmore");
var gptPrompt = document.getElementById("addtext")
var ul = document.getElementById("linklist");

// loader.style.display = "none"
function submitMe() {
    // form.submit();
    // console.log(form)
    readmore.classList.remove("flex");
    readmore.classList.add("hidden");
    gptPrompt.classList.remove("flex");
    gptPrompt.classList.add("hidden");
    loader.classList.remove("hidden");
    loader.classList.add("flex");
    var lis = document.querySelectorAll('#linklist li');
    for(var i=0; li=lis[i]; i++) {
        li.parentNode.removeChild(li);
    }
    var prompting1 = document.getElementById("prompt1").value
    // var prompting2 = document.getElementById("prompt2").value
    console.log(prompting1)
    if(prompting1 !== ""){
        sendData(prompting1)
    }

};


async function sendData(prompt1) {
    
    const promptdata = { 
        "p1" : prompt1
        
     };
     
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promptdata)
    };

    fetch('/api', options).then(response => {
        console.log(response)
        return response.text();
    })
     .then(data => {
         // console.log(data)
         const obj = JSON.parse(data)
         loader.classList.remove("flex");
         loader.classList.add("hidden");
         gptPrompt.classList.remove("hidden");
        gptPrompt.classList.add("flex");
         readmore.classList.remove("hidden");
         readmore.classList.add("flex");
         let links = []
         if(obj !== ""){
            console.log(obj.promptres)
            console.log(obj.promptref)
            // let c_data = obj.imagelink.replace(/"/g, '');
            // var aimg = document.getElementById("addimage");
            // aimg.src = c_data
            // document.getElementById('imagepush').appendChild(aimg);

            let cap_data = obj.promptres;
            var promptOut = document.getElementById("addtext");
            promptOut.innerHTML = cap_data
            document.getElementById('imagepush').appendChild(promptOut);

            links = obj.promptref
            var li, acap, text
            if( cap_data != "null"){
            for(i=0;i<links.length;i++){
                // console.log(links[i].title)
                // console.log(links[i].url)
                // var aDiv = document.createElement("p")
                // aDiv.innerHTML = links[i].title
                 li = document.createElement("li");
                acap = document.createElement("a");
                text = document.createTextNode(links[i].title);

                // acap.innerHTML = links[i].title
                acap.href = links[i].url
                acap.target = "_blank"
                acap.setAttribute("class", "readlinks");
                acap.appendChild(text);
                li.appendChild(acap);
                ul.appendChild(li);
                // document.getElementById('addlinks').appendChild(aDiv);
            }
            document.querySelector("#addlinks").appendChild(ul);
            ul.setAttribute("id", "linklist");
        }
        }

    })
    .catch(ex => {
        console.error(ex);
    })

}


