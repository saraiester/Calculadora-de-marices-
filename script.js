let matrix1 = [];
let matrix2 = [];

// Función para crear una matriz
function createMatrix(matrixNum) {
    const rows = parseInt(document.getElementById(`rows${matrixNum}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixNum}`).value);

    if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
        alert("Por favor, ingrese un tamaño válido para la matriz.");
        return;
    }

    const container = document.getElementById(`matrix${matrixNum}-container`);
    container.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.id = `matrix${matrixNum}-${i}-${j}`;
            container.appendChild(input);
        }
        container.appendChild(document.createElement("br"));
    }

    container.classList.remove("hidden");
}

// Función para limpiar una matriz
function clearMatrix(matrixNum) {
    const container = document.getElementById(`matrix${matrixNum}-container`);
    container.innerHTML = "";
    container.classList.add("hidden");

    document.getElementById(`rows${matrixNum}`).value = "";
    document.getElementById(`cols${matrixNum}`).value = "";

    document.getElementById("result-container").classList.add("hidden");

   
}

// Función para obtener los valores de una matriz
function getMatrix(matrixNum, rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            const value = parseFloat(document.getElementById(`matrix${matrixNum}-${i}-${j}`).value);
            matrix[i][j] = isNaN(value) ? 0 : value;
        }
    }
    return matrix;
}

// Función para mostrar el resultado
function showResult(result) {
    const resultContainer = document.getElementById("result-container");
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (typeof result === "string") {
        resultDiv.innerHTML = result;
    } else {
        let resultHTML = "<table border='1' style='border-collapse: collapse; text-align: center;'>";
        result.forEach(row => {
            resultHTML += "<tr>";
            row.forEach(value => {
                resultHTML += `<td style='padding: 5px;'>${value.toFixed(2)}</td>`;
            });
            resultHTML += "</tr>";
        });
        resultHTML += "</table>";

        resultDiv.innerHTML = resultHTML;
    }

    resultContainer.classList.remove("hidden");
}

// Operaciones básicas y avanzadas
function addMatrices() {
    const rows1 = parseInt(document.getElementById("rows1").value);
    const cols1 = parseInt(document.getElementById("cols1").value);
    const rows2 = parseInt(document.getElementById("rows2").value);
    const cols2 = parseInt(document.getElementById("cols2").value);

    if (rows1 !== rows2 || cols1 !== cols2) {
        alert("Las matrices deben tener las mismas dimensiones para sumarse.");
        return;
    }

    matrix1 = getMatrix(1, rows1, cols1);
    matrix2 = getMatrix(2, rows2, cols2);

    const result = [];
    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols1; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }

    showResult(result);
}

function subtractMatrices() {
    const rows1 = parseInt(document.getElementById("rows1").value);
    const cols1 = parseInt(document.getElementById("cols1").value);
    const rows2 = parseInt(document.getElementById("rows2").value);
    const cols2 = parseInt(document.getElementById("cols2").value);

    if (rows1 !== rows2 || cols1 !== cols2) {
        alert("Las matrices deben tener las mismas dimensiones para restarse.");
        return;
    }

    matrix1 = getMatrix(1, rows1, cols1);
    matrix2 = getMatrix(2, rows2, cols2);

    const result = [];
    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols1; j++) {
            result[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }

    showResult(result);
}

function multiplyMatrices() {
    const rows1 = parseInt(document.getElementById("rows1").value);
    const cols1 = parseInt(document.getElementById("cols1").value);
    const rows2 = parseInt(document.getElementById("rows2").value);
    const cols2 = parseInt(document.getElementById("cols2").value);

    if (cols1 !== rows2) {
        alert("El número de columnas de la Matriz A debe ser igual al número de filas de la Matriz B.");
        return;
    }

    matrix1 = getMatrix(1, rows1, cols1);
    matrix2 = getMatrix(2, rows2, cols2);

    const result = [];
    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols2; j++) {
            result[i][j] = 0;
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    showResult(result);
}

