let screen = document.getElementById("screen");
let keys = document.getElementById("keyContainer");

let fullExp = "";
let lastType = "";

function show(val){
    screen.textContent = val;
}

function isOp(v){
    return ["+","-","×","÷"].includes(v);
}

function clearAll(){
    fullExp = "";
    show("0");
    lastType = "";
}

function removeLast(){
    if(fullExp.length > 0){
        fullExp = fullExp.slice(0, -1);
        show(fullExp === "" ? "0" : fullExp);
    }
}

function convert(exp){
    return exp.replace(/×/g,"*").replace(/÷/g,"/");
}

function calculate(){
    if(fullExp === "") return;

    if(isOp(fullExp.slice(-1))){
        fullExp = fullExp.slice(0,-1);
    }

    try{
        let result = Function("return " + convert(fullExp))();
        show(result);
        fullExp = result.toString();
        lastType = "equal";
    }catch(e){
        show("Error");
    }
}

let allBtns = document.querySelectorAll(".btn");

allBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        let val = btn.getAttribute("data-value");
        let act = btn.getAttribute("data-action");

        if(act === "clear"){
            clearAll();
            return;
        }

        if(act === "del"){
            removeLast();
            return;
        }

        if(act === "equal"){
            calculate();
            return;
        }

        if(val){

            if(val === "." && screen.textContent.includes(".") && !isOp(lastType)){
                return;
            }

            if(fullExp === "" && isOp(val) && val !== "-"){
                return;
            }

            if(lastType === "equal" && !isOp(val)){
                fullExp = "";
            }

            if(isOp(val) && isOp(fullExp.slice(-1))){
                fullExp = fullExp.slice(0,-1) + val;
            } else {
                fullExp += val;
            }

            show(fullExp);
            lastType = val;
        }
    });
});
