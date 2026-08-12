import type { BasaltCharacter } from "./basalt-types";
import { CHARACTERS_WIDE, convertTextToBasaltLines } from "./text-processing";

export const CANVAS_ID = "basalt-canvas-id";

type Coord = {
    x: number;
    y: number;
};

const TRIANGLE_SIDE_UNIT_PX = 80;
// add space for rendering modifiers to the left and right
const CHARACTERS_WIDE_WITH_PADDING = CHARACTERS_WIDE + 2;
export const TOTAL_CANVAS_WIDE_PX =
    CHARACTERS_WIDE_WITH_PADDING * TRIANGLE_SIDE_UNIT_PX;

const DIST_FROM_TRIANGLE_CENTER_TO_VERTEX =
    (TRIANGLE_SIDE_UNIT_PX * Math.sqrt(3)) / 3;
const DIST_FROM_TRIANGLE_CENTER_TO_SIDE =
    (TRIANGLE_SIDE_UNIT_PX * Math.sqrt(3)) / 6;

const triangleHeight = (TRIANGLE_SIDE_UNIT_PX * Math.sqrt(3)) / 2;

const BACKGROUND_COLOR = "#1f4924"

const initializeDrawingFunctions = (ctx: CanvasRenderingContext2D) => {
    const drawEquilateralTriangle = (center: Coord, scale = 1, filled: boolean) => {
        ctx.beginPath();
        ctx.moveTo(
            center.x,
            center.y - DIST_FROM_TRIANGLE_CENTER_TO_VERTEX * scale,
        );
        ctx.lineTo(
            center.x + (TRIANGLE_SIDE_UNIT_PX * scale) / 2,
            center.y + DIST_FROM_TRIANGLE_CENTER_TO_SIDE * scale,
        );
        ctx.lineTo(
            center.x - (TRIANGLE_SIDE_UNIT_PX * scale) / 2,
            center.y + DIST_FROM_TRIANGLE_CENTER_TO_SIDE * scale,
        );
        ctx.closePath();

        if (filled) {
            ctx.fillStyle = BACKGROUND_COLOR;
            ctx.fill();
        }
        ctx.stroke();
    };

    const drawCircle = (center: Coord, scale = 1, filled: boolean) => {
        ctx.beginPath();
        ctx.arc(
            center.x,
            center.y,
            DIST_FROM_TRIANGLE_CENTER_TO_SIDE * scale,
            0,
            2 * Math.PI,
        );
        if (filled) {
            ctx.fillStyle = BACKGROUND_COLOR;
            ctx.fill();
        }
        ctx.stroke();
    };

    const drawLine = (from: Coord, to: Coord) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    };

    const drawLineUpLeftFrom = (from: Coord) => {
        drawLine(from, {
            x: from.x - TRIANGLE_SIDE_UNIT_PX / 2,
            y:
                from.y -
                DIST_FROM_TRIANGLE_CENTER_TO_VERTEX +
                DIST_FROM_TRIANGLE_CENTER_TO_SIDE,
        });
    };

    const drawLineUpFrom = (from: Coord) => {
        drawLine(from, {
            x: from.x,
            y: from.y - 2 * DIST_FROM_TRIANGLE_CENTER_TO_VERTEX,
        });
    };

    const drawLineUpRightFrom = (from: Coord) => {
        drawLine(from, {
            x: from.x + TRIANGLE_SIDE_UNIT_PX / 2,
            y:
                from.y -
                DIST_FROM_TRIANGLE_CENTER_TO_VERTEX +
                DIST_FROM_TRIANGLE_CENTER_TO_SIDE,
        });
    };

    const drawLineDownRightFrom = (from: Coord) => {
        drawLine(from, {
            x: from.x + TRIANGLE_SIDE_UNIT_PX,
            y:
                from.y +
                2 * DIST_FROM_TRIANGLE_CENTER_TO_SIDE,
        });
    };

    const drawLineDownFrom = (from: Coord) => {
        drawLine(from, {
            x: from.x,
            y: from.y + 2 * DIST_FROM_TRIANGLE_CENTER_TO_SIDE,
        });
    };

    const drawLineDownLeftFrom = (from: Coord) => {
        drawLine(from, {
            x: from.x - TRIANGLE_SIDE_UNIT_PX,
            y:
                from.y +
                2 * DIST_FROM_TRIANGLE_CENTER_TO_SIDE,
        });
    };

    const drawNucleus = (character: BasaltCharacter, location: Coord, filled: boolean) => {
        if (character.nucleus === "triang")
            drawEquilateralTriangle(location, 0.7, filled);
        else drawCircle(location, 1.1, filled);
    }


    return {
        drawCircle,
        drawEquilateralTriangle,
        drawLineUpFrom,
        drawLineUpLeftFrom,
        drawLineDownFrom,
        drawLineUpRightFrom,
        drawLineDownRightFrom,
        drawLineDownLeftFrom,
        drawNucleus
    };
};

export const renderTextToCanvas = (text: string) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    const {
        drawCircle,
        drawLineUpFrom,
        drawLineUpRightFrom,
        drawLineUpLeftFrom,
        drawLineDownFrom,
        drawLineDownRightFrom,
        drawLineDownLeftFrom,
        drawNucleus
    } = initializeDrawingFunctions(ctx);

    ctx.reset();
    const basaltLines = convertTextToBasaltLines(text);

    /*     for (let i = -2; i < CHARACTERS_WIDE + 10; i++) {
            for (let j = 0; j < CHARACTERS_WIDE + 2; j++) {
                ctx.fillStyle = "yellow";
    
                const triangleY = j * triangleHeight + (2 / 3) * triangleHeight;
                drawEquilateralTriangle({
                    x:
                        i * TRIANGLE_SIDE_UNIT_PX -
                        (j % 2 === 0 ? 0 : TRIANGLE_SIDE_UNIT_PX / 2),
                    y: triangleY,
                });
            }
        } */

    basaltLines.forEach((line, lineIndex) => {
        const lineY = lineIndex * triangleHeight + (triangleHeight * 5) / 3;
        const lineXOffset =
            lineIndex % 2 === 0 ? TRIANGLE_SIDE_UNIT_PX / 2 : TRIANGLE_SIDE_UNIT_PX;

        line.forEach((character, charIndex) => {
            ctx.fillStyle = "black";

            const charX = lineXOffset + (charIndex + 1) * TRIANGLE_SIDE_UNIT_PX;


            if (character.legs.includes(1))
                drawLineUpLeftFrom({ x: charX, y: lineY });
            if (character.legs.includes(2)) drawLineUpFrom({ x: charX, y: lineY });
            if (character.legs.includes(3)) drawLineUpRightFrom({ x: charX, y: lineY });
            if (character.legs.includes(4)) drawLineDownRightFrom({ x: charX, y: lineY });
            if (character.legs.includes(5)) drawLineDownFrom({ x: charX, y: lineY });
            if (character.legs.includes(6)) drawLineDownLeftFrom({ x: charX, y: lineY });

            drawNucleus(character, { x: charX, y: lineY }, !character.isEndOfWord)


            if (character.hasAccent) {
                ctx.fillStyle = "white";
                drawCircle({ x: charX, y: lineY }, 0.2, false);
            }
        });
    });

    console.info(JSON.stringify(basaltLines, null, 2));
    return;
};
