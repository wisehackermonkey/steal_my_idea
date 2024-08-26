//stealmyidea.com sourcecode
window.addEventListener("load", e => {

    var gets = document.querySelectorAll("*[get]")
    console.log(gets)


    gets.forEach(async (el) => {

        //TODO select what event listener by click, hover, onload, etc here
        // if (element.getAttribute("onclick")) {
        //     element.addEventListener("click",async el => {
        //         let req_url = el.getAttribute("get")
        //         // let is_replace = el.getAttribute("replace")

        //         let server_says = await fetch(req_url).then(r => { r.text() })
        //         if (server_says === "404") {
        //             return -1;
        //         }
        //         //if(is_replace){
        //         // el.innerHTML = server_says;
        //         // return
        //         // }
        //         el.outerHTML = server_says;

        //     })
        // }


        let req_url = el.getAttribute("get")
        if (el.hasAttribute("target")) {
            alert("hi")
            el.addEventListener("click", async e => {
              
                let target_el = el.getAttribute("target")

                let target_val = document.getElementById(target_el).value
                if (target_val == "") {
                    return -1
                }
                let formData = new FormData();
                formData.append("text",target_val)
                let res = await fetch(req_url,{method:"POST", body:formData}).then(r => {
                    return r.text()
                })
                alert(res)
            })
        }

        if (el.hasAttribute("onload")) {
            let req_url = el.getAttribute("get")
            let server_says = await fetch(req_url).then(r => r.text())
            if (server_says === "404") {
                return -1;
            }
            el.innerHTML = server_says;

        }
    });

})