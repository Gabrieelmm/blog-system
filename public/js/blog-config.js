var blogNameItens = document.getElementsByClassName('blog-name');
const config = {
    nomeDoBlog: "Blog",
    descDoBlog:"Um blog sobre programação e tecnologia.",
}

function nomeiaBlog(nome) {
    for(item of blogNameItens) {
        let txt = document.createTextNode(nome)
        item.appendChild(txt)
    }
}

nomeiaBlog(config.nomeDoBlog)

function descBlog(desc) {
    let txt = document.createTextNode(desc);
    document.getElementById('desc').appendChild(txt)
}

descBlog(config.descDoBlog)