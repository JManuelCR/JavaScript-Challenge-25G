import { getPosts } from "./getPosts.js";
let params = new URLSearchParams(document.location.search);
let idPost = params.get("post")
console.log(idPost)

const getPostInfo = async (post) => {
    let posts = await getPosts();
    let array = Object.entries(posts);
    let actual = array.reduce((acum, act) => {
        let actualPostKey = act[0];
        if(actualPostKey === post){
            acum = act[1];
        }
        return acum;
    }, {});
    console.log(actual);
    return actual;
}
let postToView = await getPostInfo(idPost);
console.log(postToView)

// Tiene el nombre de usuario, cuando se publico, comentario en texto
let commentSection = () => {
    let divComment = document.createElement("div")
    divComment.classList.add("comment-section__rectangle")

        let divUserName = document.createElement("div")
        divUserName.classList.add("comment-section__rectangle--username")

            let userNameAncor = document.createElement("a")
            userNameAncor.setAttribute("href","#")

                let userName = document.createElement("h6")
                    let  userNameText = document.createTextNode("hgarper")
                    userName.append(userNameText)
            
                let timeOfComment = document.createElement("p")
                    let timeOfCommentText = document.createTextNode("(3 days ago)")
                    timeOfComment.append(timeOfCommentText)
        
            userNameAncor.append(userName,timeOfComment)
        divUserName.append(userNameAncor)

        let divCommentText = document.createElement("div")
        divCommentText.classList.add("comment-section__rectangle--comment")

            let commentAncor = document.createElement("a")
            commentAncor.setAttribute("href","#")

                let commentP = document.createElement("p")
                    let commentPText = document.createTextNode("Nice tips. In my opinion the main thing that separates pros from newbies is that pros turn on all the strict options and still manage to avoid as like the plague because they know a ton of tools like these to avoid it.")
                commentP.appendChild(commentPText)
    
            commentAncor.append(commentP)
        divCommentText.append(commentAncor) 
    divComment.append(divUserName,divCommentText)
    return divComment
}
// crea la imagen del usuario para el comentario
let commentImg = (postToView) => {
    let commentRectangle = commentSection()
    let divComment = document.createElement("div")
    divComment.classList.add("comment-section")

        let divPicture = document.createElement("div")
        divPicture.classList.add("comment-section__picture")

            let imgAncor = document.createElement("a")
            imgAncor.setAttribute("href","#")

                let userImg = document.createElement("img")
                userImg.setAttribute("src",postToView.userProfileImg)
                userImg.classList.add("rounded-circle")
            imgAncor.appendChild(userImg)
        divPicture.appendChild(imgAncor)
    divComment.appendChild(divPicture)
    divComment.append(commentRectangle)
    return divComment
}


