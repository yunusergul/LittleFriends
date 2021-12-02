const  myHeaders = new Headers();
myHeaders.append("app-id", "secretKey");
const motherDiv = document.querySelector(".commentCS")
resetdivContainer = (el) => {
    let a = document.querySelector(`#${el}`)
    a.remove()
}

webStart = () => {
    var titleT = document.title;
    var newTitle = "Please Don't Forget Us";

    window.onblur = function(){
        document.title = newTitle;
    }

    window.onfocus = function()
    {
        document.title = titleT;
    }
    getPost()
}
dateRet = (ss) => {
    let d = new Date(ss)
    let t = new Date()
    let t1 = Math.abs(t.getTime() - d.getTime());
    let kar = Math.ceil(t1 / (1000 * 3600 *24))
    console.log(kar)
    if(kar>=360){
        return `uploaded about ${Math.floor(kar/360)} years ago`
    }
    else if (kar < 360 && kar > 30 ){
        return `uploaded about ${Math.floor(kar/30)} months ago`
    }
    else if (kar <= 30 && kar > 7){
        return `uploaded about  ${Math.floor(kar/7)} weeks  ago`
    }
    else if (kar <= 7 && kar > 1){
        return `uploaded about ${kar} days ago`
    }
    else{
        return "uploaded today"
    } 
}
Creatingcomment = (commentControl, username, comment, pic ,useriD) => {
    if (!commentControl) { motherDiv.innerHTML = "No Comment" }
    else {
        let mDiv = document.createElement("div")
        mDiv.classList.add("d-flex", "text-muted", "pt-3")
        let img = document.createElement("img")
        img.classList.add("bd-placeholder-img", "flex-shrink-0", "me-2", "rounded")
        img.type = "button"
        img.dataset.bsToggle = "modal"
        img.dataset.bsTarget = "#staticBackdrop"
        img.width = "32"
        img.height = "32"
        img.src = pic
        let conP = document.createElement("p")
        conP.classList.add("pb-3", "mb-0", "small", "lh-sm", "border-bottom")
        let strong = document.createElement("strong")
        strong.classList.add("d-block", "text-gray-dark")
        let cA = document.createElement("a")
        cA.href = "#"
        cA.innerHTML = username
        cA.type = "button"
        cA.dataset.bsToggle = "modal"
        cA  .dataset.bsTarget = "#staticBackdrop2"
        cA.onclick =function () { userDetail(useriD) }; 
        let pConP = document.createElement("div")
        pConP.classList.add("col")
        pConP.innerHTML = comment
        strong.appendChild(cA)
        conP.appendChild(strong)
        conP.appendChild(pConP)
        mDiv.appendChild(img)
        mDiv.appendChild(conP)
        mDiv.appendChild(pConP)
        motherDiv.appendChild(mDiv)
    }
}

commentConn = (postId) => {
    
    motherDiv.innerHTML = ""
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://dummyapi.io/data/v1/post/" + postId + "/comment", requestOptions)
        .then(response => response.text())
        .then(result => {
            let length = JSON.parse(result)
            if (length.data.length == 0) { Creatingcomment(false) }
            else {
                for (i = 0; i <= length.data.length - 1; i++) {
                    console.log(length.data[i])
                    let message = length.data[i].message
                    let ownere = length.data[i].owner
                    let ownerPicture = length.data[i].owner.picture
                    let ownerName = ownere.firstName + "-" + ownere.lastName
                    let useriD = ownere.id
                    Creatingcomment(true, ownerName, message, ownerPicture, useriD)
                }
            }
        })
        .catch(error => console.log('error', error));

}

DetailPicture = (pId) => {
    commentConn(pId)
    let img = document.querySelector(".contImage")
    img.src =  ""
    let text = document.querySelector(".contText")
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://dummyapi.io/data/v1/post/" + pId, requestOptions)
        .then(response => response.text())
        .then(result => {
            let ssq = JSON.parse(result)
            let img = document.querySelector(".contImage")
            text = document.querySelector(".contText")
            let user = document.querySelector(".conUser")
            user.onclick = function () { userDetail(ssq.owner.id) }; 
            img.src = ssq.image
            text.innerHTML = ssq.text + "  "
            user.innerHTML = "@" + ssq.owner.firstName + "-" + ssq.owner.firstName
            text.appendChild(user)
        })
        .catch(error => console.log('error', error));
}

