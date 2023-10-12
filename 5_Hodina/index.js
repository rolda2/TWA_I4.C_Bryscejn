async function sendRequest(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

document.addEventListener('DOMContentLoaded', async ()=> {
    const data = await sendRequest('http://kuroedov.lab.uzlabina.cz/twa/api/02_slow.php');
    const parsed = JSON.parse(data)
    let a = document.getElementById('loader')
    parsed.forEach((e)=> {
        const list = document.createElement("li")
        list.innerHTML = e
        a.append(list)

    })
    document.getElementById('circle').style.visibility = 'hidden';
    document.getElementById('circle').style.height = 0 + 'px';
    console.log(parsed)
})