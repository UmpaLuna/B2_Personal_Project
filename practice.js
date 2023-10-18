var absolutes = [4, 7, 12]
var signs = [true, false, true]
function solution(absolutes, signs) {
    for (let i = 0; i < absolutes.length; i++) {
        // sign의 i번째가 false면 
        if (signs[i] === false) {
            //absolutes의 i번째도 음수로 만들어주세요
            absolutes[i] = -absolutes[i]
            
        } //그게 아니면 absolutes 양수로 만들어주세요
        else {
            absolutes[i]
        }
        console.log(absolutes)
        //reduce로 absolutes 안의 요소들을 더해줘
    } return absolutes.reduce(function (a, b){
        return (a + b);
    })
}

solution(absolutes,signs)
