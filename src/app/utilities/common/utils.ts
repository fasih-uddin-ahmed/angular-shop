export function onNumericInput(number) {
    let value = +number;
    if (value >= 1 && value < 1000) {
        return value;
    } else {
        alert("please enter the quantity from 1 to 999");
        return 0
    }
}
