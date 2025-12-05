alert ("bienbenido")
const Num1 = document.getElementById("num1");
const Num2 = document.getElementById("num2");
const Resultado = document.getElementById("Resultado");
const btnSuma = document.getElementById("sumar");
const btnResta = document.getElementById("restar");
const btnmultiplicación = document.getElementById("multiplicar");
const btndivicion = document.getElementById("dividir");

btnSuma.addEventListener("click", function(){
    const Valor1 = parseFloat(Num1,value) || 0;
    const Valor2 = parseFloat(Num2,value) || 0;

    Resultado.textContent = `Resultado: ${valor1 + valor2}`;
});

btnSuma.addEventListener("click", function(){
    const Valor1 = parseFloat(Num1,value) || 0;
    const Valor2 = parseFloat(Num2,value) || 0;

    Resultado.textContent = `Resultado: ${valor1 - valor2}`;
});

btnSuma.addEventListener("click", function(){
    const Valor1 = parseFloat(Num1,value) || 0;
    const Valor2 = parseFloat(Num2,value) || 0;

    Resultado.textContent = `Resultado: ${valor1 * valor2}`;
});

btnSuma.addEventListener("click", function(){
    const Valor1 = parseFloat(Num1,value) || 0;
    const Valor2 = parseFloat(Num2,value) || 0;

    Resultado.textContent = `Resultado: ${valor1 / valor2}`;
});