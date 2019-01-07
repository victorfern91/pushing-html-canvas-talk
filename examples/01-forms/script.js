import PassePartout from "../common/passepartout.js";
import { getRandomInt } from "../common/utils.js";
import fpsWatcher from "../common/watcher.js";

const canvas  = document.querySelector("canvas");
const { width, height } = canvas;
const context = canvas.getContext("2d", { alpha: false });
const passepartout = new PassePartout(context);

const RADIUS = 2;

let isCircle = true;

let cubes = [];
const colors = [
    "#BF6069",
    "#A1BE89",
    "#ECCB86",
    "#7F9FC1",
    "#B38CAD",
    "#85BFD0"
]

function updateValues() {
    cubes = cubes.map(cube => {
        if (cube.y >= height - RADIUS || cube.y <= 0) {
            cube.vy = -cube.vy;
        }

        if (cube.x >= width - RADIUS || cube.x <= 0)  {
            cube.vx = -cube.vx
        }

        cube.x += cube.vx;
        cube.y += cube.vy;

        return {
            ...cube
        }
    })
}

function draw() {
    context.clearRect(0,0, width, height);
    context.fillStyle = "#323743";
    context.fillRect(0,0, width, height);

    context.beginPath();

    if (isCircle) {
        cubes.forEach(cube => passepartout.drawCircle(cube.x, cube.y, RADIUS, cube.color));
    } else {
        cubes.forEach(cube => passepartout.drawSquare(cube.x, cube.y, RADIUS, cube.color));
    }


    context.closePath();
}

function step() {
    fpsWatcher.start();

    updateValues();
    draw();

    fpsWatcher.end();

    window.requestAnimationFrame(step);
}

function addCube(numberOfCubesToAdd) {
    let i = 0;

    if (numberOfCubesToAdd === -1) {
        cubes = [];
        return;
    }

    while(i < numberOfCubesToAdd) {
        const color = window.colors[getRandomInt(0, 5)];

        cubes.push({
            x: getRandomInt(RADIUS, width - RADIUS),
            y: getRandomInt(RADIUS, height - RADIUS),
            vx: getRandomInt(1, 10),
            vy: getRandomInt(1, 10),
            color: color
        });

        ++i;
    }

    console.log(cubes.length);
}

function changeRenderMethod() {
    isCircle = !isCircle;
}

step();

window.addCube = addCube;
window.colors = colors;
window.changeRenderMethod = changeRenderMethod;
