
let responseChats = [
   {title:"Hello"},
   {title:"Hey"},
   {title:"Hello"},
   {title:"Kai cenat"},
   {title:"Hey"},
   {title:"duke dennis"},
   {title:"fanum tax"},
   {title:"duke dennis"},
   
]

let titles = new Set()
responseChats.map((item)=>{
  titles.add(item.title)
})
titles.forEach((data)=>{
  console.log(data)
})