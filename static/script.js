//stealmyidea.com sourcecode
window.addEventListener("load", e => {


    let targetNode = document.getElementById("post_list")

    let config = { attributes: true, childList: true, subtree: true }

    let observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                console.log("dom updated");
                var gets = document.querySelectorAll("*[get]")
                gets.forEach(el => {
                    if (el.getAttribute("target")) {
                        el.addEventListener("click", e => {
                            let target_name = el.getAttribute("target")
                            let url = el.getAttribute("get")
                            let target_el = document.getElementById(target_name)
                            let target_val = target_el.innerText
                                target_val = parseInt(target_val)
                                let formData = new FormData()
                                formData.append("vote",target_val)
                                let value_updated = fetch(url, {method: "POST", body:formData}).then(r=> r.text)
                                
                                // target_val += 1;

                                if (url.includes('/up/')) {
                                    target_val += 1;
                                } else if (url.includes('/down/')) {
                                    target_val -= 1;
                                }
                                setTimeout(()=>{

                                    target_el.innerText = target_val 
                                },300)

                        })
                    }
                    
                })

                return -1

            }
        }

    })
    observer.observe(targetNode, config);

    // Later, you can stop observing
    // observer.disconnect();
    var gets = document.querySelectorAll("*[get]")
    console.log(gets)


    gets.forEach(async (el) => {
        let req_url = el.getAttribute("get")
        if (el.hasAttribute("target")) {
            el.addEventListener("click", async e => {
                

                let target_name = el.getAttribute("target")
                let target_el = document.getElementById(target_name)
                let target_val = target_el.value
                if (target_val == "") {
                    return -1
                }
                let formData = new FormData();
                formData.append("text", target_val)
                let res = await fetch(req_url, { method: "POST", body: formData }).then(r => {
                    return r.text()
                })
                target_el.value = res
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