// tiene el tiempo de lectura y el icono
let minutesRead = (postToView) => { 
        let minutes = document.createElement("div")
        minutes.classList.add("minutes-read")
            let anchorMins = document.createElement("a")
            anchorMins.classList.add("minutes-read__anc")
            anchorMins.setAttribute("href","#")
                let parrafMins= document.createElement("p")
                parrafMins.classList.add("card-text")
                    let parrafMinsSmall = document.createElement("small")
                    parrafMinsSmall.classList.add("text-body-secondary")
                    let parrafMinsSmallText = document.createTextNode(postToView.postlectureTime)
                    parrafMinsSmall.append(parrafMinsSmallText)
                let imgBook = document.createElement("img")
                    imgBook.setAttribute("src","./assets/icons/book-Icon.svg")
                    imgBook.classList.add("mt-1")
        parrafMins.append(parrafMinsSmall)
        anchorMins.append(parrafMins,imgBook)
        minutes.append(anchorMins)
    return  minutes
}
// este contiene el svg de los comentarios y el numero de comentarios
let emojisReaction = (postToView) => {
    let divEmoji = document.createElement("div")
    divEmoji.classList.add("emojisReaction__comments")

        let emojisAncor = document.createElement("a")
        emojisAncor.classList.add("text-container")
        emojisAncor.setAttribute("href","#")

            let iconComment = document.createElement("img")
            iconComment.setAttribute("src","./assets/icons/black-Flat-Icon.svg")
            
            let  totalReactions = postToView.heartReactions + postToView.unicornReactions + postToView.crazyManReactions + postToView.hansReactions + postToView.fireReactions;
            let parrafComment = document.createElement("p")
                let parrafCommentText = document.createTextNode(totalReactions);
                parrafComment.appendChild(parrafCommentText)
            
                let parrafCommentSpan = document.createElement("span")
                parrafCommentSpan.classList.add("d-none","d-md-inline-block")
                    let parrafCommentSpanText = document.createTextNode("comments")
                    parrafCommentSpan.append(parrafCommentSpanText)
                parrafComment.append(parrafCommentSpan)
        emojisAncor.append(iconComment,parrafComment)
    divEmoji.append(emojisAncor)
    return divEmoji
}
// contiene la coleccion de los icons y el numero de reacciones
let emojisIcons = () => {
    let divContainer = document.createElement("div")
    divContainer.classList.add("emojisReaction__icons")

        let iconsAncor = document.createElement("a")
        iconsAncor.classList.add("text-decoration-none")
        iconsAncor.setAttribute("href","#")

            let iconHeart = document.createElement("img")
                iconHeart.setAttribute("src","./assets/icons/red-Heart-Icon.svg")
                iconHeart.setAttribute("alt","icono de corazon")
            
            let iconUnicorn = document.createElement("img")
                iconUnicorn.setAttribute("src","./assets/icons/unicorn-Icon.svg")
                iconUnicorn.setAttribute("alt","icono de unicornio")
            
            let iconCrazy = document.createElement("img")
                iconCrazy.setAttribute("src","./assets/icons/crazy-Man-Icon.svg")
                iconCrazy.setAttribute("alt","icono de cabeza que explota")
            
            let iconHands = document.createElement("img")
                iconHands.setAttribute("src","./assets/icons/raise-.svg")
                iconHands.setAttribute("alt","icono de manitas diciendo chocalas we")
            
            let iconFire = document.createElement("img")
                iconFire.setAttribute("src","./assets/icons/fire-Icon.svg")
                iconFire.setAttribute("alt","... pos es un icono de fuego")
            
            let spanCounter = document.createElement("span")
                let spanCounterP = document.createElement("p")
                let spanCounterPText = document.createTextNode("240 reactions")

                spanCounterP.append(spanCounterPText)
                spanCounter.append(spanCounterP)

        iconsAncor.append(iconHeart,iconUnicorn,iconCrazy,iconHands,iconFire)      
    divContainer.append(iconsAncor)   
    return divContainer
}   
// mete el numero de comentarios y la lista de emojis en un nuevo div
let emojisReactionWrapper = (postToView) => {
    let emojis = emojisIcons()
    let comment = emojisReaction(postToView) 

    let emojisReactionContainer = document.createElement("div")
        emojisReactionContainer.classList.add("emojisReaction")
    
    emojisReactionContainer.append(emojis,comment)
    return emojisReactionContainer
}   
// mezcla en un nuevo div las reacciones (emojis,comments) y el tiempo de lectura
let userTagsEmojis = (postToView) => {
    let emojisReaction = emojisReactionWrapper(postToView)
    let minutesFunc = minutesRead(postToView)

    let divContainer = document.createElement("div")
        divContainer.classList.add("user-data-space__tags--emojis")

    divContainer.append(emojisReaction,minutesFunc)
    return divContainer
}
// este almacena las #tags (revisar como pasarle los #tags)
let ulListAll = (postTags) => {
    let wrapper = document.createElement("div")
    let ulList = document.createElement("ul")
    wrapper.classList.add("user-data-space__tags--lighter")
    wrapper.appendChild(ulList)
    
    postTags.forEach(element => {
        let listItem = liListAll()
        let itemContent = tagsLighter(element)
        listItem.appendChild(itemContent)
        ulList.appendChild(listItem)
    });
    return wrapper
}
let liListAll = () => {
    let liList = document.createElement("li")
    return liList
}

