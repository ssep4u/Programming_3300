let number = 100;

// h1에 있는 숫자 요소를 가져오자
// const resultH1 = document.getElementsByTagName("h1")[0];
const resultH1 = document.getElementById("result");
// button에 있는 + 요소를 가져오자
// const plusButton = document.getElementsByTagName("button")[0];
// const plusButton = document.getElementsByClassName("plus")[0];

// plusButton.addEventListener("click", () => {
//     number++;
//     resultH1.innerHTML = number;
// });
// plusButton.onclick = () => {
//     number++;
//     resultH1.innerHTML = number;
// };
function render() {
    resultH1.innerHTML = number;
}
// function plus() {
const plus = (value = 1) => {
    number += value;
    render();
}
const reset = () => {
    number = 100;
    render();
}
render();