function multiplyByScalar(matrixNum) {
    const scalar = parseFloat(document.getElementById("scalar").value);
    if (isNaN(scalar)) {
        alert("Ingrese un escalar válido.");
        return;
    }

    const rows = parseInt(document.getElementById(`rows${matrixNum}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixNum}`).value);

    const matrix = getMatrix(matrixNum, rows, cols);

    const result = [];
    for (let i = 0; i < rows; i++) {
        result[i] = [];
        for (let j = 0; j < cols; j++) {
            result[i][j] = matrix[i][j] * scalar;
        }
    }

    showResult(result);
}

function transposeMatrix(matrixNum) {
    const rows = parseInt(document.getElementById(`rows${matrixNum}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixNum}`).value);

    const matrix = getMatrix(matrixNum, rows, cols);

    const result = [];
    for (let j = 0; j < cols; j++) {
        result[j] = [];
        for (let i = 0; i < rows; i++) {
            result[j][i] = matrix[i][j];
        }
    }

    showResult(result);
}

function determinantMatrix(matrixNum) {
    const rows = parseInt(document.getElementById(`rows${matrixNum}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixNum}`).value);

    if (rows !== cols) {
        alert("La matriz debe ser cuadrada para calcular su determinante.");
        return;
    }

    const matrix = getMatrix(matrixNum, rows, cols);
    const determinant = calculateDeterminant(matrix);

    showResult([[determinant]]);
}

function calculateDeterminant(matrix) {
    const n = matrix.length;

    if (n === 1) {
        return matrix[0][0];
    }

    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let determinant = 0;
    for (let j = 0; j < n; j++) {
        const cofactor = matrix[0][j] * calculateCofactor(matrix, 0, j);
        determinant += cofactor;
    }
    return determinant;
}

function calculateCofactor(matrix, row, col) {
    const submatrix = [];
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        if (i !== row) {
            const submatrixRow = [];
            for (let j = 0; j < n; j++) {
                if (j !== col) {
                    submatrixRow.push(matrix[i][j]);
                }
            }
            submatrix.push(submatrixRow);
        }
    }
    return Math.pow(-1, row + col) * calculateDeterminant(submatrix);
}

function identityMatrix(matrixNum) {
    const rows = parseInt(document.getElementById(`rows${matrixNum}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixNum}`).value);

    if (rows !== cols) {
        alert("La matriz identidad debe ser cuadrada.");
        return;
    }

    const identity = [];
    for (let i = 0; i < rows; i++) {
        identity[i] = [];
        for (let j = 0; j < cols; j++) {
            identity[i][j] = i === j ? 1 : 0;
        }
    }

    showResult(identity);
}

function inverseMatrix(matrixNum) {
    const rows = parseInt(document.getElementById(`rows${matrixNum}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixNum}`).value);

    if (rows !== cols) {
        alert("La matriz debe ser cuadrada para calcular su inversa.");
        return;
    }

    const matrix = getMatrix(matrixNum, rows, cols);
    const determinant = calculateDeterminant(matrix);

    if (determinant === 0) {
        showResult("La matriz no tiene inversa porque su determinante es cero.");
        return;
    }

    const inverse = calculateInverse(matrix);
    showResult(inverse);
}

function calculateInverse(matrix) {
    const n = matrix.length;
    const augmentedMatrix = [];

    for (let i = 0; i < n; i++) {
        augmentedMatrix[i] = [...matrix[i], ...Array(n).fill(0)];
        augmentedMatrix[i][n + i] = 1;
    }

    for (let i = 0; i < n; i++) {
        let pivot = augmentedMatrix[i][i];
        if (pivot === 0) {
            alert("No se puede calcular la inversa debido a un pivote cero.");
            return;
        }

        for (let j = 0; j < 2 * n; j++) {
            augmentedMatrix[i][j] /= pivot;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = augmentedMatrix[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
                }
            }
        }
    }

    const inverse = [];
    for (let i = 0; i < n; i++) {
        inverse[i] = augmentedMatrix[i].slice(n);
    }

    return inverse;
}