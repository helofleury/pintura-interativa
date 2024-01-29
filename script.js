document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("paintCanvas");
    const context = canvas.getContext("2d");

    let painting = false;
    let erasing = false;
    let brushSize = 10;
    let currentColor = "#000000"; // Cor preta padrão

    // Paleta de cores
    const colorPalette = document.getElementById("colorPalette");
    const colors = ["#000000", "#ff0000", "#0000ff", "#ffff00", "#00ff00", "#e8c39e", "#ff00ff", "#00ffff", "#964b00", "#ffffff"];

    colors.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        if (color === "#ffffff") {
            colorDiv.classList.add("white");
        }
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener("click", () => selectColor(color));
        colorPalette.appendChild(colorDiv);
    });

    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.strokeStyle = currentColor;

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        context.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        context.lineWidth = brushSize;
        context.strokeStyle = erasing ? "#ffffff" : currentColor;

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function selectColor(color) {
        erasing = color === "#ffffff";
        currentColor = color;

        // Remover a classe 'selected' de todas as cores
        const allColors = document.querySelectorAll('.color');
        allColors.forEach(colorDiv => {
            colorDiv.classList.remove('selected');
        });

        // Adicionar a classe 'selected' à cor selecionada
        const selectedColor = document.querySelector(`.color[style="background-color: ${color};"]`);
        selectedColor.classList.add('selected');
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function updateBrushSize() {
        brushSize = document.getElementById("brushSize").value;
        context.lineWidth = brushSize;
    }

    document.getElementById("clearButton").addEventListener("click", clearCanvas);
    document.getElementById("brushSize").addEventListener("input", updateBrushSize);
});