CreatingPost = (image, posttext, name, date, postId, userId) => {
    const mother3ColDiv = document.querySelector(".mdivJJ")
    const mainDiv = document.createElement("div")
    mainDiv.classList.add("col")
    const mainDiv2 = document.createElement("div")
    mainDiv2.classList.add("card", "h-100")
    const postimg = document.createElement("img")
    postimg.type = "button"
    postimg.href = ""
    postimg.dataset.bsToggle = "modal"
    postimg.dataset.bsTarget = "#staticBackdrop"
    postimg.classList.add("card-img-top")
    postimg.src = image //////////////
    postimg.onclick = function () { DetailPicture(postId) };
    const cartDiv = document.createElement("div")
    cartDiv.classList.add("card-body")
    const postTextDiv = document.createElement("div")
    postTextDiv.classList.add("row")
    const postTextP = document.createElement("p")
    postTextP.classList.add("card-text")
    postTextP.innerHTML = posttext
    const mContDiv = document.createElement("div")
    mContDiv.classList.add("row")
    const contentDiv = document.createElement("div")
    contentDiv.classList.add("col")
    const contentTextP = document.createElement("p")
    contentTextP.classList.add("card-text")
    const contentTextSmall = document.createElement("small")
    contentTextSmall.classList.add("text-muted")
    const userDiv = document.createElement("div")
    userDiv.classList.add("col", "d-flex", "justify-content-end")
    const userTextP = document.createElement("p")
    userTextP.classList.add("card-text")
    const userTextSmall = document.createElement("small")
    userTextSmall.classList.add("text-muted")
    const userTextA = document.createElement("a")
    userTextA.innerHTML = name
    userTextA.type = "button"
    userTextA.dataset.bsToggle = "modal"
    userTextA.dataset.bsTarget = "#staticBackdrop2"
    userTextA.href = ""
    userTextA.onclick =function () { userDetail(userId) }; 
    const timeDiv = document.createElement("div")
    timeDiv.classList.add("card-footer")
    const timeTextSmall = document.createElement("small")
    timeTextSmall.classList.add("text-muted")
    timeTextSmall.innerHTML = date
    contentTextP.appendChild(contentTextSmall)
    contentDiv.appendChild(contentTextP)
    mContDiv.appendChild(contentDiv)
    userTextSmall.appendChild(userTextA)
    userTextP.appendChild(userTextSmall)
    userDiv.appendChild(userTextP)
    mContDiv.appendChild(userDiv)
    postTextDiv.appendChild(postTextP)
    cartDiv.appendChild(postTextDiv)
    cartDiv.appendChild(mContDiv)
    timeDiv.appendChild(timeTextSmall)
    mainDiv2.appendChild(postimg)
    mainDiv2.appendChild(cartDiv)
    mainDiv2.appendChild(timeDiv)
    mainDiv.appendChild(mainDiv2)
    mother3ColDiv.appendChild(mainDiv)
}

getPost = () => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("https://dummyapi.io/data/v1/post?limit=100", requestOptions)
        .then(response => response.text())
        .then(result => {
            let length = JSON.parse(result)
            for (i = 0; i <= length.limit - 1; i++) {
                let image = length['data'][i]['image']
                let postText = length['data'][i]['text']
                let name = "@" + length['data'][i]['owner']['firstName'] + "-" + length['data'][i]['owner']['lastName']
                let date = dateRet(length['data'][i]['publishDate'])
                let postId = length['data'][i]['id']
                let userId = length['data'][i].owner.id
                CreatingPost(image, postText, name, date, postId, userId)
            }
        })
        .catch(error => console.log('error', error));
}

userDetail = (id) => {
    let nameTT = document.querySelector(".nameTT")
    nameTT.innerHTML = ""
    let iddTT = document.querySelector(".iddTT")
    iddTT.innerHTML = ""
    let iEmaiTT = document.querySelector(".oemaiTT")
    iEmaiTT.innerHTML = ""
    let countryTT = document.querySelector(".countryTT")
    countryTT.innerHTML = ""
    let picTT = document.querySelector(".picTT")
    picTT.src = "/img/img.jpg"
    let joinTT = document.querySelector(".joinTT")
    joinTT.innerHTML = ""

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("https://dummyapi.io/data/v1/user/" + id, requestOptions)
        .then(response => response.text())
        .then(result => {
            let userD = JSON.parse(result)
            let name = userD.firstName+" "+userD.lastName
            let sName = userD.firstName.toLowerCase()+"-"+userD.lastName.toLowerCase()
            let picture = userD.picture
            let gender = userD.gender
            let email = userD.email
            let registerDate = userD.registerDate
            let location = userD.location.country+"/"+userD.location.state+"/"+userD.location.city
            nameTT.innerHTML = name
            nameTT.style.color = gender == "female" ? "pink" : "blue"
            iddTT.innerHTML = "@"+sName
            console.log(iEmaiTT)
            console.log(email)
            iEmaiTT.innerHTML = email
            picTT.src = picture
            countryTT.innerHTML = location
            joinTT.innerHTML = dateRet(registerDate)
        })
        .catch(error => console.log('error', error));
}

webStart()