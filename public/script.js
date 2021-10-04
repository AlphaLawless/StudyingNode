const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector("form")

async function load() {
  const res = await fetch("http://localhost:3000/").then((data) => data.json())

  res.urls.map(({name, url}) => addElement({name, url}))
}

load()

function addElement({name, url}) {
  const li = document.createElement("li")
  const a = document.createElement("a")
  const trash = document.createElement("span")

  a.href = url
  a.innerHTML = name
  a.target = "_blank"

  trash.innerHTML = "x"
  trash.onclick = () => removeElement(li)

  li.append(a)
  li.append(trash)
  ul.append(li)
}

async function removeElement(elementar) {
  // Study more about parentNode
  // Study more about endsWith
  if (confirm("Tem certeza que deseja deletar?")) {
    const linkElement = elementar.querySelector('a')
    const url = linkElement.href.replace(/\/$/, '')
    const name = linkElement.innerHTML
    const del = await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`).then((data) => data.json())

    if (del.message === "OK") {
      elementar.remove()
    }
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  let {value} = input

  if (!value)
    return alert("Preencha o campo")

  const [name, url] = value.split(",")

  if (!url)
    return alert("Formate o texto da maneira correta!")

  if (!/^http/.test(url))
    return alert("Digite a url da maneira correta")

  const ok = await fetch(`http://localhost:3000/?name=${name}&url=${url}`).then((callback) => callback.json())

  if (ok.message === "OK") {
    addElement({name, url})
  }

  input.value = ""


})
