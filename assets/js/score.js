let highScores=JSON.parse(localStorage.getItem("highScores")) || [];
const scoreList= document.querySelector("#score-list")


for (let i = 0; i < highScores.length; i++) {
    const li= document.createElement("li")
    li.textContent=`Initials: ${highScores[i].initials}  Score: ${highScores[i].score}`
    scoreList.append(li)
}