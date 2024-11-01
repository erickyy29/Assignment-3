document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('heron').addEventListener('submit', function (event) {
        event.preventDefault();

        const a = parseFloat(document.getElementById("heron-a").value);
        const b = parseFloat(document.getElementById("heron-b").value);
        const c = parseFloat(document.getElementById("heron-c").value);

        const response = Math.sqrt((4 * a * a * b * b) - Math.pow(a * a + b * b - c * c, 2)) / 4;

        document.getElementById("heron-result").value = response.toFixed(2);
    });

    document.getElementById('ambig').addEventListener('submit', function (event) {
        event.preventDefault();

        const A = parseFloat(document.getElementById("ambig-angle-A").value);
        const a = parseFloat(document.getElementById("ambig-side-a").value);
        const b = parseFloat(document.getElementById("ambig-side-b").value);

        const h = b * Math.sin(A * (Math.PI / 180));

        let response;

        if (A < 90) {
            if (a < h) {
                response = "No Triangle";
            } else if (a === h) {
                response = "Right Triangle";
            } else if (a >= b) {
                response = "One Triangle";
            } else {
                response = "Two Triangles (ambiguous)";
            }
        } else {
            response = (a <= b) ? "No Triangle" : "One Triangle";
        }

        document.getElementById("ambig-result").value = response;
    });

    document.getElementById('poly').addEventListener('submit', function (event) {
        event.preventDefault();

        const coeff = document.getElementById("poly-coeff").value.split(' ').map(Number);
        const exp = document.getElementById("poly-exp").value.split(' ').map(Number);
        const x = parseFloat(document.getElementById("poly-x").value);

        let p = ["f(x) = ", ""]
        let polyValue = 0;

        coeff.forEach((c, i) => {

            if (i > 0) {
                p[0] += (c > 0 ? " + " : " - ");
            }

            const absCoeff = Math.abs(c);
            const expStr = exp[i] === 0 ? "" :
                exp[i] === 1 ? "x" :
                    `x^${exp[i]}`;

            p[0] += (c === 1 && exp[i] !== 0 ? "" : absCoeff) + expStr;

            polyValue += c * Math.pow(x, exp[i]);
        });

        p[1] = `f(${x}) = ${polyValue.toFixed(2)}`;

        document.getElementById("poly-result").value = p.join('\n');
    });

    document.getElementById('newt').addEventListener('submit', function (event) {
        event.preventDefault();

        let zeroX = parseFloat(document.getElementById("newt-g").value);

        let func = [6, -13, -18, 7, 6];
        let dFunc = [24, -39, -36, 7];
        let tolerance = 1e-8;
        let maxIterations = 100;
        let iteration = 0;

        while (iteration < maxIterations) {
            let funcValue = 0;
            let dFuncValue = 0;

            for (let i = 0; i < func.length; i++) {
                funcValue += func[i] * Math.pow(zeroX, (func.length - i - 1));
                if (i < dFunc.length) {
                    dFuncValue += dFunc[i] * Math.pow(zeroX, (dFunc.length - i - 1));
                }
            }

            let nextX = zeroX - (funcValue / dFuncValue);

            if (Math.abs(funcValue) < tolerance) {
                break;
            }

            zeroX = nextX;
            iteration++;
        }

        document.getElementById("newt-result").value = zeroX.toFixed(2);
    });
});