let tagsLighter = (item) => {
            let firstAncor = document.createElement("a")
                firstAncor.setAttribute("href","#")
                    let firstAncorP = document.createElement("p")
                        let firstAncorText = document.createTextNode(item)
                    firstAncorP.appendChild(firstAncorText)
            firstAncor.appendChild(firstAncorP)
        return firstAncor
}
// almacena el titulo de la publicacion con los iconos de la parte de abajo
let postBodyWrapper = (postToView) => {
    let postBody = document.createElement("div")
        postBody.classList.add("user-data-space__tags","card-body")
    
        let postH2 = document.createElement("h2")
            postH2.classList.add("card-title")

                let titleAncor = document.createElement("a")
                    titleAncor.setAttribute("href","./html/post.html")

                    let titleText = document.createTextNode(postToView.postTitle)
                titleAncor.appendChild(titleText)
            postH2.appendChild(titleAncor)
        postBody.append(postH2)
    return postBody
}
// jala de la BD el nombre completo del usuario que creo el post y la fecha de creacion
let userDataOnPost = (postToView) => {
    let userNameSpace = document.createElement("div")
        userNameSpace.classList.add("user-data-space__name")
    
        let ancoreBold = document.createElement("a")
            ancoreBold.classList.add("user-data-space__name--bold")
            ancoreBold.setAttribute("href","./html/post.html")

                let ancoreP = document.createElement("p")
                    ancoreP.classList.add("author-name")
                    let ancoreText = document.createTextNode(postToView.userName)
                ancoreP.append(ancoreText)
        ancoreBold.append(ancoreP)
    userNameSpace.append(ancoreBold)

        let creationAncor = document.createElement("a")
            creationAncor.classList.add("text-decoration-none","text-black")
            creationAncor.setAttribute("href","./html/post.html")

                let creationP = document.createElement("p")
                    creationP.classList.add("reation-date")
                    let creationText = document.createTextNode(postToView.date)
                creationP.appendChild(creationText)
            creationAncor.appendChild(creationP)
        userNameSpace.append(creationAncor)

    return userNameSpace
}
// almacena la imagen del creador del post con su nombre y fecha de creacion
let creatorProfilePicture = (postToView) => {
    let creatorPicture = document.createElement("div")
        creatorPicture.classList.add("user-data-space","d-flex")

        let imgOnMini = document.createElement("div")
            imgOnMini.classList.add("user-data-space__mini")

                let pictureAncor = document.createElement("a")
                    pictureAncor.setAttribute("href","./html/post.html")
                
                        let picture = document.createElement("img")
                            picture.classList.add("rounded-circle")
                            picture.setAttribute("src",postToView.userProfileImg)
                pictureAncor.append(picture)
            imgOnMini.append(pictureAncor)
        creatorPicture.append(imgOnMini)
    return creatorPicture
}
// almacena la imagen principal del post
let imageCardPost = (postToView) => {
    let imgContainer = document.createElement("div")
    imgContainer.classList.add("img-container", "card", "mb-3","d-flex")
    
        let imgContainerAncor = document.createElement("a")
        imgContainerAncor.setAttribute("href","#")

            let image = document.createElement("img")
            image.classList.add("card-img-top")    
            image.setAttribute("src",postToView.postImage)
            image.setAttribute("alt",postToView.postImageTitle)

        imgContainerAncor.append(image)
        imgContainer.append(imgContainerAncor)
        return imgContainer
}
let sectionWrapper = () => {
    let section = document.createElement("section")
    section.setAttribute("id","postview")
    section.classList.add("col-12","col-md-10","col-lg-6")
    return section
}

// almacena el contenido completo de la card post principal del main
let cardWrapper = (postToView,key) => {
    let sectionWrapperr = sectionWrapper()
    let userNameData = creatorProfilePicture(postToView)
        let userData = userDataOnPost(postToView)
            userNameData.append(userData)
    
    let contenTags = postBodyWrapper(postToView)
    console.log(postToView)
    let allTags = ulListAll(postToView.postTags)
        contenTags.append(allTags)
    let emojis = userTagsEmojis(postToView)
        contenTags.append(emojis)
    let comments = commentImg(postToView)
    let imgContainer = imageCardPost(postToView)
        imgContainer.append(userNameData)
        imgContainer.append(contenTags)
        
        
        let containerCard = document.createElement("div")
    containerCard.classList.add("card-cont","d-flex","justify-content-center")

        containerCard.append(imgContainer)
    sectionWrapperr.appendChild(containerCard)
return sectionWrapperr
}

let newCard = cardWrapper(postToView)
console.log(newCard)

let sectionLocation = document.getElementById("postView")
sectionLocation.append(newCard)